import React, { useState, useEffect } from 'react';
import { cn } from '@/app/lib/utils';

interface LoadingWrapperProps {
  isLoading: boolean;
  skeleton?: React.ReactNode;
  children: React.ReactNode;
  delay?: number; // Minimum loading time to show skeleton
  className?: string;
  fadeIn?: boolean;
}

/**
 * Universal Loading Wrapper
 * Ensures content never appears instantly - always shows loading state first
 * This creates a more realistic, production-ready feel
 */
export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  isLoading,
  skeleton,
  children,
  delay = 300,
  className,
  fadeIn = true,
}) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowSkeleton(true);
      setShowContent(false);
    } else {
      // Ensure minimum delay before showing content
      const timer = setTimeout(() => {
        setShowSkeleton(false);
        // Slight delay for fade-in effect
        setTimeout(() => setShowContent(true), 50);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isLoading, delay]);

  if (showSkeleton || isLoading) {
    return <div className={className}>{skeleton}</div>;
  }

  return (
    <div
      className={cn(
        className,
        fadeIn && showContent && 'animate-in fade-in duration-500'
      )}
    >
      {children}
    </div>
  );
};

/**
 * Delayed Content Wrapper
 * Shows content with a realistic delay even if data loads instantly
 */
export const DelayedContent: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 400, className }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return (
    <div className={cn('animate-in fade-in slide-in-from-bottom-2 duration-500', className)}>
      {children}
    </div>
  );
};

/**
 * Progressive List Loader
 * Renders list items with staggered delays for smooth appearance
 */
export const ProgressiveList: React.FC<{
  items: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}> = ({ items, staggerDelay = 50, className }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < items.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, staggerDelay);

      return () => clearTimeout(timer);
    }
  }, [visibleCount, items.length, staggerDelay]);

  return (
    <div className={className}>
      {items.slice(0, visibleCount).map((item, index) => (
        <div
          key={index}
          className="animate-in fade-in slide-in-from-left-2 duration-300"
          style={{ animationDelay: `${index * 30}ms` }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
