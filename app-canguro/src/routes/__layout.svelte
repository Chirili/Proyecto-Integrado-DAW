<script context="module">
	export async function load({ session, page }) {
		return {
			props: {
				currentPage: page.path.split('/').pop(),
				isAuthenticated: session.authenticated,
				user: session.user
			}
		};
	}
</script>

<script>
	export let isAuthenticated;
	export let user;
	export let currentPage;
</script>
<article class="flex flex-col bg-base-200 absolute h-full w-full text-base-content" data-theme="dark">
	<header class="z-20">
		<nav class="navbar bg-neutral shadow-2xl text-neutral-content overscroll-none">
			<div class="flex-none flex-grow px-2 mx-2">
				<a href="/" class="btn btn-ghost">
					<span class="text-lg font-bold"> CyB </span>
				</a>
			</div>
			<div class="flex-none">
				<a href="/offer/list" class="btn btn-ghost" class:bg-neutral-focus={currentPage === 'main'}
					>Buscar ofertas</a
				>
			</div>
			{#if !isAuthenticated}
				<div class="flex-none">
					<a
						href="/auth/login"
						class="btn btn-ghost"
						class:bg-neutral-focus={currentPage === 'login'}
						>Iniciar Sesión</a
					>
				</div>
			{/if}
			{#if !isAuthenticated}
				<div class="flex-none">
					<a
						href="/auth/register"
						class="btn btn-ghost"
						class:bg-neutral-focus={currentPage === 'register'}>Registrarse</a
					>
				</div>
			{/if}
			{#if isAuthenticated}
			<div class="flex-none">
				<a href="/offer/create" class="btn btn-primary" class:bg-neutral-focus={currentPage === 'main'}
					>Crear oferta</a
				>
			</div>
			<div class="dropdown dropdown-end flex-none relative">
				<div tabindex="0" class="m-1 btn">{user.user.name}</div> 
				<ul class="shadow menu dropdown-content bg-base-100 rounded-box w-52 absolute top-full">
				  <li>
					<a href={`/user/${user.user._id}/my-profile`}>Mi perfil</a>
				  </li> 
				  
				  {#if user.user.role === 'admin'}
				  	<li class="w-full">
						<a href="/admin">Administración</a>
				  	</li>
				  {/if}
				</ul>
			  </div>
			{/if}
			{#if isAuthenticated}
			  <div class="flex-none">
				<a href="/auth/logout" class="btn btn-ghost">Cerrar sesión</a>
			  </div>
			{/if}
		</nav>
	</header>
	<main class="w-full relative h-full overflow-auto flex p-2">
		<slot />
	</main>
</article>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
