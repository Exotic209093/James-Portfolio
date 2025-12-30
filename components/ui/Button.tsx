import Link from 'next/link'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none'
    
    const variants = {
      primary: 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70',
      secondary: 'bg-purple-900/30 text-purple-300 border border-purple-700/50 hover:bg-purple-900/50 hover:border-purple-600',
      outline: 'border-2 border-purple-600 text-purple-400 hover:bg-purple-600/10',
      ghost: 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/20',
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
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
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black'
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70',
    secondary: 'bg-purple-900/30 text-purple-300 border border-purple-700/50 hover:bg-purple-900/50 hover:border-purple-600',
    outline: 'border-2 border-purple-600 text-purple-400 hover:bg-purple-600/10',
    ghost: 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/20',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <Link
      href={href}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  )
}
