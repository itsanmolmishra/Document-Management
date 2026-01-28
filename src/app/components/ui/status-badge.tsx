import React from 'react';
import { cn } from '@/app/lib/utils';
import { Badge } from './badge';

export type DocumentStatus = 
  | 'Under Review'
  | 'Approved' 
  | 'Active'
  | 'Archived'
  | 'Locked'
  | 'Draft'
  | 'Pending'
  | 'Rejected';

interface StatusBadgeProps {
  status: DocumentStatus | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<string, { 
  variant: 'default' | 'success' | 'warning' | 'destructive' | 'secondary' | 'outline';
  color: string;
  bgColor: string;
  borderColor: string;
  icon?: string;
}> = {
  'under review': {
    variant: 'warning',
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
    borderColor: 'border-amber-200',
    icon: '⏳'
  },
  'approved': {
    variant: 'success',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200',
    icon: '✓'
  },
  'active': {
    variant: 'success',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200',
    icon: '●'
  },
  'archived': {
    variant: 'secondary',
    color: 'text-slate-600',
    bgColor: 'bg-slate-100',
    borderColor: 'border-slate-200',
    icon: '📦'
  },
  'locked': {
    variant: 'destructive',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200',
    icon: '🔒'
  },
  'draft': {
    variant: 'outline',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-300',
    icon: '📝'
  },
  'pending': {
    variant: 'warning',
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
    borderColor: 'border-amber-200',
    icon: '⏸'
  },
  'rejected': {
    variant: 'destructive',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200',
    icon: '✕'
  }
};

const sizeConfig = {
  sm: {
    width: 'w-[88px]',
    height: 'h-6',
    text: 'text-xs',
    padding: 'px-2.5'
  },
  md: {
    width: 'w-[104px]',
    height: 'h-7',
    text: 'text-sm',
    padding: 'px-3'
  },
  lg: {
    width: 'w-[120px]',
    height: 'h-8',
    text: 'text-sm',
    padding: 'px-4'
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  className,
  size = 'md'
}) => {
  const normalizedStatus = status.toLowerCase();
  const config = statusConfig[normalizedStatus] || statusConfig['draft'];
  const sizeStyles = sizeConfig[size];

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200',
        'shadow-sm hover:shadow-md',
        sizeStyles.width,
        sizeStyles.height,
        sizeStyles.text,
        sizeStyles.padding,
        config.bgColor,
        config.color,
        config.borderColor,
        'border',
        className
      )}
    >
      <span className="truncate">{status}</span>
    </div>
  );
};

// Alternative: Compact StatusBadge with icon
export const CompactStatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  className,
  size = 'md'
}) => {
  const normalizedStatus = status.toLowerCase();
  const config = statusConfig[normalizedStatus] || statusConfig['draft'];
  const sizeStyles = sizeConfig[size];

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center gap-1.5 font-semibold rounded-full transition-all duration-200',
        'shadow-sm hover:shadow-md',
        sizeStyles.height,
        sizeStyles.text,
        sizeStyles.padding,
        config.bgColor,
        config.color,
        config.borderColor,
        'border',
        'min-w-[96px]',
        className
      )}
    >
      {config.icon && <span className="text-xs">{config.icon}</span>}
      <span className="truncate">{status}</span>
    </div>
  );
};

// Pill variant with fixed width and dot indicator
export const StatusPill: React.FC<StatusBadgeProps> = ({ 
  status, 
  className,
  size = 'md'
}) => {
  const normalizedStatus = status.toLowerCase();
  const config = statusConfig[normalizedStatus] || statusConfig['draft'];
  const sizeStyles = sizeConfig[size];

  // Dot color mapping
  const dotColorMap: Record<string, string> = {
    'under review': 'bg-amber-500',
    'approved': 'bg-green-500',
    'active': 'bg-green-500',
    'archived': 'bg-slate-400',
    'locked': 'bg-red-500',
    'draft': 'bg-slate-400',
    'pending': 'bg-amber-500',
    'rejected': 'bg-red-500'
  };

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200',
        'shadow-sm hover:shadow-md',
        sizeStyles.width,
        sizeStyles.height,
        sizeStyles.text,
        sizeStyles.padding,
        config.bgColor,
        config.color,
        config.borderColor,
        'border',
        className
      )}
    >
      <div className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColorMap[normalizedStatus] || 'bg-slate-400')} />
      <span className="truncate">{status}</span>
    </div>
  );
};

// Helper function to get status variant (for backward compatibility)
export const getStatusVariant = (status: string): 'default' | 'success' | 'warning' | 'destructive' | 'secondary' | 'outline' => {
  const normalizedStatus = status.toLowerCase();
  return statusConfig[normalizedStatus]?.variant || 'outline';
};