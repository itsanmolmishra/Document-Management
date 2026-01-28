import { useState, useEffect } from 'react';

/**
 * Custom hook to simulate realistic loading delays
 * Even if data is instant, this creates a more authentic feel
 */
export const useDelayedLoader = (
  initialLoading: boolean = true,
  minDelay: number = 300,
  maxDelay: number = 800
) => {
  const [isLoading, setIsLoading] = useState(initialLoading);

  useEffect(() => {
    if (initialLoading) {
      // Random delay between min and max for realism
      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [initialLoading, minDelay, maxDelay]);

  return isLoading;
};

/**
 * Hook for button loading states with callback
 */
export const useButtonLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const withLoading = async <T,>(
    callback: () => Promise<T>,
    minLoadingTime: number = 500
  ): Promise<T> => {
    setIsLoading(true);
    const startTime = Date.now();

    try {
      const result = await callback();
      
      // Ensure minimum loading time for UX
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, withLoading };
};

/**
 * Hook for progressive content loading
 * Useful for rendering items one by one with delays
 */
export const useProgressiveLoad = <T,>(
  items: T[],
  delayBetweenItems: number = 50
) => {
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (loadedCount < items.length) {
      const timer = setTimeout(() => {
        setLoadedCount(prev => prev + 1);
      }, delayBetweenItems);

      return () => clearTimeout(timer);
    }
  }, [loadedCount, items.length, delayBetweenItems]);

  return items.slice(0, loadedCount);
};
