
import * as cookie from 'cookie';
import { verify } from 'jsonwebtoken';

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

export async function handle({ request, resolve }) {
	console.log(request.headers);
	const response = await resolve(request);
	return {
		...response,
		headers: {
			...response.headers,
		}
	};
}

export function getSession(request) {
	const cookies = cookie.parse(request.headers.cookie || '');
	let jsonWebTokenData;  
	if(cookies.jwt){
		console.log(cookies.jwt, TOKEN_KEY);
		jsonWebTokenData = verify(cookies.jwt,TOKEN_KEY);
		if(jsonWebTokenData){
			return {
				authenticated: true,
				user: jsonWebTokenData,
			}
		}
	}
	return {
		authenticated: cookies.jwt ? true : false,
	};
}