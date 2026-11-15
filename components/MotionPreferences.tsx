'use client'

import type { ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import { useMode } from '@/components/ModeProvider'

/**
 * Applies the site's motion setting to framer-motion animations. Kept out of
 * the root layout so pages without framer-motion never download it.
 */
export default function MotionPreferences({ children }: { children: ReactNode }) {
  const { mode } = useMode()
  return <MotionConfig reducedMotion={mode === 'calm' || mode === 'basic' ? 'always' : 'user'}>{children}</MotionConfig>
}
