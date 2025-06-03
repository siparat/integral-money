export interface JwtPayload {
	userId: string;
}

export interface AuthSuccessResponse {
	token: string;
}
