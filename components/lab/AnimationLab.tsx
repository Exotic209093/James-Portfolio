'use client'

import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import AuroraBackground from './AuroraBackground'
import CustomCursor from './CustomCursor'
import MagneticButton from './MagneticButton'
import TextScramble from './TextScramble'
import LetterReveal from '@/components/ui/LetterReveal'
import Marquee from './Marquee'
import ScrollReveal from './ScrollReveal'
import TiltCard from './TiltCard'
import StickyScrollText from '@/components/ui/StickyScrollText'
import VideoHero from './VideoHero'
import SpotlightGrid from './SpotlightGrid'
import HtmlCanvas from './HtmlCanvas'

// three.js touches WebGL/window, so keep it out of the server render entirely.
const ThreeHologram = dynamic(() => import('./ThreeHologram'), {
  ssr: false,
  loading: () => (
    <div className="mx-auto flex aspect-[16/10] max-w-4xl items-center justify-center rounded-2xl border border-purple-800/40 bg-black/60 text-sm text-gray-500">
      Booting WebGL…
    </div>
  ),
})

export default function AnimationLab() {
  return (
    <div className="relative">
      <CustomCursor />

      {/* Hero */}
      <Section id="hero" tone="dark">
        <AuroraBackground />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-purple-300 uppercase mb-6">
            Animation Lab — Private
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95] mb-6">
            <LetterReveal text="Move things." />
            <br />
            <span className="gradient-text">
              <LetterReveal text="Feel things." delay={0.3} />
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            A sandbox of motion ideas. Scroll through each section, pick favourites,
            and tell me which ones to roll into the real site.
          </p>
        </div>
      </Section>

      {/* Magnetic buttons */}
      <Section id="magnetic" label="01 — Magnetic Buttons">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <MagneticButton>View My Work</MagneticButton>
          <MagneticButton variant="outline">Download Resume</MagneticButton>
          <MagneticButton variant="ghost">Get in touch →</MagneticButton>
        </div>
        <Caption>
          Hover near a button — it leans toward your cursor. Click for a soft pop.
        </Caption>
      </Section>

      {/* Text scramble */}
      <Section id="scramble" label="02 — Text Scramble">
        <div className="text-center space-y-6">
          <TextScramble
            words={['Software Engineer', 'Salesforce Developer', 'TypeScript', 'Python', 'AI Agents']}
            className="text-4xl sm:text-6xl font-bold gradient-text"
          />
          <p className="text-gray-500 text-sm">Cycles every few seconds, glitching between phrases.</p>
        </div>
      </Section>

      {/* Letter reveal */}
      <Section id="letters" label="03 — Letter-by-letter Reveal">
        <h2 className="text-4xl sm:text-6xl font-bold text-center mb-4">
          <LetterReveal text="Hi, I'm James." trigger="inView" />
        </h2>
        <p className="text-center text-gray-400 max-w-xl mx-auto">
          <LetterReveal
            text="Each character animates in independently as the heading enters the viewport."
            trigger="inView"
            delay={0.1}
            stagger={0.015}
          />
        </p>
      </Section>

      {/* Marquee */}
      <Section id="marquee" label="04 — Infinite Marquee">
        <div className="space-y-6">
          <Marquee>
            <MarqueeItems
              items={['TypeScript', 'Python', 'Apex', 'Next.js', 'React', 'Tailwind', 'Node.js', 'Salesforce']}
            />
          </Marquee>
          <Marquee reverse speed={30}>
            <MarqueeItems
              items={['AI Agents', 'Systems Programming', 'LWC', 'Postgres', 'Docker', 'AWS']}
              accent
            />
          </Marquee>
        </div>
        <Caption>Two rows, opposite directions, slightly different speeds.</Caption>
      </Section>

      {/* Scroll reveals */}
      <Section id="reveal" label="05 — Scroll Reveals">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="rounded-2xl border border-purple-800/30 bg-white/[0.02] p-6 h-40 flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-200">Card {i + 1}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <Caption>Staggered fade + lift as cards enter view.</Caption>
      </Section>

      {/* Tilt card */}
      <Section id="tilt" label="06 — 3D Tilt Cards">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <TiltCard>
            <div className="p-8 h-72 rounded-2xl bg-gradient-to-br from-purple-900/40 to-black border border-purple-700/40 flex flex-col justify-between">
              <span className="text-xs tracking-widest text-purple-300 uppercase">Project</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">Exocraft</h3>
                <p className="text-gray-400 text-sm">Hover to tilt. The shine follows the cursor.</p>
              </div>
            </div>
          </TiltCard>
          <TiltCard>
            <div className="p-8 h-72 rounded-2xl bg-gradient-to-br from-fuchsia-900/40 to-black border border-fuchsia-700/40 flex flex-col justify-between">
              <span className="text-xs tracking-widest text-fuchsia-300 uppercase">Project</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">Nebula Vault</h3>
                <p className="text-gray-400 text-sm">A subtle parallax effect on each card.</p>
              </div>
            </div>
          </TiltCard>
        </div>
      </Section>

      {/* Sticky scroll text */}
      <StickyScrollText
        eyebrow="Sticky scroll text"
        lines={[
          'I build production-grade tools',
          'across Salesforce, TypeScript,',
          'Python, and systems programming.',
        ]}
      />

      {/* Spotlight grid */}
      <Section id="spotlight" label="07 — Cursor Spotlight Grid">
        <SpotlightGrid />
        <Caption>Move your mouse over the grid — the cells under your cursor light up.</Caption>
      </Section>

      {/* AI video hero scaffold */}
      <Section id="video-hero" label="08 — AI Video Hero (scaffold)">
        <VideoHero
          src="/lab/ink-droplet.mp4"
          eyebrow="Ink droplet — generated 8s loop"
          headline="Cinema-grade backdrops."
          sub="A real AI-generated clip behind the text. Same component, just point src at a different file."
          ctaText="See an example"
          ctaHref="#video-hero-fullbleed"
        />
        <Caption>
          Component lives at <code>components/lab/VideoHero.tsx</code>. Accepts <code>src</code>,{' '}
          <code>poster</code>, <code>eyebrow</code>, <code>headline</code>, <code>sub</code>,{' '}
          <code>ctaText</code>, <code>ctaHref</code>, <code>overlay</code>.
        </Caption>
      </Section>

      {/* Full-bleed video hero — what the real homepage could look like */}
      <Section id="video-hero-fullbleed" label="08b — Full-bleed Video Hero">
        <div className="-mx-6">
          <div className="relative h-screen w-full overflow-hidden">
            <video
              src="/lab/ink-droplet.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/85" />
            <div className="relative z-10 h-full flex items-center justify-center px-6 text-center">
              <div className="max-w-3xl">
                <p className="text-xs tracking-[0.3em] text-purple-300 uppercase mb-6">
                  Open to opportunities
                </p>
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95] mb-6">
                  <LetterReveal text="Hi, I'm " trigger="inView" />
                  <span className="gradient-text">
                    <LetterReveal text="James." trigger="inView" delay={0.3} />
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-200 max-w-xl mx-auto">
                  AI agents · Salesforce engineering · TypeScript · Python · Systems programming
                </p>
              </div>
            </div>
          </div>
        </div>
        <Caption>
          Same Hero treatment but with the ink-droplet clip as the backdrop. This is the
          version you&apos;d promote to the real homepage if you like it.
        </Caption>
      </Section>

      {/* HTML rasterised into a canvas */}
      <Section id="html-canvas" label="09 — HTML → Canvas">
        <HtmlCanvas />
        <Caption>
          The card is real DOM serialised into an <code>&lt;svg&gt;&lt;foreignObject&gt;</code> and
          drawn into a <code>&lt;canvas&gt;</code> with <code>drawImage</code>. Once it&apos;s pixels we
          warp, glitch, and shatter them. Component: <code>components/lab/HtmlCanvas.tsx</code>.
        </Caption>
      </Section>

      {/* Abusing three.js — HTML texture on a shader-warped plane */}
      <Section id="three-hologram" label="10 — Abusing three.js">
        <ThreeHologram />
        <Caption>
          Same trick, pushed into WebGL: the rasterised HTML becomes a{' '}
          <code>CanvasTexture</code> on a subdivided plane that a custom GLSL shader ripples,
          bends, and splits chromatically inside a particle field. Component:{' '}
          <code>components/lab/ThreeHologram.tsx</code>.
        </Caption>
      </Section>

      {/* End */}
      <Section id="end" tone="dark">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            That&apos;s the lab.
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Tell me which sections to keep, tweak, or ship to the real site.
          </p>
        </div>
      </Section>
    </div>
  )
}

function Section({
  id,
  label,
  children,
  tone = 'default',
}: {
  id: string
  label?: string
  children: ReactNode
  tone?: 'default' | 'dark'
}) {
  return (
    <section
      id={id}
      className={`relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden ${
        tone === 'dark' ? 'bg-black' : 'bg-gradient-to-b from-black via-purple-950/5 to-black'
      }`}
    >
      {label && (
        <p className="absolute top-10 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-purple-400/70 uppercase">
          {label}
        </p>
      )}
      <div className="w-full max-w-6xl mx-auto">{children}</div>
    </section>
  )
}

function Caption({ children }: { children: ReactNode }) {
  return <p className="mt-10 text-center text-sm text-gray-500">{children}</p>
}

function MarqueeItems({ items, accent }: { items: string[]; accent?: boolean }) {
  return (
    <>
      {items.map((item, i) => (
        <span
          key={i}
          className={`mx-8 text-5xl sm:text-7xl font-bold whitespace-nowrap ${
            accent ? 'gradient-text' : 'text-gray-200'
          }`}
        >
          {item}
          <span className="mx-8 text-purple-500/40">✦</span>
        </span>
      ))}
    </>
  )
}
