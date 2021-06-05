<script context="module">
	export async function load({ session }) {
		return{
			props: {
				isAuthenticated: session.authenticated,
				user: session.user,
			}
		}
	}
</script>

<script>
	export let isAuthenticated;
	export let user;

</script>

<nav>
	<a href="/auth/register">Registro</a>
	<a href="/auth/login">Inicio de sesión</a>
	{#if isAuthenticated}
		<a href={`/user/${user.user._id}/profile`}>Mi perfil</a>
		<a href="/offer/create">Crear oferta</a>
	{/if}
</nav>
<main>
	<slot />
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
  	@tailwind utilities;
</style>