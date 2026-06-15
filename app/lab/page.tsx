import type { Metadata } from 'next'
import LabPlayground from '@/components/lab/LabPlayground'

export const metadata: Metadata = {
  title: 'Lab · James Collard',
  description:
    'A WebGL playground: a live HTML/2D canvas streamed into a Three.js CanvasTexture and wrapped around a 3D object. Creative coding experiments.',
}

const techniques = [
  {
    title: 'Canvas → Texture',
    body: 'A 2D canvas is repainted every frame and fed straight into THREE.CanvasTexture, so a DOM-flavoured surface becomes a GPU image map.',
  },
  {
    title: 'Live, not static',
    body: 'texture.needsUpdate = true on each tick means the moving scanline, clock, and pulse animate on the 3D mesh in real time.',
  },
  {
    title: 'Honest cleanup',
    body: 'Geometries, materials, textures, controls, and the renderer are all disposed on unmount — no leaked WebGL contexts on route changes.',
  },
]

export default function LabPage() {
  return (
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-purple-400">
            Creative coding
          </p>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            <span className="text-white">The </span>
            <span className="gradient-text">Lab</span>
          </h1>
          <p className="text-xl leading-relaxed text-gray-300">
            Experiments where I push the edges of the browser for fun. First up:
            abusing Three.js by drawing a plain HTML-style canvas and smuggling it
            onto a spinning 3D object as a live texture.
          </p>
        </div>

        {/* The experiment */}
        <LabPlayground />

        {/* How it works */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {techniques.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-purple-900/40 bg-black/40 p-6"
            >
              <h3 className="mb-2 text-lg font-semibold text-purple-300">
                {t.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
