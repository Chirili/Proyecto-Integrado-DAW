import * as hash from 'bcrypt';
import {connectToDatabase} from '$lib/db';

const DATABASE_NAME = import.meta.env.VITE_DB_NAME;

export async function post(request){
    const data = JSON.parse(request.body);
    const salt = await hash.genSalt(10)
    const client = await connectToDatabase();
    const user = await client.db(DATABASE_NAME).collection("users").findOne({email: data.email});
    data.password = await hash.hash(data.password, salt);

    if(user){
        return {
            status: 204,
            body: user
        }
    }

    const dbResult = await client.db(DATABASE_NAME).collection("users").insertOne(data);
    if(dbResult){
        return {
            status: 400,
            body: {error: "Error al guardar el usuario"}
        }
    }
    return{
        status: 200,
        body: request.body,
    }
}