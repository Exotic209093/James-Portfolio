'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * HTML → Canvas.
 *
 * Real, styled DOM is serialised into an <svg><foreignObject> and rasterised
 * into a <canvas> via drawImage — the browser paints HTML straight onto a 2D
 * surface. Once it's pixels we own, we abuse them: a pointer-reactive liquid
 * warp, occasional glitch slices, and a shatter-to-particles toggle.
 *
 * Caveats this demo respects so the canvas never taints:
 *  - every style is inline (foreignObject renders in isolation, no Tailwind),
 *  - system fonts only (no external @font-face to embed),
 *  - no external <img> (those would either taint or fail to load).
 */

// Logical design size. The backing store is multiplied by DPR; CSS scales it
// down to the container, so it stays crisp on retina without re-rasterising.
const W = 560
const H = 344
const PARTICLE_STEP = 6

type Particle = {
  x: number
  y: number
  hx: number
  hy: number
  vx: number
  vy: number
  color: string
}

export default function HtmlCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sourceRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number>()
  const pointer = useRef({ x: W / 2, y: H / 2, active: false })
  const mode = useRef<'warp' | 'shattering' | 'reforming'>('warp')
  const particles = useRef<Particle[] | null>(null)
  const dpr = useRef(1)
  const startLoop = useRef<() => void>(() => {})

  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading')
  const [shattered, setShattered] = useState(false)
  const [reduced, setReduced] = useState(false)

  // Rasterise the HTML card into an offscreen source canvas.
  useEffect(() => {
    let cancelled = false
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    dpr.current = ratio

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduced(prefersReduced)

    const svg = buildSvg(W, H)
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      if (cancelled) return
      try {
        const source = document.createElement('canvas')
        source.width = W * ratio
        source.height = H * ratio
        const sctx = source.getContext('2d')
        if (!sctx) throw new Error('no 2d context')
        sctx.drawImage(img, 0, 0, source.width, source.height)
        // Touch the pixels now: if the canvas were tainted this throws, and we
        // fall back instead of dying inside the animation loop later.
        sctx.getImageData(0, 0, 1, 1)
        sourceRef.current = source
        setStatus('ready')
      } catch {
        setStatus('failed')
      } finally {
        URL.revokeObjectURL(url)
      }
    }
    img.onerror = () => {
      if (!cancelled) setStatus('failed')
      URL.revokeObjectURL(url)
    }
    img.src = url

    return () => {
      cancelled = true
      URL.revokeObjectURL(url)
    }
  }, [])

  // Render loop.
  useEffect(() => {
    if (status !== 'ready') return
    const canvas = canvasRef.current
    const source = sourceRef.current
    if (!canvas || !source) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const ratio = dpr.current
    canvas.width = W * ratio
    canvas.height = H * ratio
    const cw = canvas.width
    const ch = canvas.height
    const bandH = 14 * ratio
    let t = 0
    let running = false
    let staticDrawn = false

    const drawStatic = () => {
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(source, 0, 0)
      staticDrawn = true
    }

    const drawWarp = () => {
      ctx.clearRect(0, 0, cw, ch)
      const p = pointer.current
      const px = p.x * ratio
      const py = p.y * ratio
      const reach = p.active ? 220 * ratio : 90 * ratio
      const amp = p.active ? 26 * ratio : 9 * ratio

      for (let y = 0; y < ch; y += bandH) {
        const dy = (y + bandH / 2 - py) / reach
        const falloff = Math.exp(-dy * dy) // gaussian bulge toward the pointer
        const wave = Math.sin(y * 0.03 + t * 2) * amp
        const bulge = falloff * amp * 1.8
        const dir = px > cw / 2 ? -1 : 1
        const dx = wave + dir * bulge

        // Random glitch slice now and then — punchier while hovering.
        let slice = 0
        if (Math.random() < (p.active ? 0.04 : 0.012)) {
          slice = (Math.random() - 0.5) * 60 * ratio
        }

        const h = Math.min(bandH, ch - y)
        ctx.drawImage(source, 0, y, cw, h, dx + slice, y, cw, h)
      }

      // Chromatic ghost while hovering: cheap additive echoes.
      if (p.active) {
        ctx.globalCompositeOperation = 'lighter'
        ctx.globalAlpha = 0.18
        ctx.drawImage(source, -4 * ratio, 0)
        ctx.drawImage(source, 4 * ratio, 0)
        ctx.globalAlpha = 1
        ctx.globalCompositeOperation = 'source-over'
      }

      // Scanlines for a little CRT grit.
      ctx.fillStyle = 'rgba(0,0,0,0.16)'
      for (let y = 0; y < ch; y += 3 * ratio) {
        ctx.fillRect(0, y, cw, 1 * ratio)
      }
    }

    const drawParticles = () => {
      const ps = particles.current
      if (!ps) return
      ctx.clearRect(0, 0, cw, ch)
      const reforming = mode.current === 'reforming'
      const p = pointer.current
      const px = p.x * ratio
      const py = p.y * ratio
      const size = Math.max(2, Math.round(PARTICLE_STEP * ratio))

      for (const q of ps) {
        if (reforming) {
          q.vx += (q.hx - q.x) * 0.08
          q.vy += (q.hy - q.y) * 0.08
          q.vx *= 0.82
          q.vy *= 0.82
        } else {
          // Drift apart, shoved away from the pointer like a repulsor.
          const ddx = q.x - px
          const ddy = q.y - py
          const d2 = ddx * ddx + ddy * ddy + 1
          const push = (520 * ratio) / d2
          q.vx += ddx * push * 0.02
          q.vy += ddy * push * 0.02 + 0.05 * ratio
          q.vx *= 0.98
          q.vy *= 0.98
        }
        q.x += q.vx
        q.y += q.vy
        ctx.fillStyle = q.color
        ctx.fillRect(q.x, q.y, size, size)
      }
    }

    const stop = () => {
      running = false
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = undefined
      }
    }

    const tick = () => {
      t += 0.016
      if (mode.current === 'warp') {
        if (reduced) {
          // Respect reduced motion: paint the raster once and idle the loop.
          if (!staticDrawn) drawStatic()
          stop()
          return
        }
        drawWarp()
      } else {
        staticDrawn = false
        drawParticles()
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running) return
      running = true
      rafRef.current = requestAnimationFrame(tick)
    }
    startLoop.current = start

    // First paint: static for reduced motion, ambient warp otherwise.
    if (reduced) drawStatic()
    else start()

    // Pause when the canvas scrolls out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reduced || mode.current !== 'warp') start()
        } else {
          stop()
        }
      },
      { threshold: 0.05 }
    )
    io.observe(canvas)

    return () => {
      io.disconnect()
      stop()
    }
  }, [status, reduced])

  const handlePointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    pointer.current.x = ((e.clientX - rect.left) / rect.width) * W
    pointer.current.y = ((e.clientY - rect.top) / rect.height) * H
    pointer.current.active = true
  }

  const buildParticles = () => {
    const source = sourceRef.current
    if (!source) return
    const sctx = source.getContext('2d')
    if (!sctx) return
    const { width, height } = source
    const data = sctx.getImageData(0, 0, width, height).data
    const ratio = dpr.current
    const step = Math.max(2, Math.round(PARTICLE_STEP * ratio))
    const list: Particle[] = []
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const i = (y * width + x) * 4
        if (data[i + 3] < 24) continue
        list.push({
          x,
          y,
          hx: x,
          hy: y,
          vx: 0,
          vy: 0,
          color: `rgb(${data[i]},${data[i + 1]},${data[i + 2]})`,
        })
      }
    }
    particles.current = list
  }

  const toggleShatter = () => {
    if (status !== 'ready') return
    const ratio = dpr.current
    if (!shattered) {
      if (!particles.current) buildParticles()
      const ps = particles.current
      if (ps) {
        for (const q of ps) {
          q.vx = (Math.random() - 0.5) * 14 * ratio
          q.vy = (Math.random() - 0.5) * 14 * ratio - 3 * ratio
        }
      }
      mode.current = 'shattering'
      setShattered(true)
    } else {
      mode.current = 'reforming'
      setShattered(false)
      // Once everything is home, snap back to the warp render.
      window.setTimeout(() => {
        if (mode.current === 'reforming') mode.current = 'warp'
      }, 1100)
    }
    // The loop idles in reduced motion; this is an explicit click, so kick it.
    startLoop.current()
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative rounded-2xl border border-purple-800/40 bg-black/60 p-3 shadow-[0_0_60px_-15px_rgba(168,85,247,0.5)]">
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointer}
          onPointerLeave={() => (pointer.current.active = false)}
          className="block w-full rounded-xl"
          style={{ aspectRatio: `${W} / ${H}` }}
        />

        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
            Rasterising HTML…
          </div>
        )}

        {status === 'failed' && (
          <div className="absolute inset-3 flex items-center justify-center rounded-xl bg-black/80 px-6 text-center text-sm text-gray-400">
            This browser blocked rasterising the HTML (foreignObject / canvas
            taint). The trick is still real — it just needs a stricter CSP
            exemption here.
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={toggleShatter}
          disabled={status !== 'ready'}
          data-cursor="hover"
          className="rounded-full border border-purple-500/60 bg-purple-500/10 px-6 py-2.5 text-sm font-medium text-purple-200 transition-colors hover:border-purple-400 hover:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {shattered ? 'Reassemble' : 'Shatter to pixels'}
        </button>
        <span className="text-xs text-gray-500">
          {reduced
            ? 'Reduced motion: static raster. Shatter still works on click.'
            : 'Hover to warp · the card is now ~3,000 canvas pixels we control.'}
        </span>
      </div>
    </div>
  )
}

/**
 * The HTML we rasterise. Everything is inline because foreignObject renders in
 * isolation from the page's stylesheet, and we keep to system fonts + no
 * external images so the resulting canvas is never tainted.
 */
function buildSvg(w: number, h: number) {
  const html = `
    <div xmlns="http://www.w3.org/1999/xhtml" style="
      box-sizing:border-box;width:${w}px;height:${h}px;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
      background:radial-gradient(120% 120% at 0% 0%,#2a0e4e 0%,#0b0414 55%,#000 100%);
      color:#fff;padding:28px;display:flex;flex-direction:column;justify-content:space-between;
      border-radius:16px;overflow:hidden;">
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="width:52px;height:52px;border-radius:14px;
          background:linear-gradient(135deg,#a855f7,#d946ef);
          display:flex;align-items:center;justify-content:center;
          font-weight:800;font-size:22px;color:#0b0414;">J</div>
        <div>
          <div style="font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#c084fc;">Live HTML → Canvas</div>
          <div style="font-size:24px;font-weight:800;line-height:1.1;">James Collard</div>
        </div>
        <div style="margin-left:auto;font-size:11px;letter-spacing:2px;text-transform:uppercase;
          color:#86efac;border:1px solid rgba(134,239,172,0.4);border-radius:999px;padding:4px 10px;">
          ● rasterised
        </div>
      </div>

      <div style="font-family:'SFMono-Regular',Menlo,Consolas,monospace;font-size:13px;line-height:1.9;color:#d8b4fe;">
        <div><span style="color:#6b7280;">role  </span> Software Engineer</div>
        <div><span style="color:#6b7280;">stack </span> TypeScript · Python · Apex · Next.js</div>
        <div><span style="color:#6b7280;">focus </span> AI agents · Salesforce · systems</div>
      </div>

      <div style="display:flex;gap:10px;">
        ${['TypeScript', 'WebGL', 'React', 'Rust']
          .map(
            (tag) =>
              `<span style="font-size:12px;padding:5px 12px;border-radius:999px;
                background:rgba(168,85,247,0.16);border:1px solid rgba(168,85,247,0.4);
                color:#e9d5ff;">${tag}</span>`
          )
          .join('')}
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;
        border-top:1px solid rgba(168,85,247,0.25);padding-top:14px;font-size:12px;color:#9ca3af;">
        <span>This whole card is one &lt;canvas&gt; element.</span>
        <span style="color:#c084fc;">drawImage(svg) ✦</span>
      </div>
    </div>`

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><foreignObject x="0" y="0" width="${w}" height="${h}">${html}</foreignObject></svg>`
}
