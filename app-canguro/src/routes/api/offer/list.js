import {connectToDatabase} from '$lib/db';

const DATABASE_NAME = import.meta.env.VITE_DB_NAME;

export async function get(request){
    const client = await connectToDatabase();
    const result = await client.db(DATABASE_NAME).collection("offers").find({}).toArray();
    return{
        status: 200,
        body: result
    }
}