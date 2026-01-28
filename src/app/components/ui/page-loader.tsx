import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/app/lib/utils';

interface PageLoaderProps {
  message?: string;
  className?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ 
  message = 'Loading...', 
  className 
}) => {
  return (
    <div className={cn(
      "fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center",
      className
    )}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />
          <Loader2 className="absolute inset-0 m-auto h-8 w-8 text-blue-600 opacity-0" />
        </div>
        <p className="text-sm font-medium text-slate-600 animate-pulse">{message}</p>
      </div>
    </div>
  );
};

interface SectionLoaderProps {
  className?: string;
  rows?: number;
}

export const SectionLoader: React.FC<SectionLoaderProps> = ({ 
  className,
  rows = 3 
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse flex items-center gap-4">
          <div className="h-12 w-12 bg-slate-200 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded w-3/4" />
            <div className="h-3 bg-slate-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

interface CardSkeletonProps {
  className?: string;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ className }) => {
  return (
    <div className={cn(
      "bg-white rounded-xl border border-slate-200 p-6 shadow-sm",
      className
    )}>
      <div className="animate-pulse space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-slate-200 rounded w-1/4" />
            <div className="h-6 bg-slate-200 rounded w-1/3" />
          </div>
          <div className="h-10 w-10 bg-slate-200 rounded-lg" />
        </div>
        <div className="h-3 bg-slate-200 rounded w-1/2" />
      </div>
    </div>
  );
};

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ 
  rows = 5, 
  columns = 4,
  className 
}) => {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-slate-200", className)}>
      <div className="bg-slate-50 p-4">
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="flex-1">
              <div className="h-4 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
      <div className="divide-y divide-slate-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4 animate-pulse">
            <div className="flex gap-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="flex-1">
                  <div className="h-4 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface InlineLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const InlineLoader: React.FC<InlineLoaderProps> = ({ 
  size = 'md',
  className 
}) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
  
  return (
    <Loader2 className={cn(
      'animate-spin text-slate-400',
      sizeClasses[size],
      className
    )} />
  );
};
