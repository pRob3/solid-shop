import { apiRequest } from '../api/apiClient';
import type { ApiResponse, AuthResponseData } from '../types/api';
import type { ValidationSchema } from '../utils/validators';

const getApiUrl = (endpoint: string) =>
  `${import.meta.env.VITE_API_URL}${endpoint}`;

// Type alias for API responses
type AuthApiResponse = ApiResponse<AuthResponseData>;

// Interface for Register Request DTO
export interface RegisterRequestDto extends Record<string, string> {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Interface for Login Request DTO
export interface LoginRequestDto extends Record<string, string> {
  email: string;
  password: string;
}

// Register Validation Schema
export const registerValidationSchema: ValidationSchema<RegisterRequestDto> = {
  username: [
    { validate: (value) => !!value, message: 'Username is required' },
    {
      validate: (value) => value.length >= 3,
      message: 'Username must be at least 3 characters',
    },
  ],
  email: [
    { validate: (value) => !!value, message: 'Email is required' },
    {
      validate: (value) => /\S+@\S+\.\S+/.test(value),
      message: 'Invalid email format',
    },
  ],
  password: [
    { validate: (value) => !!value, message: 'Password is required' },
    {
      validate: (value) => value.length >= 6,
      message: 'Password must be at least 6 characters',
    },
  ],
  confirmPassword: [
    {
      validate: (value, values) => value === values.password,
      message: 'Passwords do not match',
    },
  ],
};

// Login Validation Schema
export const loginValidationSchema: ValidationSchema<LoginRequestDto> = {
  email: [
    { validate: (value) => !!value, message: 'Email is required' },
    {
      validate: (value) => /\S+@\S+\.\S+/.test(value),
      message: 'Invalid email format',
    },
  ],
  password: [
    { validate: (value) => !!value, message: 'Password is required' },
    {
      validate: (value) => value.length >= 6,
      message: 'Password must be at least 6 characters',
    },
  ],
};

// Register User
export const registerUser = async (
  data: RegisterRequestDto
): Promise<AuthApiResponse> => {
  return await apiRequest<AuthApiResponse>({
    url: getApiUrl('/api/Auth/register'),
    method: 'POST',
    data,
  });
};

// Login User
export const loginUser = async (
  data: LoginRequestDto
): Promise<AuthApiResponse> => {
  return await apiRequest<AuthApiResponse>({
    url: getApiUrl('/api/Auth/login'),
    method: 'POST',
    data,
  });
};

// Refresh Token API Call
export const refreshToken = async (
  refreshToken: string,
  token: string
): Promise<ApiResponse<AuthResponseData>> => {
  try {
    return await apiRequest<ApiResponse<AuthResponseData>>({
      url: getApiUrl('/api/Auth/refresh-token'),
      method: 'POST',
      data: { refreshToken, token },
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

// Logout API Call (optional)
export const logoutUser = async (): Promise<ApiResponse<null>> => {
  return await apiRequest<ApiResponse<null>>({
    url: getApiUrl('/api/Auth/logout'),
    method: 'POST',
  });
};
