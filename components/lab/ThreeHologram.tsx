'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * Abusing three.js.
 *
 * Picks up where the 2D demo left off: we rasterise a styled HTML card into a
 * canvas, hand that canvas to three.js as a texture, and map it onto a heavily
 * subdivided plane. A custom vertex shader ripples and bends the plane toward
 * the pointer; the fragment shader splits it chromatically and runs hologram
 * scanlines. The whole thing floats in an additive particle field with camera
 * parallax. HTML → canvas → WebGL.
 *
 * This module is loaded with next/dynamic({ ssr: false }) so three never runs
 * on the server. Reduced motion renders a single still frame; missing WebGL
 * falls back to a message.
 */

const TEX_W = 1024
const TEX_H = 640

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float t = uTime;
    float w = 0.0;
    w += sin(pos.x * 3.0 + t * 1.5) * 0.06;
    w += sin(pos.y * 4.0 - t * 1.2) * 0.05;
    w += sin((pos.x + pos.y) * 2.5 + t) * 0.04;

    // Bulge toward the pointer (pointer is in plane space).
    vec2 d = pos.xy - uPointer * vec2(1.6, 1.0);
    float dist = length(d);
    w += exp(-dist * dist * 2.5) * 0.4;

    // Gentle cylindrical bend so it reads like a curved hologram panel.
    float bend = pos.x * pos.x * -0.14;

    pos.z += w + bend;
    vWave = w;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vec2 uv = vUv;

    // Chromatic split that grows with the local wave height.
    float ca = vWave * 0.5 + 0.0035;
    float r = texture2D(uTex, uv + vec2(ca, 0.0)).r;
    float g = texture2D(uTex, uv).g;
    float b = texture2D(uTex, uv - vec2(ca, 0.0)).b;
    float a = texture2D(uTex, uv).a;
    vec3 col = vec3(r, g, b);

    // Rolling hologram scanlines.
    col += sin(uv.y * 680.0 - uTime * 6.0) * 0.04;

    // Purple frame glow hugging the card border.
    float bx = min(uv.x, 1.0 - uv.x);
    float by = min(uv.y, 1.0 - uv.y);
    float edge = 1.0 - smoothstep(0.0, 0.07, min(bx, by));
    col += vec3(0.55, 0.2, 0.95) * edge * a * 0.8;

    // Wave-driven highlight.
    col += vec3(0.6, 0.3, 1.0) * clamp(vWave, 0.0, 1.0) * 0.7;

    gl_FragColor = vec4(col, a);
  }
`

export default function ThreeHologram() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduced(prefersReduced)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      if (!renderer.getContext()) throw new Error('no webgl context')
    } catch {
      setFailed(true)
      return
    }

    const width = container.clientWidth || 800
    const height = container.clientHeight || 500
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    renderer.domElement.style.display = 'block'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.set(0, 0, 4)

    // --- HTML → canvas → texture ---------------------------------------
    const texCanvas = document.createElement('canvas')
    texCanvas.width = TEX_W
    texCanvas.height = TEX_H
    paintPlaceholder(texCanvas)
    const texture = new THREE.CanvasTexture(texCanvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy()

    let cancelled = false
    rasteriseCardInto(texCanvas, () => {
      if (cancelled) return
      texture.needsUpdate = true
      renderOnce()
    })

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uTex: { value: texture as THREE.Texture },
    }

    const planeGeo = new THREE.PlaneGeometry(3.2, 2.0, 80, 50)
    const planeMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    })
    const plane = new THREE.Mesh(planeGeo, planeMat)
    scene.add(plane)

    // --- Particle field --------------------------------------------------
    const COUNT = 1400
    const positions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6
      positions[i * 3 + 2] = -2 - Math.random() * 4
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0xa855f7,
      size: 0.03,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(pGeo, pMat)
    scene.add(points)

    // --- Interaction -----------------------------------------------------
    const pointerTarget = new THREE.Vector2(0, 0)
    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      pointerTarget.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointerTarget.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }
    const onPointerLeave = () => pointerTarget.set(0, 0)
    if (!prefersReduced) {
      renderer.domElement.addEventListener('pointermove', onPointerMove)
      renderer.domElement.addEventListener('pointerleave', onPointerLeave)
    }

    const clock = new THREE.Clock()
    let raf = 0
    let running = false

    const renderOnce = () => renderer.render(scene, camera)

    const animate = () => {
      const t = clock.getElapsedTime()
      uniforms.uTime.value = t

      // Ease the pointer uniform + camera parallax toward the target.
      uniforms.uPointer.value.x += (pointerTarget.x - uniforms.uPointer.value.x) * 0.06
      uniforms.uPointer.value.y += (pointerTarget.y - uniforms.uPointer.value.y) * 0.06
      camera.position.x += (pointerTarget.x * 0.6 - camera.position.x) * 0.05
      camera.position.y += (pointerTarget.y * 0.4 - camera.position.y) * 0.05
      camera.lookAt(0, 0, 0)

      // Idle sway + drifting particles.
      plane.rotation.z = Math.sin(t * 0.2) * 0.02
      plane.rotation.y = Math.sin(t * 0.15) * 0.05
      points.rotation.z = t * 0.02

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }

    const start = () => {
      if (running || prefersReduced) return
      running = true
      clock.getDelta()
      raf = requestAnimationFrame(animate)
    }
    const stop = () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    // First frame, then animate (or stay still for reduced motion).
    renderOnce()
    if (!prefersReduced) start()

    // --- Resize ----------------------------------------------------------
    const onResize = () => {
      const w = container.clientWidth || width
      const h = container.clientHeight || height
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderOnce()
    }
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(container)

    // Pause when scrolled out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start()
        else stop()
      },
      { threshold: 0.05 }
    )
    io.observe(container)

    return () => {
      cancelled = true
      stop()
      io.disconnect()
      resizeObserver.disconnect()
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave)
      planeGeo.dispose()
      planeMat.dispose()
      pGeo.dispose()
      pMat.dispose()
      texture.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="relative mx-auto max-w-4xl">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl border border-purple-800/40 bg-black/60 shadow-[0_0_80px_-20px_rgba(168,85,247,0.6)]"
        style={{ aspectRatio: '16 / 10' }}
      >
        {failed && (
          <div className="absolute inset-0 flex items-center justify-center px-8 text-center text-sm text-gray-400">
            WebGL isn&apos;t available here, so the three.js scene can&apos;t
            render. Everything above (HTML → canvas) still works without it.
          </div>
        )}
      </div>
      <p className="mt-4 text-center text-xs text-gray-500">
        {reduced
          ? 'Reduced motion: rendered as a single still frame.'
          : 'Move your cursor over the panel — the HTML texture ripples and bulges toward it.'}
      </p>
    </div>
  )
}

/** Dark placeholder so the plane shows instantly before the HTML rasterises. */
function paintPlaceholder(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, TEX_W)
  g.addColorStop(0, '#2a0e4e')
  g.addColorStop(1, '#05010d')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, TEX_W, TEX_H)
}

/**
 * Rasterise a styled HTML card into the given canvas via SVG foreignObject.
 * Inline styles + system fonts + no external images keep the canvas untainted,
 * which matters doubly here: a tainted canvas can't be uploaded as a WebGL
 * texture.
 */
function rasteriseCardInto(canvas: HTMLCanvasElement, onDone: () => void) {
  const html = `
    <div xmlns="http://www.w3.org/1999/xhtml" style="
      box-sizing:border-box;width:${TEX_W}px;height:${TEX_H}px;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
      background:radial-gradient(120% 120% at 0% 0%,#2a0e4e 0%,#0b0414 55%,#000 100%);
      color:#fff;padding:56px;display:flex;flex-direction:column;justify-content:space-between;">
      <div>
        <div style="font-size:24px;letter-spacing:6px;text-transform:uppercase;color:#c084fc;">Abusing three.js</div>
        <div style="font-size:74px;font-weight:800;line-height:1.05;margin-top:8px;">
          HTML, now a<br/><span style="background:linear-gradient(90deg,#a855f7,#d946ef);
            -webkit-background-clip:text;background-clip:text;color:transparent;">WebGL hologram.</span>
        </div>
      </div>
      <div style="font-family:'SFMono-Regular',Menlo,Consolas,monospace;font-size:26px;line-height:1.8;color:#d8b4fe;">
        <div><span style="color:#6b7280;">texture </span> CanvasTexture(htmlCanvas)</div>
        <div><span style="color:#6b7280;">shader  </span> ripple + bend + chroma</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;">
        <div style="font-size:22px;color:#9ca3af;">Every pixel is a rasterised &lt;div&gt;.</div>
        <div style="font-size:22px;color:#c084fc;">three.js ✦</div>
      </div>
    </div>`

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${TEX_W}" height="${TEX_H}" viewBox="0 0 ${TEX_W} ${TEX_H}"><foreignObject x="0" y="0" width="${TEX_W}" height="${TEX_H}">${html}</foreignObject></svg>`
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.drawImage(img, 0, 0, TEX_W, TEX_H)
    URL.revokeObjectURL(url)
    onDone()
  }
  img.onerror = () => {
    URL.revokeObjectURL(url)
    onDone()
  }
  img.src = url
}
