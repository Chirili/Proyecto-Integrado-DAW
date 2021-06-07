<script context="module">
	export async function load({ fetch, session }) {
		if (!session.authenticated) {
			return {
				redirect: '/auth/login',
				status: 302
			};
		}
		return {
			status: 200,
			props: {
				user: session.user
			}
		};
	}
</script>

<script>
import { goto } from '$app/navigation';

	import { days, dayTime } from '$lib/days';
	export let user;
	let offerForm = {
		title: '',
		user: user.user,
		description: '',
		hours: [],
		hoursPrice: ''
	};
	let times = [];
	let timeSelected;
	async function handleOfferSubmit() {
		offerForm.hours = times;
		const response = await fetch('/api/offer/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(offerForm)
		});
		if (response.ok) {
			goto("/offer/list");
		}
	}
</script>

<article
	class="card bg-base-100 m-auto w-1/2 shadow-2xl p-10 flex flex-col justify-center rounded-box"
>
	<header>
		<h1 class="card-title">Crear oferta</h1>
	</header>
	<main>
		<form on:submit|preventDefault={handleOfferSubmit}>
			<div class="form-control">
				<label class="label label-text" for="title">Título</label>
				<input
					type="text"
					bind:value={offerForm.title}
					minLength="6"
					maxlength="50"
					placeholder="Título de la oferta"
					class="input input-primary input-bordered"
					required
				/>
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
			<select class="select select-bordered select-primary w-full mt-4 mb-4" bind:value={timeSelected}>
				{#each times as time}
					<option value={time}>{time.timeName}</option>
				{/each}
			</select>
		{/if}
		{#if timeSelected}
			<h2>Día seleccionado: {timeSelected.timeName}</h2>
			<div class="flex flex-row flex-wrap">
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
		</div>
		{/if}
			<div class="form-control">
				<label class="label label-text" for="">Descripción de la oferta</label>
				<textarea
					bind:value={offerForm.description}
					placeholder="Descripción de la oferta"
					class="input input-primary h-24 input-bordered"
					required
					minlength="50"
					maxlength="250"
				/>
			</div>
			<div class="form-control">
				<label class="label label-text" for="payment">Precio por hora: </label>
				<input
					type="number"
					bind:value={offerForm.hoursPrice}
					class="input input-primary input-bordered"
					min="0"
					placeholder="Precio por hora"
					max="999"
					required
				/>
			</div>
			<div class="form-control mt-4">
				<button type="submit" class="btn btn-primary">Crear Oferta</button>
			</div>
		</form>
	</main>
</article>

<style>
</style>
