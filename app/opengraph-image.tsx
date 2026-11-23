import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/constants'

// Render at build time with Node; the OG renderer exceeds the Hobby Edge limit.
export const runtime = 'nodejs'

export const alt = `${siteConfig.name}, ${siteConfig.title}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const ink = '#0d0e12'
const paper = '#eceaf3'
const muted = '#a6a4b5'
const house = '#b8a7f2'
const lanes = ['#b8a7f2', '#86c8e8', '#8fd9b4', '#f0c27a']

const font = (file: string) => readFile(join(process.cwd(), 'assets/og', file))

/** The share card in the site's own identity: one branch, four lanes, the name set wide. */
export default async function OpenGraphImage() {
  const [display, body, mono] = await Promise.all([
    font('archivo-expanded-semibold.ttf'),
    font('archivo-regular.ttf'),
    font('jetbrains-mono-medium.ttf'),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px 64px',
          background: `radial-gradient(70% 90% at 0% 100%, rgba(184, 167, 242, 0.16), rgba(13, 14, 18, 0) 70%), ${ink}`,
          color: paper,
          fontFamily: 'Archivo',
        }}
      >
        <div style={{ display: 'flex', fontFamily: 'JetBrains Mono', fontSize: 22, letterSpacing: 3, color: muted }}>
          SOLUTIONS ENGINEER · KENT, UK · OPEN TO LONDON HYBRID
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 64,
            fontFamily: 'Archivo Expanded',
            fontSize: 128,
            lineHeight: 1,
            letterSpacing: -5,
          }}
        >
          {siteConfig.name}
        </div>

        <div style={{ display: 'flex', marginTop: 32, maxWidth: 860, fontSize: 34, lineHeight: 1.4, color: muted }}>
          Full-stack SaaS on TypeScript, AWS and Salesforce. Built AI-native, tested properly.
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, position: 'relative', height: 24 }}>
            <div style={{ display: 'flex', position: 'absolute', left: 0, right: 40, top: 11, height: 2, background: '#2a2d38' }} />
            {lanes.map((color, index) => (
              <div
                key={color}
                style={{
                  display: 'flex',
                  width: 20,
                  height: 20,
                  marginLeft: index === 0 ? 0 : 150,
                  borderRadius: 999,
                  border: `3px solid ${color}`,
                  background: index === lanes.length - 1 ? color : ink,
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', fontFamily: 'JetBrains Mono', fontSize: 24, color: house }}>james-c.app</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Archivo Expanded', data: display, style: 'normal', weight: 600 },
        { name: 'Archivo', data: body, style: 'normal', weight: 400 },
        { name: 'JetBrains Mono', data: mono, style: 'normal', weight: 500 },
      ],
    }
  )
}
