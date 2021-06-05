import {connectToDatabase} from '$lib/db';
import { ObjectID, ObjectId } from 'bson';

const DATABASE_NAME = import.meta.env.VITE_DB_NAME;

export async function post(request){
    const data = JSON.parse(request.body);
    const client = await connectToDatabase();
    const result = await client.db(DATABASE_NAME).collection("users").findOne({"_id": new ObjectID("60b8ea66bd3be922f8039c36")});
    return {
        status: 200,
        body: result,
    }
}