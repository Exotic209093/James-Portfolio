'use client'

import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MousePointer2, Boxes } from 'lucide-react'
import CanvasTextureScene from './CanvasTextureScene'

export default function LabPlayground() {
  const mirrorRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // The scene hands us its live 2D source canvas; we drop the *same* node into
  // the DOM so the raw painted surface sits next to the 3D object using it.
  const handlePaint = useCallback((canvas: HTMLCanvasElement) => {
    const holder = mirrorRef.current
    if (!holder) return
    holder.innerHTML = ''
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    holder.appendChild(canvas)
    setMounted(true)
  }, [])

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      {/* 3D viewport */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative aspect-square sm:aspect-video lg:aspect-auto lg:min-h-[480px] overflow-hidden rounded-2xl border border-purple-900/40 bg-black/60"
      >
        <CanvasTextureScene onPaint={handlePaint} />
        <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs text-purple-200 backdrop-blur">
          <MousePointer2 className="h-3.5 w-3.5" />
          Drag to orbit · scroll to zoom
        </div>
        <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-200">
          <Boxes className="h-3.5 w-3.5" />
          WebGL · Three.js
        </div>
      </motion.div>

      {/* The raw "HTML" source canvas, mirrored live */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-col gap-4"
      >
        <div className="rounded-2xl border border-purple-900/40 bg-black/60 p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-purple-400">
            Source 2D canvas
          </p>
          <div
            ref={mirrorRef}
            className="aspect-square w-full overflow-hidden rounded-lg border border-purple-900/40 bg-black"
          >
            {!mounted && (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">
                Booting WebGL…
              </div>
            )}
          </div>
        </div>
        <p className="text-sm leading-relaxed text-gray-400">
          This square is a plain 2D <code className="text-purple-300">{'<canvas>'}</code>{' '}
          repainted on every frame. The exact same pixels are streamed into a{' '}
          <code className="text-purple-300">THREE.CanvasTexture</code> and wrapped
          around the torus knot on the left. No DOM, no HTML elements in the 3D
          scene — just a painted surface the GPU treats as an image map.
        </p>
      </motion.div>
    </div>
  )
}
