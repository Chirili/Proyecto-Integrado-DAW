export async function get(request){
    return {
        headers: {
            Location: '/',
            'Set-Cookie': 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=localhost'
        },
        status: 302,
        redirect: "/"
    }
}