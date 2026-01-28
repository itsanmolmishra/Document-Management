/**
 * Form validation utilities for DMAS
 * Provides realistic validation rules and error messages
 */

export type ValidationRule = {
  validate: (value: any) => boolean;
  message: string;
};

/**
 * Common validation rules
 */
export const validationRules = {
  required: (fieldName: string): ValidationRule => ({
    validate: (value) => {
      if (typeof value === 'string') return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined;
    },
    message: `${fieldName} is required`,
  }),

  email: (): ValidationRule => ({
    validate: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    message: 'Please enter a valid email address',
  }),

  minLength: (min: number, fieldName: string = 'This field'): ValidationRule => ({
    validate: (value) => value.length >= min,
    message: `${fieldName} must be at least ${min} characters`,
  }),

  maxLength: (max: number, fieldName: string = 'This field'): ValidationRule => ({
    validate: (value) => value.length <= max,
    message: `${fieldName} must not exceed ${max} characters`,
  }),

  minValue: (min: number, fieldName: string = 'Value'): ValidationRule => ({
    validate: (value) => Number(value) >= min,
    message: `${fieldName} must be at least ${min}`,
  }),

  maxValue: (max: number, fieldName: string = 'Value'): ValidationRule => ({
    validate: (value) => Number(value) <= max,
    message: `${fieldName} must not exceed ${max}`,
  }),

  pattern: (regex: RegExp, message: string): ValidationRule => ({
    validate: (value) => regex.test(value),
    message,
  }),

  phoneNumber: (): ValidationRule => ({
    validate: (value) => {
      // UAE phone number format
      const phoneRegex = /^(\+971|00971|0)?[0-9]{9}$/;
      return phoneRegex.test(value.replace(/[\s-]/g, ''));
    },
    message: 'Please enter a valid UAE phone number',
  }),

  emiratesId: (): ValidationRule => ({
    validate: (value) => {
      // Emirates ID format: 784-YYYY-XXXXXXX-X
      const eidRegex = /^784-\d{4}-\d{7}-\d$/;
      return eidRegex.test(value);
    },
    message: 'Please enter a valid Emirates ID (e.g., 784-1990-1234567-1)',
  }),

  fileSize: (maxSizeMB: number): ValidationRule => ({
    validate: (file: File) => {
      if (!file) return false;
      return file.size <= maxSizeMB * 1024 * 1024;
    },
    message: `File size must not exceed ${maxSizeMB}MB`,
  }),

  fileType: (allowedTypes: string[]): ValidationRule => ({
    validate: (file: File) => {
      if (!file) return false;
      return allowedTypes.includes(file.type);
    },
    message: `File type must be one of: ${allowedTypes.join(', ')}`,
  }),

  documentNumber: (): ValidationRule => ({
    validate: (value) => {
      // Document number format: DOC-YYYY-XXXXX
      const docRegex = /^DOC-\d{4}-\d{5}$/;
      return docRegex.test(value);
    },
    message: 'Please enter a valid document number (e.g., DOC-2025-00123)',
  }),

  positiveNumber: (fieldName: string = 'Value'): ValidationRule => ({
    validate: (value) => !isNaN(value) && Number(value) > 0,
    message: `${fieldName} must be a positive number`,
  }),

  alphanumeric: (fieldName: string = 'This field'): ValidationRule => ({
    validate: (value) => /^[a-zA-Z0-9\s]+$/.test(value),
    message: `${fieldName} can only contain letters, numbers, and spaces`,
  }),

  noSpecialChars: (fieldName: string = 'This field'): ValidationRule => ({
    validate: (value) => /^[a-zA-Z0-9\s-_.]+$/.test(value),
    message: `${fieldName} contains invalid characters`,
  }),

  matchField: (otherValue: any, fieldName: string): ValidationRule => ({
    validate: (value) => value === otherValue,
    message: `${fieldName} does not match`,
  }),

  strongPassword: (): ValidationRule => ({
    validate: (value) => {
      // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
      const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
      return strongRegex.test(value);
    },
    message:
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
  }),

  url: (): ValidationRule => ({
    validate: (value) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message: 'Please enter a valid URL',
  }),

  date: (): ValidationRule => ({
    validate: (value) => !isNaN(Date.parse(value)),
    message: 'Please enter a valid date',
  }),

  futureDate: (fieldName: string = 'Date'): ValidationRule => ({
    validate: (value) => {
      const date = new Date(value);
      return date > new Date();
    },
    message: `${fieldName} must be in the future`,
  }),

  pastDate: (fieldName: string = 'Date'): ValidationRule => ({
    validate: (value) => {
      const date = new Date(value);
      return date < new Date();
    },
    message: `${fieldName} must be in the past`,
  }),
};

/**
 * Validate a value against multiple rules
 */
export const validateField = (
  value: any,
  rules: ValidationRule[]
): { isValid: boolean; error: string | null } => {
  for (const rule of rules) {
    if (!rule.validate(value)) {
      return { isValid: false, error: rule.message };
    }
  }
  return { isValid: true, error: null };
};

/**
 * Validate an entire form
 */
export const validateForm = (
  formData: Record<string, any>,
  rules: Record<string, ValidationRule[]>
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = formData[field];
    const { isValid, error } = validateField(value, fieldRules);
    if (!isValid && error) {
      errors[field] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Common error messages for the DMAS system
 */
export const errorMessages = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  unauthorized: 'You do not have permission to perform this action.',
  sessionExpired: 'Your session has expired. Please log in again.',
  fileUploadFailed: 'Failed to upload file. Please try again.',
  invalidCredentials: 'Invalid username or password.',
  documentNotFound: 'Document not found or has been deleted.',
  invalidDocumentType: 'Invalid document type. Please upload a supported file format.',
  maxFileSizeExceeded: (maxSize: number) => `File size exceeds the maximum allowed size of ${maxSize}MB.`,
  requiredFieldsMissing: 'Please fill in all required fields.',
  invalidDateRange: 'End date must be after start date.',
  documentAlreadyExists: 'A document with this name already exists.',
  retentionPeriodInvalid: 'Retention period must be a positive number.',
  approvalRequired: 'This document requires approval before proceeding.',
  complianceViolation: 'This action violates compliance policies.',
};
