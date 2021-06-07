import {connectToDatabase} from '$lib/db';
import { ObjectId } from 'bson';
import * as cookie from 'cookie';
import * as jwt from 'jsonwebtoken';


const DATABASE_NAME = import.meta.env.VITE_DB_NAME;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;


export async function post(request){
    const data = JSON.parse(request.body);
    const client = await connectToDatabase();
    const result = await client.db(DATABASE_NAME).collection("users").findOne({"_id": new ObjectId(data.uid)});
    return {
        status: 200,
        body: result,
    }
}

export async function put(request){
    const data = request.body;
    const uid = data._id;


    delete data._id;

    const client  = await connectToDatabase();
    const result = await client.db(DATABASE_NAME).collection("users").update({"_id": new ObjectId(uid)},{$set: data},{upsert: true});
    const userUpdated = await client.db(DATABASE_NAME).collection("users").findOne({"_id": new ObjectId(uid)});
    const jwtToken = jwt.sign({
        user: userUpdated,
    },TOKEN_KEY);
    if(userUpdated){
        return {
            headers:{
                "Set-Cookie": cookie.serialize('jwt',jwtToken,{
                    maxAge: 60*60*2+3600,
                    httpOnly: true,
                    path: "/"
                }),
                'Content-Type' : 'application/json',
            },
            status: 200,
            body: userUpdated
        }
    }
    return{
        status: 200,
        body: userUpdated
    }
}