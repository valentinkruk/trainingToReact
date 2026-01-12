import { jwtDecode, type JwtPayload } from 'jwt-decode';

export const autoLogin = () => {
	const token = localStorage.getItem('accessToken');
	if (!token) return null;
	if (token) {
		try {
			const decodedToken = jwtDecode<JwtPayload & { username: string }>(token);
			// decodedToken.exp время потухания токена
			if (decodedToken.exp && Date.now() <= decodedToken.exp * 1000)
				return { username: decodedToken.username, access_token: token };
			else {
				localStorage.removeItem('accessToken');
				return null;
			}
		} catch (error) {
			console.error(error);
			localStorage.removeItem('accessToken');
			return null;
		}
	}
	return null;
};
