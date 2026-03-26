import * as React from 'react'
import { cn } from '../../lib/utils'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-offset-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)

Input.displayName = 'Input'

export { Input }
