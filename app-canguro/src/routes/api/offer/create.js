import {connectToDatabase} from '$lib/db';

const DATABASE_NAME = import.meta.env.VITE_DB_NAME;


export async function post(request){
    const data = request.body;
    console.log(data);
    const client = await connectToDatabase();
    const result = await client.db(DATABASE_NAME).collection("offers").insertOne(data);
    if(result){
        return {
            status: 200,
            body: result,
        }
    }
}