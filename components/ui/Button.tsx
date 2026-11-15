import Link from 'next/link'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
}

// Every interactive control is a full pill. One solid house colour, no glow.
const baseStyles =
  'inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full font-medium transition-[transform,background-color,border-color,color] duration-200 active:translate-y-px active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-house disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-house text-ink hover:bg-purple-300',
  secondary: 'border border-line bg-ink-raised text-paper hover:border-paper/40',
  outline: 'border border-line text-paper hover:border-paper/50',
  ghost: 'text-muted hover:text-paper',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 text-sm',
  md: 'px-5 text-[15px]',
  lg: 'px-6 text-base',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => (
    <button ref={ref} className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
)

Button.displayName = 'Button'

export default Button

export const ButtonLink = ({
  href,
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: {
  href: string
  className?: string
  variant?: Variant
  size?: Size
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const classes = cn(baseStyles, variants[variant], sizes[size], className)

  // Files use normal browser navigation. Next's route prefetch requests a
  // Server Component response for a PDF and produces avoidable 404 requests.
  if (props.download !== undefined && props.download !== false) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  )
}
