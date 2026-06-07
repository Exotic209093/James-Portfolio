'use client'

import { useEffect, useRef } from 'react'
import Reveal from '@/components/ui/Reveal'

const SKILLS = [
  'TypeScript', 'Python', 'Apex', 'React', 'Next.js', 'Node.js',
  'Salesforce', 'LWC', 'AI Agents', 'Postgres', 'Tailwind', 'C++',
  'Docker', 'Git', 'REST APIs', 'Automation',
]

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  label: string
  r: number
}

/**
 * Interactive skills constellation. Skill nodes drift slowly and connect with
 * lines when near each other; the cursor gently repels nearby nodes. Drawn on
 * a canvas for cheap rendering. Performance guards: pauses when offscreen,
 * caps device pixel ratio, scales node count down on small screens, and
 * respects prefers-reduced-motion (renders a single static frame).
 */
export default function SkillsConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSmall = window.innerWidth < 640
    const skills = isSmall ? SKILLS.slice(0, 9) : SKILLS

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let nodes: Node[] = []
    const mouse = { x: -9999, y: -9999 }
    const LINK_DIST = isSmall ? 130 : 180

    const resize = () => {
      width = wrap.clientWidth
      height = wrap.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const init = () => {
      nodes = skills.map((label) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        label,
        r: 4,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.5
            ctx.strokeStyle = `rgba(168,85,247,${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Nodes + labels
      ctx.font = '12px var(--font-inter), system-ui, sans-serif'
      ctx.textAlign = 'center'
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(192,132,252,0.9)'
        ctx.fill()
        ctx.fillStyle = 'rgba(229,224,240,0.85)'
        ctx.fillText(n.label, n.x, n.y - 10)
      }
    }

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy

        // Cursor repulsion
        const dx = n.x - mouse.x
        const dy = n.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120
          n.x += (dx / dist) * force * 1.5
          n.y += (dy / dist) * force * 1.5
        }

        // Bounce off edges
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
        n.x = Math.max(0, Math.min(width, n.x))
        n.y = Math.max(0, Math.min(height, n.y))
      }
      draw()
    }

    let raf = 0
    let running = false
    const loop = () => {
      step()
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduceMotion) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    // Only animate while the section is on screen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start()
        else stop()
      },
      { threshold: 0.05 }
    )
    io.observe(wrap)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      resize()
    }

    resize()
    init()
    draw() // paint at least one frame (covers reduced-motion)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize)

    return () => {
      stop()
      io.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">The </span>
            <span className="gradient-text">Toolkit</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The technologies I reach for — move your cursor through them.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={wrapRef}
            className="relative h-[360px] sm:h-[440px] rounded-2xl border border-purple-900/30 bg-white/[0.02] overflow-hidden"
          >
            <canvas ref={canvasRef} className="absolute inset-0" data-basic-hide />
            {/* Basic-mode fallback: a plain list of skills (see globals.css) */}
            <ul className="basic-only flex-wrap gap-3 p-6">
              {SKILLS.map((s) => (
                <li key={s} className="text-sm">{s}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
