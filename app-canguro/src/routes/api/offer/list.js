import {connectToDatabase} from '$lib/db';
import { ObjectId } from 'bson';

const DATABASE_NAME = import.meta.env.VITE_DB_NAME;

export async function get(request){
    const client = await connectToDatabase();
    const result = await client.db(DATABASE_NAME).collection("offers").find({}).toArray();
    return{
        status: 200,
        body: result
    }
}

export async function post(request){
    const data = request.body
    const client = await connectToDatabase();
    const result = await client.db(DATABASE_NAME).collection("offers").findOne({_id: new ObjectId(data.offerId)});
    return{
        status: 200,
        body: result,
    }
}