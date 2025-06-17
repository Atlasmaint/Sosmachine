import React from 'react';
import { cn } from '@/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'inline-flex items-center justify-center rounded-lg font-medium',
      'transition-all duration-200 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'active:scale-95',
    ];

    const variantClasses = {
      primary: [
        'bg-primary-600 text-white shadow-sm',
        'hover:bg-primary-700 focus:ring-primary-500',
        'dark:bg-primary-500 dark:hover:bg-primary-600',
      ],
      secondary: [
        'bg-secondary-100 text-secondary-900 shadow-sm',
        'hover:bg-secondary-200 focus:ring-secondary-500',
        'dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700',
      ],
      outline: [
        'border border-secondary-300 bg-white text-secondary-700 shadow-sm',
        'hover:bg-secondary-50 focus:ring-primary-500',
        'dark:border-secondary-600 dark:bg-secondary-800 dark:text-secondary-100',
        'dark:hover:bg-secondary-700',
      ],
      ghost: [
        'text-secondary-700 hover:bg-secondary-100 focus:ring-primary-500',
        'dark:text-secondary-300 dark:hover:bg-secondary-800',
      ],
      destructive: [
        'bg-error-600 text-white shadow-sm',
        'hover:bg-error-700 focus:ring-error-500',
        'dark:bg-error-500 dark:hover:bg-error-600',
      ],
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-6 py-2.5 text-base gap-2',
      xl: 'px-8 py-3 text-lg gap-3',
    };

    const widthClasses = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          widthClasses,
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };

