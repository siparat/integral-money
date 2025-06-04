import type { BaseApiError, BaseApiValidationError } from './types';

export const isBaseApiError = (obj: any): obj is BaseApiValidationError | BaseApiError => 'error' in obj && 'statusCode' in obj;
