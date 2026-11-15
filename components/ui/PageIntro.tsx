import type { ReactNode } from 'react'

/** The editorial page heading shared by the inner pages: label, wide title, lede, actions. */
export default function PageIntro({
  label,
  title,
  lede,
  children,
}: {
  label: ReactNode
  title: ReactNode
  lede?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="reveal mb-14 max-w-3xl md:mb-16">
      <p className="label mb-5">{label}</p>
      <h1 className="font-wide text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-paper sm:text-6xl md:text-7xl">
        {title}
      </h1>
      {lede && <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">{lede}</p>}
      {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
    </header>
  )
}
