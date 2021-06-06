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
<svelte:head>
    <title>CyB Login</title>
</svelte:head>
<main class="m-auto">
        <AuthForm on:successLogin="{handleLoginSuccess}">
            <svelte:fragment slot="formTitle">
                <h1 class="card-title text-4xl text-base-content">Formulario de inicio de sesión</h1>
            </svelte:fragment>
        </AuthForm>
</main>
