<script>
    import { user } from "$lib/auth-store";
    import { createEventDispatcher } from "svelte";

    export let isLoginForm = true;
    const URL = import.meta.env.VITE_API_URL;
    let userForm = {
        email: "",
        password: "",
        name: "",
    }
    const dispatch = createEventDispatcher();
    async function handleLogin(){
        const response = await fetch("/auth/login/sign-in",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(userForm),
        });
        if(response.ok){
            const data = await response.json();
            $user = data;
            dispatch("successLogin")
        }
    }

    async function handleRegister(){
        const response = await fetch("/auth/register/sign-up",{
            method: 'POST',
            body: JSON.stringify(userForm),
        });
        if(response.ok){
            dispatch("successRegister");
        }
    }
    
</script>

<h1>Formulario de {isLoginForm ? "Inicio de sesión" : "Registro"}</h1>

<form on:submit|preventDefault={isLoginForm ? handleLogin : handleRegister}>
    <label for="email">Correo electrónico: </label>
    <input type="text" name="email" bind:value={userForm.email}>
    <label for="password">Contraseña: </label>
    <input type="password" name="password" bind:value={userForm.password}>
    {#if !isLoginForm}
    <label for="name">Nombre de usuario: </label>
    <input type="text" name="name" bind:value={userForm.name}>
    {/if}
    <button type="submit">Enviar</button>
</form>
{#if isLoginForm}
    <a href="/auth/register">Registro</a>
{:else}
     <a href="/auth/login">Inicio de sesión</a>
{/if}