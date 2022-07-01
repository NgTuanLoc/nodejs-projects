import { Unauthorized } from '../errors/unauthorized.js';

export const checkPermission = (requestUser, resourceUserId) => {
	if (requestUser.role === 'admin') return;
	if (requestUser.userId === resourceUserId.toString()) return;
	throw new Unauthorized('Unauthorized Error');
};
