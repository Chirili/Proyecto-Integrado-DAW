<script context="module">
    export async function load({page,session}){
        return{
            props:{
                user: session,
            }
        }
    }
</script>

<script>
    import AuthForm from '$lib/components/AuthForm.svelte';

    export let user;

</script>
User {JSON.stringify(user)}
<AuthForm isLoginForm={false}></AuthForm>

