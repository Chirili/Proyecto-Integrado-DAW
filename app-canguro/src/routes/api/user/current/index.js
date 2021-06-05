import {verify} from 'jsonwebtoken';

export async function post(request){
    const data = request.body;
    console.log("datos", data);
    let jsonWebTokenData = verify(request.body.jwtk,);
    
}