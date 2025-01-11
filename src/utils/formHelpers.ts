import { Accessor, type Setter } from 'solid-js';

export const createFieldHandler =
  <T extends Record<string, unknown>>(
    setValues: Setter<T>,
    setErrors: Setter<Partial<Record<keyof T, string>>>
  ) =>
  (field: keyof T) =>
  (e: Event) => {
    const target = e.target as HTMLInputElement;
    setValues((prev) => ({ ...prev, [field]: target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined })); // Clear local field error
  };
