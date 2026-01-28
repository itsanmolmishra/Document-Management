import React from 'react';
import { Toaster } from 'sonner';

/**
 * Toast Provider with custom styling for the DMAS system
 * Add this to your App.tsx root
 */
export const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      duration={4000}
      toastOptions={{
        style: {
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06)',
          border: '1px solid',
        },
        classNames: {
          toast: 'backdrop-blur-sm',
          title: 'font-semibold text-sm',
          description: 'text-sm opacity-90 mt-1',
          actionButton: 'bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3 py-1.5 text-xs font-medium',
          cancelButton: 'bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium',
          closeButton: 'bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-600 border-0',
        },
      }}
    />
  );
};
