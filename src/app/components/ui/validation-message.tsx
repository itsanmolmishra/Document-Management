import React from 'react';
import { cn } from '@/app/lib/utils';
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export type ValidationMessageType = 'error' | 'success' | 'warning' | 'info';

interface ValidationMessageProps {
  type?: ValidationMessageType;
  message: string;
  className?: string;
  showIcon?: boolean;
}

const typeConfig = {
  error: {
    color: 'text-red-600',
    icon: AlertCircle,
  },
  success: {
    color: 'text-green-600',
    icon: CheckCircle2,
  },
  warning: {
    color: 'text-amber-600',
    icon: AlertTriangle,
  },
  info: {
    color: 'text-blue-600',
    icon: Info,
  },
};

/**
 * Validation Message Component
 * Used for inline form validation feedback
 */
export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  type = 'error',
  message,
  className,
  showIcon = true,
}) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <p
      className={cn(
        'text-xs flex items-start gap-1.5 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200',
        config.color,
        className
      )}
    >
      {showIcon && <Icon className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />}
      <span>{message}</span>
    </p>
  );
};

/**
 * Field Error Component
 * Specialized for showing field-level errors
 */
export const FieldError: React.FC<{ message?: string | null; className?: string }> = ({
  message,
  className,
}) => {
  if (!message) return null;

  return <ValidationMessage type="error" message={message} className={className} />;
};

/**
 * Field Success Component
 * Specialized for showing field-level success messages
 */
export const FieldSuccess: React.FC<{ message?: string | null; className?: string }> = ({
  message,
  className,
}) => {
  if (!message) return null;

  return <ValidationMessage type="success" message={message} className={className} />;
};

/**
 * Form Error Summary
 * Shows all form errors at the top of a form
 */
interface FormErrorSummaryProps {
  errors: Record<string, string>;
  className?: string;
}

export const FormErrorSummary: React.FC<FormErrorSummaryProps> = ({ errors, className }) => {
  const errorList = Object.entries(errors);

  if (errorList.length === 0) return null;

  return (
    <div
      className={cn(
        'bg-red-50 border border-red-200 rounded-lg p-4 animate-in fade-in slide-in-from-top-2 duration-300',
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-sm text-red-900 mb-2">
            Please correct the following errors:
          </h4>
          <ul className="space-y-1">
            {errorList.map(([field, error]) => (
              <li key={field} className="text-sm text-red-800 flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
