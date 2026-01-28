import React from 'react';
import { cn } from '@/app/lib/utils';
import { Skeleton } from './skeleton';
import { Card, CardContent, CardHeader } from './card';

/**
 * Specialized skeleton loaders for different sections
 * These match the actual component layouts for seamless transitions
 */

// Dashboard Stat Card Skeleton
export const StatCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Card className={cn('overflow-hidden shadow-sm', className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-3 flex-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  );
};

// Chart Skeleton
export const ChartSkeleton: React.FC<{ className?: string; height?: string }> = ({ 
  className, 
  height = 'h-64' 
}) => {
  return (
    <Card className={cn('overflow-hidden shadow-sm', className)}>
      <CardHeader>
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-3 w-64 mt-2" />
      </CardHeader>
      <CardContent>
        <div className={cn('relative', height)}>
          {/* Chart bars/lines simulation */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-2 px-4 pb-4">
            {[60, 80, 45, 90, 55, 70, 65].map((height, i) => (
              <Skeleton 
                key={i} 
                className="flex-1 rounded-t-md" 
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Document Row Skeleton (for tables/lists)
export const DocumentRowSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex items-center gap-4 p-4 border-b border-slate-100', className)}>
      <Skeleton className="h-10 w-10 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
  );
};

// Table Skeleton with realistic structure
export const DataTableSkeleton: React.FC<{ 
  rows?: number; 
  columns?: number;
  className?: string;
}> = ({ rows = 5, columns = 5, className }) => {
  return (
    <div className={cn('rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm', className)}>
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-4 w-4 rounded" /> {/* Checkbox */}
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="flex-1">
              <Skeleton className="h-4 w-full max-w-[120px]" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Rows */}
      <div>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div 
            key={rowIndex} 
            className="px-6 py-4 border-b border-slate-100 last:border-0"
            style={{ 
              animationDelay: `${rowIndex * 50}ms`,
              animation: 'fadeIn 0.3s ease-in-out'
            }}
          >
            <div className="flex gap-4 items-center">
              <Skeleton className="h-4 w-4 rounded" />
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="flex-1">
                  <Skeleton className={cn(
                    'h-4',
                    colIndex === 0 ? 'w-3/4' : colIndex === columns - 1 ? 'w-20' : 'w-2/3'
                  )} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Activity Feed Skeleton
export const ActivityFeedSkeleton: React.FC<{ items?: number; className?: string }> = ({ 
  items = 5, 
  className 
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div 
          key={i} 
          className="flex gap-4"
          style={{ 
            animationDelay: `${i * 100}ms`,
            animation: 'fadeIn 0.4s ease-in-out'
          }}
        >
          <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Form Skeleton
export const FormSkeleton: React.FC<{ fields?: number; className?: string }> = ({ 
  fields = 4, 
  className 
}) => {
  return (
    <div className={cn('space-y-6', className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-32" /> {/* Label */}
          <Skeleton className="h-10 w-full rounded-lg" /> {/* Input */}
          {i % 3 === 0 && <Skeleton className="h-3 w-48" />} {/* Helper text */}
        </div>
      ))}
      <div className="flex gap-3 pt-4">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  );
};

// Workflow Card Skeleton
export const WorkflowCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Card className={cn('overflow-hidden shadow-sm', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-3 w-64" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-2 flex-1 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
};

// Grid of Card Skeletons
export const CardGridSkeleton: React.FC<{ 
  count?: number; 
  columns?: 2 | 3 | 4;
  className?: string;
}> = ({ count = 6, columns = 3, className }) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-6', gridCols[columns], className)}>
      {Array.from({ length: count }).map((_, i) => (
        <StatCardSkeleton 
          key={i}
          className="animate-in fade-in"
          style={{ animationDelay: `${i * 50}ms` } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

// Page Header Skeleton
export const PageHeaderSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  );
};

// Search Bar Skeleton
export const SearchBarSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex gap-3', className)}>
      <Skeleton className="h-10 flex-1 rounded-lg" />
      <Skeleton className="h-10 w-32 rounded-lg" />
      <Skeleton className="h-10 w-10 rounded-lg" />
    </div>
  );
};
