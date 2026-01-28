import * as React from "react"
import { cn } from "@/app/lib/utils"
import { EnhancedInput, ValidationState } from "./enhanced-input"

interface FormFieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  helperText?: string
  validationState?: ValidationState
  errorText?: string
  successText?: string
  warningText?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  className?: string
}

/**
 * Complete form field with built-in validation display
 * Use this for quick form implementations
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  helperText,
  validationState = 'none',
  errorText,
  successText,
  warningText,
  value,
  onChange,
  onBlur,
  className
}) => {
  return (
    <EnhancedInput
      id={name}
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      helperText={helperText}
      validationState={validationState}
      errorText={errorText}
      successText={successText}
      warningText={warningText}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      containerClassName={className}
    />
  )
}

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  errorText?: string
  validationState?: 'error' | 'success' | 'none'
  containerClassName?: string
}

export const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ 
    className, 
    label,
    helperText,
    errorText,
    validationState = 'none',
    required,
    disabled,
    containerClassName,
    id,
    ...props 
  }, ref) => {
    const textareaId = id || React.useId()
    const displayMessage = validationState === 'error' ? errorText : helperText
    
    const borderColor = 
      validationState === 'error' ? 'border-red-300 focus-visible:border-red-500 focus-visible:ring-red-500/20' :
      validationState === 'success' ? 'border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/20' :
      'border-slate-200 focus-visible:border-blue-600 focus-visible:ring-blue-600/20'
    
    const textColor = 
      validationState === 'error' ? 'text-red-600' :
      validationState === 'success' ? 'text-green-600' :
      'text-slate-500'

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label 
            htmlFor={textareaId}
            className={cn(
              "text-sm font-medium text-slate-700 block",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <textarea
          id={textareaId}
          className={cn(
            "flex min-h-[100px] w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm transition-all",
            "placeholder:text-slate-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
            "resize-y",
            borderColor,
            className
          )}
          ref={ref}
          disabled={disabled}
          required={required}
          aria-invalid={validationState === 'error'}
          aria-describedby={displayMessage ? `${textareaId}-message` : undefined}
          {...props}
        />

        {displayMessage && (
          <p 
            id={`${textareaId}-message`}
            className={cn("text-xs", textColor)}
          >
            {displayMessage}
          </p>
        )}
      </div>
    )
  }
)
TextareaField.displayName = "TextareaField"
