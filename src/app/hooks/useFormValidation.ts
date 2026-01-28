import { useState, useCallback } from 'react';
import { ValidationRule, validateField, validateForm } from '@/app/lib/validation';

interface FormField {
  value: any;
  error: string | null;
  touched: boolean;
}

interface UseFormValidationProps {
  initialValues: Record<string, any>;
  validationRules: Record<string, ValidationRule[]>;
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
}

/**
 * Custom hook for form validation with real-time feedback
 * Provides validation state, error handling, and submission logic
 */
export const useFormValidation = ({
  initialValues,
  validationRules,
  onSubmit,
}: UseFormValidationProps) => {
  const [fields, setFields] = useState<Record<string, FormField>>(() => {
    const initialFields: Record<string, FormField> = {};
    for (const key of Object.keys(initialValues)) {
      initialFields[key] = {
        value: initialValues[key],
        error: null,
        touched: false,
      };
    }
    return initialFields;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Update a field value
   */
  const setFieldValue = useCallback((fieldName: string, value: any) => {
    setFields((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
      },
    }));
  }, []);

  /**
   * Mark a field as touched (for showing validation on blur)
   */
  const setFieldTouched = useCallback((fieldName: string) => {
    setFields((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        touched: true,
      },
    }));
  }, []);

  /**
   * Validate a single field
   */
  const validateSingleField = useCallback(
    (fieldName: string, value: any) => {
      const rules = validationRules[fieldName];
      if (!rules) return null;

      const { error } = validateField(value, rules);
      return error;
    },
    [validationRules]
  );

  /**
   * Handle field change
   */
  const handleChange = useCallback(
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setFieldValue(fieldName, value);

      // Validate on change if field is already touched
      if (fields[fieldName]?.touched) {
        const error = validateSingleField(fieldName, value);
        setFields((prev) => ({
          ...prev,
          [fieldName]: {
            ...prev[fieldName],
            error,
          },
        }));
      }
    },
    [fields, setFieldValue, validateSingleField]
  );

  /**
   * Handle field blur
   */
  const handleBlur = useCallback(
    (fieldName: string) => () => {
      setFieldTouched(fieldName);
      const value = fields[fieldName]?.value;
      const error = validateSingleField(fieldName, value);

      setFields((prev) => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          error,
          touched: true,
        },
      }));
    },
    [fields, setFieldTouched, validateSingleField]
  );

  /**
   * Get current form values
   */
  const getValues = useCallback(() => {
    const values: Record<string, any> = {};
    for (const [key, field] of Object.entries(fields)) {
      values[key] = field.value;
    }
    return values;
  }, [fields]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      // Validate all fields
      const values = getValues();
      const { isValid, errors } = validateForm(values, validationRules);

      // Mark all fields as touched and set errors
      setFields((prev) => {
        const updated = { ...prev };
        for (const key of Object.keys(prev)) {
          updated[key] = {
            ...prev[key],
            touched: true,
            error: errors[key] || null,
          };
        }
        return updated;
      });

      if (!isValid) {
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [getValues, validationRules, onSubmit]
  );

  /**
   * Reset the form
   */
  const reset = useCallback(() => {
    setFields(() => {
      const resetFields: Record<string, FormField> = {};
      for (const key of Object.keys(initialValues)) {
        resetFields[key] = {
          value: initialValues[key],
          error: null,
          touched: false,
        };
      }
      return resetFields;
    });
  }, [initialValues]);

  /**
   * Check if form is valid
   */
  const isValid = Object.values(fields).every((field) => !field.error);

  /**
   * Check if form has been touched
   */
  const isDirty = Object.values(fields).some((field) => field.touched);

  return {
    fields,
    values: getValues(),
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    reset,
    isSubmitting,
    isValid,
    isDirty,
  };
};
