import * as React from "react"
import { cn } from "@/app/lib/utils"
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from "lucide-react"

export type ValidationState = 'error' | 'success' | 'warning' | 'info' | 'none'

export interface EnhancedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  errorText?: string
  successText?: string
  warningText?: string
  infoText?: string
  validationState?: ValidationState
  showValidationIcon?: boolean
  containerClassName?: string
}

const validationStyles = {
  error: {
    border: 'border-red-300 focus-visible:border-red-500 focus-visible:ring-red-500/20',
    text: 'text-red-600',
    bg: 'bg-red-50',
    icon: AlertCircle
  },
  success: {
    border: 'border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/20',
    text: 'text-green-600',
    bg: 'bg-green-50',
    icon: CheckCircle2
  },
  warning: {
    border: 'border-amber-300 focus-visible:border-amber-500 focus-visible:ring-amber-500/20',
    text: 'text-amber-600',
    bg: 'bg-amber-50',
    icon: AlertTriangle
  },
  info: {
    border: 'border-blue-300 focus-visible:border-blue-500 focus-visible:ring-blue-500/20',
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    icon: Info
  },
  none: {
    border: 'border-slate-200 focus-visible:border-blue-600 focus-visible:ring-blue-600/20',
    text: 'text-slate-500',
    bg: 'bg-white',
    icon: null
  }
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ 
    className, 
    type, 
    label,
    helperText,
    errorText,
    successText,
    warningText,
    infoText,
    validationState = 'none',
    showValidationIcon = true,
    required,
    disabled,
    containerClassName,
    id,
    ...props 
  }, ref) => {
    const inputId = id || React.useId()
    const styles = validationStyles[validationState]
    const Icon = styles.icon
    
    // Determine the message to display
    const displayMessage = 
      validationState === 'error' ? errorText :
      validationState === 'success' ? successText :
      validationState === 'warning' ? warningText :
      validationState === 'info' ? infoText :
      helperText

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label 
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium text-slate-700 block",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <input
            type={type}
            id={inputId}
            className={cn(
              "flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm transition-all",
              "placeholder:text-slate-400",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
              styles.border,
              validationState !== 'none' && showValidationIcon && "pr-10",
              className
            )}
            ref={ref}
            disabled={disabled}
            required={required}
            aria-invalid={validationState === 'error'}
            aria-describedby={displayMessage ? `${inputId}-message` : undefined}
            {...props}
          />
          
          {/* Validation Icon */}
          {validationState !== 'none' && showValidationIcon && Icon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon className={cn("h-4 w-4", styles.text)} />
            </div>
          )}
        </div>

        {/* Helper/Error/Success Message */}
        {displayMessage && (
          <p 
            id={`${inputId}-message`}
            className={cn(
              "text-xs flex items-start gap-1.5 leading-relaxed",
              styles.text
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />}
            <span>{displayMessage}</span>
          </p>
        )}
      </div>
    )
  }
)
EnhancedInput.displayName = "EnhancedInput"

export { EnhancedInput }
