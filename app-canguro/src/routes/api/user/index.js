import {connectToDatabase} from '$lib/db';
import { ObjectId } from 'bson';

const DATABASE_NAME = import.meta.env.VITE_DB_NAME;

export async function post(request){
    const data = JSON.parse(request.body);
    const client = await connectToDatabase();
    const result = await client.db(DATABASE_NAME).collection("users").findOne({"_id": new ObjectId(data.uid)});
    console.log(result);
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
    const result = await client.db(DATABASE_NAME).collection("users").update({"_id": new ObjectId(uid)},data);
    return{
        status: 200,
        body: result,
    }
}