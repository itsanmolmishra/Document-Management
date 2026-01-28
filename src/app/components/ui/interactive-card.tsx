import React from 'react';
import { cn } from '@/app/lib/utils';
import { Card, CardProps } from './card';

/**
 * Interactive Card with proper hover, active, and focus states
 * Use this for any card that should be clickable
 */

interface InteractiveCardProps extends CardProps {
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export const InteractiveCard = React.forwardRef<
  HTMLDivElement,
  InteractiveCardProps
>(({ className, onClick, selected, disabled, children, ...props }, ref) => {
  const isClickable = !!onClick && !disabled;

  return (
    <Card
      ref={ref}
      className={cn(
        'transition-all duration-200',
        isClickable && [
          'cursor-pointer',
          'hover:shadow-md hover:border-slate-300',
          'active:scale-[0.99] active:shadow-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 focus-visible:ring-offset-2',
        ],
        selected && [
          'border-blue-600 bg-blue-50/50 shadow-md',
          'ring-2 ring-blue-600/20',
        ],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={!disabled ? onClick : undefined}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      {...props}
    >
      {children}
    </Card>
  );
});

InteractiveCard.displayName = 'InteractiveCard';

/**
 * Interactive List Item
 * Use this for list items that should be clickable
 */

interface InteractiveListItemProps {
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const InteractiveListItem: React.FC<InteractiveListItemProps> = ({
  onClick,
  selected,
  disabled,
  children,
  className,
}) => {
  const isClickable = !!onClick && !disabled;

  return (
    <div
      className={cn(
        'px-4 py-3 rounded-lg transition-all duration-150',
        isClickable && [
          'cursor-pointer',
          'hover:bg-slate-50 hover:border-slate-200',
          'active:bg-slate-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50',
        ],
        selected && [
          'bg-blue-50 border-l-4 border-l-blue-600',
          'hover:bg-blue-50',
        ],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={!disabled ? onClick : undefined}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};

/**
 * Interactive Table Row
 * Use this for table rows that should be clickable
 */

interface InteractiveTableRowProps {
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const InteractiveTableRow: React.FC<InteractiveTableRowProps> = ({
  onClick,
  selected,
  disabled,
  children,
  className,
}) => {
  const isClickable = !!onClick && !disabled;

  return (
    <tr
      className={cn(
        'transition-all duration-150 border-b border-slate-200',
        isClickable && [
          'cursor-pointer',
          'hover:bg-slate-50',
          'active:bg-slate-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50',
        ],
        selected && 'bg-blue-50 hover:bg-blue-100',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={!disabled ? onClick : undefined}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      {children}
    </tr>
  );
};

/**
 * Interactive Badge
 * Use this for badges that should be clickable (filters, tags, etc.)
 */

interface InteractiveBadgeProps {
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  className?: string;
}

export const InteractiveBadge: React.FC<InteractiveBadgeProps> = ({
  onClick,
  selected,
  disabled,
  children,
  variant = 'default',
  className,
}) => {
  const isClickable = !!onClick && !disabled;

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        'transition-all duration-150',
        variant === 'default' && [
          'bg-slate-100 text-slate-700',
          isClickable && 'hover:bg-slate-200 active:bg-slate-300',
        ],
        variant === 'outline' && [
          'border border-slate-200 bg-white text-slate-700',
          isClickable && 'hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100',
        ],
        selected && [
          'bg-blue-600 text-white border-blue-600',
          isClickable && 'hover:bg-blue-700',
        ],
        isClickable && [
          'cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50',
        ],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
};

/**
 * Interactive Icon Button
 * Use this for icon-only buttons with proper states
 */

interface InteractiveIconButtonProps {
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'solid';
  className?: string;
  title?: string;
}

export const InteractiveIconButton: React.FC<InteractiveIconButtonProps> = ({
  onClick,
  active,
  disabled,
  children,
  size = 'md',
  variant = 'ghost',
  className,
  title,
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-10 w-10',
  };

  const variantClasses = {
    ghost: [
      'hover:bg-slate-100 active:bg-slate-200',
      active && 'bg-slate-100 text-slate-900',
    ],
    outline: [
      'border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100',
      active && 'border-blue-600 bg-blue-50 text-blue-700',
    ],
    solid: [
      'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950',
      active && 'bg-blue-600 hover:bg-blue-700',
    ],
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        'inline-flex items-center justify-center rounded-lg',
        'transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  );
};
