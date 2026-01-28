import React from 'react';
import { cn } from '@/app/lib/utils';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { Button } from './button';

type BannerVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertBannerProps {
  variant?: BannerVariant;
  title?: string;
  message: string;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const variantConfig = {
  info: {
    bg: 'bg-blue-50 border-blue-200',
    icon: Info,
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-900',
    messageColor: 'text-blue-800',
  },
  success: {
    bg: 'bg-green-50 border-green-200',
    icon: CheckCircle2,
    iconColor: 'text-green-600',
    titleColor: 'text-green-900',
    messageColor: 'text-green-800',
  },
  warning: {
    bg: 'bg-amber-50 border-amber-200',
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-900',
    messageColor: 'text-amber-800',
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    icon: AlertCircle,
    iconColor: 'text-red-600',
    titleColor: 'text-red-900',
    messageColor: 'text-red-800',
  },
};

/**
 * Alert Banner for persistent, page-level notifications
 * Use this for important messages that need to stay visible
 */
export const AlertBanner: React.FC<AlertBannerProps> = ({
  variant = 'info',
  title,
  message,
  onClose,
  action,
  className,
}) => {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'rounded-xl border p-4 shadow-sm animate-in slide-in-from-top-2 fade-in duration-300',
        config.bg,
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-4">
        <div className={cn('p-2 rounded-lg bg-white/60', config.iconColor)}>
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={cn('font-semibold text-sm mb-1', config.titleColor)}>
              {title}
            </h4>
          )}
          <p className={cn('text-sm leading-relaxed', config.messageColor)}>
            {message}
          </p>

          {action && (
            <Button
              onClick={action.onClick}
              size="sm"
              variant="outline"
              className="mt-3 h-8 text-xs"
            >
              {action.label}
            </Button>
          )}
        </div>

        {onClose && (
          <Button
            onClick={onClose}
            size="icon"
            variant="ghost"
            className={cn('h-8 w-8 flex-shrink-0', config.iconColor)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

/**
 * Inline Alert - smaller version for contextual messages
 */
export const InlineAlert: React.FC<Omit<AlertBannerProps, 'title' | 'action' | 'onClose'>> = ({
  variant = 'info',
  message,
  className,
}) => {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'rounded-lg border p-3 flex items-center gap-3 text-sm',
        config.bg,
        className
      )}
      role="alert"
    >
      <Icon className={cn('h-4 w-4 flex-shrink-0', config.iconColor)} />
      <p className={cn('leading-relaxed', config.messageColor)}>{message}</p>
    </div>
  );
};
