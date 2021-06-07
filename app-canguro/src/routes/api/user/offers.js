
import {connectToDatabase} from '$lib/db';
import { ObjectId } from 'bson';


const DATABASE_NAME = import.meta.env.VITE_DB_NAME;

export async function post(request){
    const data = JSON.parse(request.body);
    const client = await connectToDatabase();
    const result = await client.db(DATABASE_NAME).collection("users").findOne({"_id": new ObjectId(data.uid)});
    const offers = await client.db(DATABASE_NAME).collection("offers").find({"user._id": data.uid}).toArray();
    return {
        status: 200,
        body: {
            user: result,
            offers: offers,
        },
    }
}