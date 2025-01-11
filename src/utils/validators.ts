export type ValidationRule<T = Record<string, string>> = {
  /**
   * A function that validates a specific field's value.
   * @param value - The value of the field being validated.
   * @param values - The full set of form values, useful for cross-field validation.
   * @returns A boolean indicating whether the validation passed.
   */
  validate: (value: string, values: T) => boolean;
  /**
   * The error message to display if the validation fails.
   */
  message: string;
};

/**
 * A schema that maps form fields to their validation rules.
 */
export type ValidationSchema<T> = {
  [K in keyof T]: ValidationRule<T>[];
};

/**
 * Validates a set of form values against a validation schema.
 * @param values - The form values to validate.
 * @param schema - The validation schema defining rules for each field.
 * @returns A partial record of errors for fields that failed validation.
 */
export const validateForm = <T extends Record<string, string>>(
  values: T,
  schema: ValidationSchema<T>
): Partial<Record<keyof T, string>> => {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const key in schema) {
    const rules = schema[key];
    for (const rule of rules) {
      if (!rule.validate(values[key], values)) {
        errors[key] = rule.message; // Assign the error message for the first failing rule
        break; // Stop checking further rules for this field
      }
    }
  }

  return errors;
};
