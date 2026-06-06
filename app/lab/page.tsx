import type { Metadata } from 'next'
import AnimationLab from '@/components/lab/AnimationLab'

export const metadata: Metadata = {
  title: 'Animation Lab',
  description: 'A private playground for testing animations and interactions.',
  robots: { index: false, follow: false },
}

export default function LabPage() {
  return <AnimationLab />
}
