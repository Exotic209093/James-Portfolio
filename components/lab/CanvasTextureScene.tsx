'use client'

/**
 * CanvasTextureScene — "HTML in a canvas, abused into 3D".
 *
 * The trick: we draw a live 2D <canvas> every frame (text, gradients, a moving
 * scanline — basically a hand-rolled HTML card) and feed that canvas straight
 * into Three.js as a CanvasTexture. Three.js never knows it's wallpapering a
 * spinning torus knot with what is effectively a DOM-ish surface. That's the
 * "abuse": the GPU treats our painted canvas as just another image map.
 *
 * The same source canvas is exposed via `onPaint` so the page can show the raw
 * 2D surface side-by-side with the 3D object it's wrapped around.
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface CanvasTextureSceneProps {
  /** Receives the live 2D source canvas once, so callers can mirror it in the DOM. */
  onPaint?: (canvas: HTMLCanvasElement) => void
}

const TEXTURE_SIZE = 512

export default function CanvasTextureScene({ onPaint }: CanvasTextureSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // --- The "HTML" surface: a 2D canvas we repaint every frame ---
    const source = document.createElement('canvas')
    source.width = TEXTURE_SIZE
    source.height = TEXTURE_SIZE
    const ctx = source.getContext('2d')!
    onPaint?.(source)

    const texture = new THREE.CanvasTexture(source)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8

    // --- Three.js scene ---
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x05010a, 0.06)

    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // The abused object: a torus knot wallpapered with our live canvas.
    const knotGeo = new THREE.TorusKnotGeometry(1.4, 0.45, 220, 32)
    const knotMat = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.35,
      roughness: 0.35,
      emissiveMap: texture,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.25,
    })
    const knot = new THREE.Mesh(knotGeo, knotMat)
    scene.add(knot)

    // A ghost wireframe shell so the silhouette reads even when text faces away.
    const shell = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.42, 0.46, 160, 16),
      new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      })
    )
    scene.add(shell)

    // Drifting particle field.
    const particleCount = 600
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 24
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        color: 0x9333ea,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      })
    )
    scene.add(particles)

    // Lighting.
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const keyLight = new THREE.PointLight(0xc084fc, 60, 50)
    keyLight.position.set(5, 5, 5)
    scene.add(keyLight)
    const rimLight = new THREE.PointLight(0x6366f1, 40, 50)
    rimLight.position.set(-5, -3, 2)
    scene.add(rimLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.enablePan = false
    controls.minDistance = 3.5
    controls.maxDistance = 10
    controls.autoRotate = !prefersReducedMotion
    controls.autoRotateSpeed = 1.2

    // --- Paint the "HTML card" into the 2D canvas ---
    const paint = (t: number) => {
      const w = TEXTURE_SIZE
      const h = TEXTURE_SIZE

      // Background gradient.
      const bg = ctx.createLinearGradient(0, 0, w, h)
      bg.addColorStop(0, '#1e0b3a')
      bg.addColorStop(0.5, '#2e1065')
      bg.addColorStop(1, '#0b0118')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // Grid lines — that "tech UI" look.
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.18)'
      ctx.lineWidth = 1
      for (let x = 0; x <= w; x += 32) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y <= h; y += 32) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Moving scanline.
      const scanY = ((t * 0.06) % (h + 80)) - 40
      const scan = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40)
      scan.addColorStop(0, 'rgba(192,132,252,0)')
      scan.addColorStop(0.5, 'rgba(192,132,252,0.35)')
      scan.addColorStop(1, 'rgba(192,132,252,0)')
      ctx.fillStyle = scan
      ctx.fillRect(0, scanY - 40, w, 80)

      // Text — the "HTML content".
      ctx.textAlign = 'center'
      ctx.fillStyle = '#f5f3ff'
      ctx.font = 'bold 54px "Courier New", monospace'
      ctx.fillText('<canvas/>', w / 2, 150)

      ctx.fillStyle = '#c084fc'
      ctx.font = '26px "Courier New", monospace'
      ctx.fillText('rendered to a', w / 2, 200)
      ctx.fillText('CanvasTexture', w / 2, 236)

      ctx.fillStyle = '#a855f7'
      ctx.font = 'bold 40px "Courier New", monospace'
      ctx.fillText('→ THREE.js', w / 2, 310)

      // Live clock-ish readout to prove it's repainting every frame.
      ctx.fillStyle = '#67e8f9'
      ctx.font = '22px "Courier New", monospace'
      ctx.fillText(`t = ${(t / 1000).toFixed(2)}s`, w / 2, 380)

      // Pulsing dot.
      const pulse = 6 + Math.sin(t * 0.005) * 4
      ctx.beginPath()
      ctx.arc(w / 2, 430, pulse, 0, Math.PI * 2)
      ctx.fillStyle = '#4ade80'
      ctx.fill()

      texture.needsUpdate = true
    }

    // --- Animation loop ---
    let frame = 0
    const clock = new THREE.Clock()
    const animate = () => {
      frame = requestAnimationFrame(animate)
      const t = clock.getElapsedTime() * 1000

      paint(t)

      if (!prefersReducedMotion) {
        knot.rotation.y += 0.003
        knot.rotation.x += 0.001
        shell.rotation.copy(knot.rotation)
        particles.rotation.y += 0.0004
      }

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // --- Resize ---
    const handleResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', handleResize)
      controls.dispose()
      knotGeo.dispose()
      knotMat.dispose()
      shell.geometry.dispose()
      ;(shell.material as THREE.Material).dispose()
      particleGeo.dispose()
      ;(particles.material as THREE.Material).dispose()
      texture.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [onPaint])

  return <div ref={mountRef} className="absolute inset-0" />
}
