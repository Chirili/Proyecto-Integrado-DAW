import {connectToDatabase} from '$lib/db';
import {ObjectID} from 'mongodb';

const DATABASE_NAME = import.meta.env.VITE_DB_NAME;

export async function del(request){
    const offer = request.body;
    const client = await connectToDatabase();
    const result = await client.db(DATABASE_NAME).collection("offers")
                .deleteOne({_id: new ObjectID(offer._id)});    
    if(result){
        return {
            status: 200,
            body: result,
            headers: {
                'Content-Type' : 'application/json',
              },
        }
    }
}