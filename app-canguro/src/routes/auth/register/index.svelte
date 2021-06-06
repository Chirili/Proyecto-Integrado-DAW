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
import { goto } from '$app/navigation';

    import AuthForm from '$lib/components/AuthForm.svelte';

    export let user;
    function handleSuccessRegister(){
        goto("/");
    }
</script>

<svelte:head>
    <title>CyB Register</title>
</svelte:head>
<main class="m-auto">
    <AuthForm isLoginForm={false} on:successRegister={handleSuccessRegister}>
        <svelte:fragment slot="formTitle">
            <h1 class="card-title text-4xl text-base-content">Formulario de Registro</h1>
        </svelte:fragment>
    </AuthForm>
</main>

