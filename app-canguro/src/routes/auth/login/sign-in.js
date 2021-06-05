import {connectToDatabase} from '$lib/db';
import {sign} from 'jsonwebtoken';
import * as cookie from 'cookie';

const DATABASE_NAME = import.meta.env.VITE_DB_NAME;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

export async function post(request){
    const data = request.body;
    const client = await connectToDatabase();
    const user = await client.db(DATABASE_NAME).collection("users").findOne({
        email: data.email,
    });
    if(!user){
        return{
            status: 401,
            body: {error: "Email o contraseña incorrectos"}
        }
    }
    const jwt = sign({
        user: user,
    },TOKEN_KEY);

    return {
        headers:{
            "Set-Cookie": cookie.serialize('jwt',jwt,{
                maxAge: 60*60*2+3600,
                httpOnly: true,
                path: "/"
            }),
            'Content-Type' : 'application/json',
        },
        body: {jwt: jwt},
        status: 200,
    }
}