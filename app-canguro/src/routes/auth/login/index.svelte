<script context="module">
    export async function load({session}){
        if(session.authenticated){
            return{
                status: 302,
                redirect: '/'
            }
        }
        return{}
    }
</script>
<script>
    import AuthForm from '$lib/components/AuthForm.svelte';

    async function handleLoginSuccess(){
        window.location = "/";
    }
</script>
<AuthForm on:successLogin="{handleLoginSuccess}"></AuthForm>