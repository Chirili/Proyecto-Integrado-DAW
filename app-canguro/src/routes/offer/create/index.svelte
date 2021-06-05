<script context="module">
	export async function load({fetch,session}){
		if(!session.authenticated){
			return{
				redirect: '/auth/login',
				status: 302,
			}
		}
		return{
			status: 200,
			props: {
				user: session.user
			}
		}
	}
</script>
<script>
	import { days, dayTime } from './_days';
	export let user;
	let offerForm = {
		title: '',
		userId: user.user._id,
		description: '',
		hours: [],
		hoursPrice: '',
	};
	async function handleOfferSubmit() {
		const response = await fetch("/api/offer/create",{
			method: 'POST',
			headers:{
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(offerForm),
		});
		if(response.ok){
			const data = await response.json();
		}
	}
</script>

<h1>Crear ofertas</h1>
<form on:submit|preventDefault={handleOfferSubmit}>
	<label for="title">Titulo</label>
	<input type="text" bind:value={offerForm.title} />
	<p>Añade días</p>
	{#each days as day}
		<div>
			<label for={day.id}>{day.dayName}</label>
			<input type="checkbox" id={day.id} value={day} bind:group={offerForm.hours} />
		</div>
	{/each}
	<h2>Días Seleccionados:</h2>
	{#each offerForm.hours as day}
		<p>{day.dayName}</p>
		{#each dayTime as time}
			<label for={time.id}>{time.timeName}</label>
			<input type="checkbox" id={time.id} value={time} bind:group={day.dayOrganization} /><br />
		{/each}
	{:else}
		<p>Todavía no se ha seleccionado ningún día</p>
	{/each}
	<label for="">Descripción de la oferta</label>
	<textarea name="" id="" cols="30" rows="10" bind:value={offerForm.description}></textarea><br>
		<label for="payment">Precio por hora: </label>
		<input type="number" bind:value={offerForm.hoursPrice}><br>
	<button type="submit">Crear Oferta</button>
</form>
<style>
</style>
