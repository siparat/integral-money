export enum BaseApiRoutes {
	LOGIN = 'auth/login',
	REGISTER = 'auth/register',
	GET_USER_INFO = 'user/info',
	UPDATE_AVATAR = 'user/avatar',
	FIXED_COST = 'fixed-cost',
	DELETE_FIXED_COST = 'fixed-cost/:id',
	CREATE_OPERATION = 'operation',
	DELETE_OPERATION = 'operation/:id',
	SEARCH_OPERATIONS = 'operation/search',
	GET_FIXED_COST_TYPES = 'fixed-cost/types',
	GET_ALL_CATEGORIES = 'operation/all-categories'
}
