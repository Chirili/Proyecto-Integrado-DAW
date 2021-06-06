import {connectToDatabase} from '$lib/db';
import { ObjectID } from 'mongodb';
const DATABASE_NAME = import.meta.env.VITE_DB_NAME;


export async function del(request){
    const user = request.body;
    console.log(user);
    const client = await connectToDatabase();
    const result = await client.db(DATABASE_NAME).collection("users")
                .deleteOne({_id: new ObjectID(user._id)});    
    console.log(result)
    if(result){
        return {
            status: 200,
            body: result,
            headers: {
                'Content-Type' : 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        }
    }
}