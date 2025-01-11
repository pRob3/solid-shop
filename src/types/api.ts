// Base API Response Interface
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  errors: string[] | ValidationErrors | null;
}

// Validation Errors for Form Errors
export interface ValidationErrors {
  [field: string]: string[];
}

// Specific Response Data for Login/Register
export interface AuthResponseData {
  id: string;
  userName: string;
  email: string;
  token: string;
  crayons: number;
  refreshToken: string;
  refreshExpiration: string; // ISO 8601 date format
}
