import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/constants'

export const alt = 'James Collard — Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background:
            'radial-gradient(circle at 30% 20%, #2a0a4a 0%, #08020f 55%, #000000 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: 26,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#c4b5fd',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#22c55e',
            }}
          />
          Open to opportunities
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 110,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 40,
            background: 'linear-gradient(90deg, #ffffff 0%, #c084fc 100%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {siteConfig.name}
        </div>

        <div style={{ display: 'flex', fontSize: 48, color: '#e5e7eb', marginTop: 12 }}>
          {siteConfig.title}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 30,
            color: '#a78bfa',
            marginTop: 40,
          }}
        >
          AI agents · Salesforce · TypeScript · Python · Systems
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#9ca3af',
            marginTop: 'auto',
          }}
        >
          james-c.app · {siteConfig.location}
        </div>
      </div>
    ),
    { ...size }
  )
}
