import { toast as sonnerToast } from 'sonner';

/**
 * Enhanced toast utilities for DMAS
 * Provides consistent styling and messaging across the application
 */

export const toast = {
  success: (message: string, description?: string) => {
    return sonnerToast.success(message, {
      description,
      style: {
        background: '#f0fdf4',
        borderColor: '#bbf7d0',
        color: '#166534',
      },
    });
  },

  error: (message: string, description?: string) => {
    return sonnerToast.error(message, {
      description,
      style: {
        background: '#fef2f2',
        borderColor: '#fecaca',
        color: '#991b1b',
      },
    });
  },

  warning: (message: string, description?: string) => {
    return sonnerToast.warning(message, {
      description,
      style: {
        background: '#fffbeb',
        borderColor: '#fde68a',
        color: '#92400e',
      },
    });
  },

  info: (message: string, description?: string) => {
    return sonnerToast.info(message, {
      description,
      style: {
        background: '#eff6ff',
        borderColor: '#bfdbfe',
        color: '#1e40af',
      },
    });
  },

  loading: (message: string, description?: string) => {
    return sonnerToast.loading(message, {
      description,
      style: {
        background: '#f8fafc',
        borderColor: '#cbd5e1',
        color: '#475569',
      },
    });
  },

  promise: <T,>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return sonnerToast.promise(promise, {
      loading,
      success,
      error,
    });
  },

  // Common toast messages for DMAS
  documentUploaded: (filename: string) => {
    return toast.success('Document Uploaded', `${filename} has been successfully uploaded.`);
  },

  documentDeleted: (filename: string) => {
    return toast.success('Document Deleted', `${filename} has been permanently deleted.`);
  },

  documentApproved: (filename: string) => {
    return toast.success('Document Approved', `${filename} has been approved.`);
  },

  documentRejected: (filename: string, reason?: string) => {
    return toast.error('Document Rejected', reason || `${filename} has been rejected.`);
  },

  settingsSaved: () => {
    return toast.success('Settings Saved', 'Your changes have been saved successfully.');
  },

  actionFailed: (action: string) => {
    return toast.error('Action Failed', `Unable to ${action}. Please try again.`);
  },

  networkError: () => {
    return toast.error('Network Error', 'Unable to connect to server. Please check your connection.');
  },

  accessDenied: () => {
    return toast.error('Access Denied', 'You do not have permission to perform this action.');
  },

  sessionExpired: () => {
    return toast.warning('Session Expired', 'Your session has expired. Please log in again.');
  },
};

export default toast;
