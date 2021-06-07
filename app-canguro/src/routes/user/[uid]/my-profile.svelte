<script context="module">
	export async function load({ page, fetch, session }) {
		let uid = page.params.uid;
		const response = await fetch('/api/user/offers', {
			method: 'POST',
			header: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ uid: uid })
		});
		if (response.ok) {
			const data = await response.json();
			return {
				status: 200,
				props: {
					user: data.user,
					offers: data.offers,
					currentUser: session.user
				}
			};
		}
	}
</script>

<script>
	import Offer from '$lib/components/Offer.svelte';
	import { onMount } from 'svelte';

	export let user;
	export let currentUser;
	export let offers;
</script>

<article class="flex flex-row justify-start flex-wrap">
	<article class="card bg-base-300 shadow-lg mt-4 mr-5 compact side self-start w-full md:w-5/12">
		<div class="flex-col items-center text-left space-x-4 card-body p-4">
			<div class="flex flex-col sm:flex-row w-full">
				<h2 class="card-title text-4xl w-full">
					{currentUser && currentUser?.user?._id === user._id
						? 'Bienvenido a tú perfil '
						: 'Bienvenido al perfil de '}
					{user.name}
				</h2>
				{#if currentUser && currentUser.user._id === user._id}
					<a class="btn btn-primary ml-4" href="update" sveltekit:prefetch>Editar Perfil</a>
				{/if}
			</div>
			<div class="more-info flex flex-row w-full">
				<p class="text-base-content text-opacity-40 mx-1">{user?.firstname}</p>
				<div class="divider divider-vertical" />

				<p class="text-base-content text-opacity-40 mx-1">{user?.lastname}</p>
				<div class="divider divider-vertical" />

				<p class="text-base-content text-opacity-40">
					Edad {new Date().getYear() - new Date(user.birthDay).getYear()}
				</p>
				<div class="divider divider-vertical" />
				{#if user.location}
					<p class="text-base-content text-opacity-40">Dirección {user.location}</p>
				{:else}
					<p class="text-base-content text-opacity-40">El usuario no ha introducido su dirección</p>
				{/if}
			</div>
			{#if user.description}
				<p class="break-all text-left ml-0 w-full">{user.description}</p>
			{:else}
				<p class="w-full text-left">Actualmente no se cuenta con una descripción</p>
			{/if}
		</div>
	</article>
	<article class="card bg-base-300 shadow-lg m-4 compact side self-start w-full md:w-auto">
		<div class="flex-col text-left space-x-4 card-body p-4">
			<h2 class="card-title text-4xl w-full">Disponibilidad Horaria</h2>
			{#if user.hours}
				{#each user.hours as hour}
					<h2 class="card-title text-2xl">{hour.timeName}</h2>

					<div class="flex flex-row flex-wrap">
						{#each hour.days as day}
							<div class="badge badge-primary m-1">{day.dayName}</div>
						{:else}
							<div class="badge badge-primary m-1">¿Disponible todo el día?</div>
						{/each}
					</div>
				{/each}
			{:else}
				<p>No hay definido ningún horario</p>
			{/if}
		</div>
	</article>
	<article class="card bg-base-300 shadow-lg m-4 compact side self-start w-full md:w-auto">
		<div class="flex-col text-left space-x-4 card-body p-4">
			<h2 class="card-title text-4xl">Mis ofertas</h2>
			{#if offers}
				<div class="m-auto">
					{#each offers as offer}
						<div class="m-4">
							<Offer {...offer} />
						</div>
					{:else}
						<h2>No se ha encontrado ninguna de tus ofertas...</h2>
					{/each}
				</div>
			{/if}
		</div>
	</article>
</article>
