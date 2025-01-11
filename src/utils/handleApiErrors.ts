import type { ApiResponse, ValidationErrors } from '../types/api';

export const handleApiErrors = <T>(
  response: ApiResponse<T>,
  setGeneralError: (message: string | null) => void,
  setApiErrors: (errors: ValidationErrors | null) => void
) => {
  if (!response.success) {
    setGeneralError(response.message || 'An unexpected error occurred.');
    setApiErrors(Array.isArray(response.errors) ? null : response.errors);
  }
};
