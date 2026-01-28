import React from 'react';
import { cn } from '@/app/lib/utils';
import { Button } from './button';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'secondary';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Empty State Component
 * Use this whenever a section has no data to display
 * Never leave blank spaces - always show helpful empty states
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  size = 'md',
}) => {
  const sizeConfig = {
    sm: {
      container: 'py-8',
      iconSize: 'h-12 w-12',
      iconBg: 'p-3',
      title: 'text-base',
      description: 'text-xs',
      gap: 'gap-3',
    },
    md: {
      container: 'py-12',
      iconSize: 'h-16 w-16',
      iconBg: 'p-4',
      title: 'text-lg',
      description: 'text-sm',
      gap: 'gap-4',
    },
    lg: {
      container: 'py-20',
      iconSize: 'h-20 w-20',
      iconBg: 'p-5',
      title: 'text-xl',
      description: 'text-base',
      gap: 'gap-6',
    },
  };

  const config = sizeConfig[size];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        config.container,
        config.gap,
        'animate-in fade-in duration-500',
        className
      )}
    >
      {Icon && (
        <div
          className={cn(
            'rounded-2xl bg-slate-50 border-2 border-slate-100 text-slate-400 mb-2',
            config.iconBg
          )}
        >
          <Icon className={config.iconSize} strokeWidth={1.5} />
        </div>
      )}

      <div className={cn('space-y-2 max-w-md', config.gap)}>
        <h3 className={cn('font-semibold text-slate-900', config.title)}>
          {title}
        </h3>
        <p className={cn('text-slate-500 leading-relaxed', config.description)}>
          {description}
        </p>
      </div>

      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-2">
          {action && (
            <Button
              onClick={action.onClick}
              variant={action.variant || 'default'}
              size={size === 'sm' ? 'sm' : 'default'}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="ghost"
              size={size === 'sm' ? 'sm' : 'default'}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Specialized Empty States for common scenarios
 */

export const EmptyDocuments: React.FC<{
  onUpload?: () => void;
  className?: string;
}> = ({ onUpload, className }) => {
  return (
    <EmptyState
      icon={require('lucide-react').FileText}
      title="No documents found"
      description="Upload your first document to get started with document management."
      action={
        onUpload
          ? {
              label: 'Upload Document',
              onClick: onUpload,
            }
          : undefined
      }
      className={className}
    />
  );
};

export const EmptySearch: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <EmptyState
      icon={require('lucide-react').SearchX}
      title="No results found"
      description="Try adjusting your search terms or filters to find what you're looking for."
      className={className}
      size="sm"
    />
  );
};

export const EmptyArchive: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <EmptyState
      icon={require('lucide-react').Archive}
      title="Archive is empty"
      description="Documents that exceed their retention period will appear here for archival or disposal."
      className={className}
    />
  );
};

export const EmptyNotifications: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <EmptyState
      icon={require('lucide-react').Bell}
      title="No notifications"
      description="You're all caught up! Check back later for new updates."
      className={className}
      size="sm"
    />
  );
};

export const EmptyWorkflows: React.FC<{
  onCreate?: () => void;
  className?: string;
}> = ({ onCreate, className }) => {
  return (
    <EmptyState
      icon={require('lucide-react').GitPullRequest}
      title="No active workflows"
      description="Create your first workflow to start automating document approval processes."
      action={
        onCreate
          ? {
              label: 'Create Workflow',
              onClick: onCreate,
            }
          : undefined
      }
      className={className}
    />
  );
};

export const ErrorState: React.FC<{
  onRetry?: () => void;
  title?: string;
  description?: string;
  className?: string;
}> = ({
  onRetry,
  title = 'Something went wrong',
  description = 'We encountered an error while loading this content. Please try again.',
  className,
}) => {
  return (
    <EmptyState
      icon={require('lucide-react').AlertTriangle}
      title={title}
      description={description}
      action={
        onRetry
          ? {
              label: 'Try Again',
              onClick: onRetry,
              variant: 'outline',
            }
          : undefined
      }
      className={className}
    />
  );
};
