import * as React from 'react'
import { cn } from '@dropbox/ui/lib/utils'

type InputProps = React.ComponentProps<'input'> & {
  isSingleLineInput?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isSingleLineInput, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          isSingleLineInput &&
            'focus:ring focus:ring-blue-100 focus:border-blue-200 dark:focus:ring-blue-700 dark:focus:border-blue-600',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
