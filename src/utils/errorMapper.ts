import type { ValidationErrors } from '../types/api';

export const mapApiErrors = (
  errors: ValidationErrors,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  setErrors: (errors: any) => void
) => {
  const fieldErrors: Record<string, string[]> = {};
  for (const key in errors) {
    fieldErrors[key] = errors[key];
  }
  setErrors(fieldErrors);
};
