'use client'

import { useEffect, useRef, useState } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#________'

export default function TextScramble({
  words,
  className,
  interval = 2800,
}: {
  words: string[]
  className?: string
  interval?: number
}) {
  const [output, setOutput] = useState(words[0] || '')
  const indexRef = useRef(0)
  const frameRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!words.length) return

    let queue: Array<{ from: string; to: string; start: number; end: number; char?: string }> = []
    let mounted = true

    const setText = (newText: string) => {
      return new Promise<void>((resolve) => {
        const oldText = output
        const length = Math.max(oldText.length, newText.length)
        queue = []
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || ''
          const to = newText[i] || ''
          const start = Math.floor(Math.random() * 30)
          const end = start + Math.floor(Math.random() * 30)
          queue.push({ from, to, start, end })
        }
        frameRef.current = 0
        cancelAnimationFrame(rafRef.current || 0)

        const update = () => {
          let complete = 0
          let result = ''
          for (let i = 0; i < queue.length; i++) {
            const { from, to, start, end } = queue[i]
            let char = queue[i].char
            if (frameRef.current >= end) {
              complete++
              result += to
            } else if (frameRef.current >= start) {
              if (!char || Math.random() < 0.28) {
                char = CHARS[Math.floor(Math.random() * CHARS.length)]
                queue[i].char = char
              }
              result += `<span style="color:#c084fc;opacity:0.85">${char}</span>`
            } else {
              result += from
            }
          }
          if (!mounted) return
          setOutput(result)
          if (complete === queue.length) {
            resolve()
          } else {
            rafRef.current = requestAnimationFrame(update)
            frameRef.current++
          }
        }
        update()
      })
    }

    const loop = async () => {
      while (mounted) {
        const next = words[indexRef.current % words.length]
        await setText(next)
        await new Promise((r) => setTimeout(r, interval))
        indexRef.current++
      }
    }

    loop()

    return () => {
      mounted = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, interval])

  return <span className={className} dangerouslySetInnerHTML={{ __html: output }} />
}
