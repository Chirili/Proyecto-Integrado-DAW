<script context="module">
	export async function load({ session }) {
		return {
			props: {
				session: session
			}
		};
	}
</script>

<svelte:head>
	<title>CyB Inicio</title>
</svelte:head>
<article class="m-auto self-center">
	<main class="hero h-full">
		<div class="text-center hero-content">
			<div class="max-w-md">
				<h1 class="mb-5 text-5xl font-bold">Bienvenido a CyB</h1>
				<p class="mb-5">
					Aquí encontrarás <span>trabajo como canguro</span> o
					<span>encuentra un canguro para tus hijos</span>.
				</p>
				<a href="/auth/login" class="btn btn-primary">
					Prueba iniciando sesión
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 ml-2 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</a>
			</div>
		</div>
	</main>
</article>

