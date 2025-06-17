import React from 'react';
import { cn } from '@/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      dot = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'inline-flex items-center font-medium rounded-full',
      'transition-colors duration-200',
    ];

    const variantClasses = {
      default: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200',
      success: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200',
      warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200',
      error: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200',
      info: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
      outline: 'border border-secondary-200 text-secondary-700 dark:border-secondary-700 dark:text-secondary-300',
    };

    const sizeClasses = {
      sm: dot ? 'px-1.5 py-0.5 text-xs gap-1' : 'px-2 py-0.5 text-xs',
      md: dot ? 'px-2 py-1 text-sm gap-1.5' : 'px-2.5 py-1 text-sm',
      lg: dot ? 'px-3 py-1.5 text-base gap-2' : 'px-3 py-1.5 text-base',
    };

    const dotSizes = {
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {dot && (
          <div
            className={cn(
              'rounded-full bg-current opacity-60',
              dotSizes[size]
            )}
          />
        )}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };

