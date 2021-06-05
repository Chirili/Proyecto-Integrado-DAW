<script context="module">
    export async function load({page,fetch}){
        let uid = page.params.uid
        const response = await fetch('/api/user',{
            method: 'POST',
            header:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({uid: uid}),
        });
        if(response.ok){
            const data = await response.json();
            return {
                status: 200,
                props: {
                    user: data,
                }
            }
        }
    }
</script>
<script>
    export let user;
</script>
<h1>Bienvenido a tu perfil {user.name}</h1>