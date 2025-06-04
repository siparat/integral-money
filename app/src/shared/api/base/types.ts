export interface BaseApiError {
	message: string;
	error: string;
	statusCode: number;
}

export interface BaseApiValidationError extends Omit<BaseApiError, 'message'> {
	message: string[];
}
