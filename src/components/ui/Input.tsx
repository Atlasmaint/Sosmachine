import React from 'react';
import { cn } from '@/utils';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      isLoading = false,
      fullWidth = true,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputId = id || React.useId();

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const baseClasses = [
      'block rounded-lg border px-3 py-2 text-sm',
      'transition-colors duration-200',
      'placeholder:text-secondary-400',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ];

    const stateClasses = error
      ? [
          'border-error-300 text-error-900',
          'focus:border-error-500 focus:ring-error-500',
          'dark:border-error-600 dark:text-error-100',
        ]
      : [
          'border-secondary-300 text-secondary-900',
          'focus:border-primary-500 focus:ring-primary-500',
          'dark:border-secondary-600 dark:text-secondary-100',
          'dark:bg-secondary-800',
        ];

    const widthClasses = fullWidth ? 'w-full' : '';

    const hasLeftIcon = leftIcon || isLoading;
    const hasRightIcon = rightIcon || isPassword || error;

    return (
      <div className={cn('space-y-1', fullWidth ? 'w-full' : '')}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {hasLeftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-secondary-300 border-t-primary-600" />
              ) : (
                <span className="text-secondary-400">{leftIcon}</span>
              )}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            id={inputId}
            className={cn(
              baseClasses,
              stateClasses,
              widthClasses,
              hasLeftIcon && 'pl-10',
              hasRightIcon && 'pr-10',
              className
            )}
            {...props}
          />
          
          {hasRightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {error ? (
                <AlertCircle className="h-4 w-4 text-error-500" />
              ) : isPassword ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-secondary-400 hover:text-secondary-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              ) : (
                <span className="text-secondary-400">{rightIcon}</span>
              )}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p
            className={cn(
              'text-xs',
              error
                ? 'text-error-600 dark:text-error-400'
                : 'text-secondary-500 dark:text-secondary-400'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };

