import { isAxiosError } from 'axios';

interface ApiErrorResponse {
  message?: string;
}

export const getApiErrorMessage = (error: unknown): string => {
  if (isAxiosError<ApiErrorResponse>(error)) {
    const message = error.response?.data?.message;
    if (typeof message === 'string' && message) return message;
  }
  if (error instanceof Error && error.message) return error.message;
  return 'Something went wrong. Please try again.';
};
