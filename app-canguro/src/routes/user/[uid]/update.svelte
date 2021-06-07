<script context="module">
	export async function load({ page, fetch, session }) {
		let uid = page.params.uid;
		const response = await fetch('/api/user', {
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
					user: data,
					currentUser: session.user,
					userRouteId: uid
				}
			};
		}
	}
</script>

<script>
	import ProfileViewer from '$lib/components/ProfileViewer.svelte';
	import { days, dayTime } from '$lib/days';
	import {fade} from 'svelte/transition';

	export let user;
	export let userRouteId;

	let times = [];
	let timeSelected;
	let preview = false;
	async function handleUpdateProfile() {
		user.hours = times;
		const response = await fetch('/api/user', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		if (response.ok) {
			window.location = `/user/${userRouteId}/my-profile`;
		}
	}
</script>

<svelte:head>
	<title>Actualización de perfil</title>
</svelte:head>

<article class="m-auto flex flex-col sm:flex-row justify-center flex-wrap">
	<main
		class="card bg-base-100 shadow-2xl p-10 flex flex-col justify-center rounded-box m-5 flex-wrap"
	>
		<button
			type="button"
			class="btn btn-xs btn-primary btn-bordered w-1/2 m-auto"
			on:click={() => (preview = !preview)}
			>{preview ? 'Desactivar Preview' : 'Activar Preview'}</button
		>
		<h2 class="card-title">Formulario de actualización de datos</h2>
		<form on:submit|preventDefault={handleUpdateProfile}>
			<div class="form-control space-x-2">
				<label for="username" class="label label-text">Nombre de usuario</label>
				<input type="text" bind:value={user.name} class="input input-primary input-bordered" />
			</div>
			<div class="form-control flex flex-row">
				<div class="form-control space-x-2">
					<label for="firstname" class="label label-text">Primer Apellido</label>
					<input
						type="text"
						bind:value={user.firstname}
						class="input input-primary input-bordered"
					/>
				</div>
				<div class="form-control space-x-2">
					<label for="lastname" class="label label-text">Segundo Apellido</label>
					<input
						type="text"
						bind:value={user.lastname}
						class="input input-primary input-bordered"
					/>
				</div>
			</div>
			<div class="form-control space-x-2">
				<label for="location" class="label label-text">Dirección: </label>
				<input type="text" bind:value={user.location} class="input input-primary input-bordered" />
			</div>
			<div class="form-control space-x-2">
				<label for="location" class="label label-text">Dirección: </label>
				<input type="date" bind:value={user.birthDay} class="input input-primary input-bordered" />
			</div>
			<div class="form-control space-x-2">
				<label for="description" class="label label-text">Descripción de la oferta</label>
				<textarea class="input input-primary input-bordered h-24" bind:value={user.description} />
			</div>
			{#each dayTime as dayT}
				<div class="form-control">
					<label class="cursor-pointer label">
						<span class="label-text">{dayT.timeName}</span>
						<div>
							<input
								type="checkbox"
								name="opt"
								bind:group={times}
								value={dayT}
								class="radio radio-primary"
							/>
							<span class="radio-mark" />
						</div>
					</label>
				</div>
			{/each}
			{#if times.length > 0}
				<select
					class="select select-bordered select-primary w-full mt-4 mb-4"
					bind:value={timeSelected}
				>
					{#each times as time}
						<option value={time}>{time.timeName}</option>
					{/each}
				</select>
			{/if}
			{#if timeSelected}
				<h2>Día seleccionado: {timeSelected.timeName}</h2>
				{#each times as time}
					{#if time.id === timeSelected.id}
						{#each days as day}
							<div class="form-control">
								<label class="cursor-pointer label">
									<span class="label-text">{day.dayName}</span>
									<div>
										<input
											type="checkbox"
											bind:group={time.days}
											value={day}
											class="checkbox checkbox-primary"
										/>
										<span class="checkbox-mark" />
									</div>
								</label>
							</div>
						{/each}
					{/if}
				{/each}
			{/if}
			<div class="form-control mt-4">
				<button class="btn btn-primary">Enviar</button>
			</div>
		</form>
	</main>
	{#if preview}
		<main
			class="card bg-base-100 shadow-2xl p-10 flex flex-col justify-center rounded-box m-5 flex-grow-0 w-1/2 flex-wrap"
		in:fade out:fade>
			<ProfileViewer bind:user />
		</main>
	{/if}
</article>
