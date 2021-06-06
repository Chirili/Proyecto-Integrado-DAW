<script context="module">
	export async function load({ fetch, session }) {
		const response = await fetch('/api/user/list');
		if (response.ok) {
			const data = await response.json();
			return {
				status: 200,
				props: {
					data: data,
					currentUser: session.user
				}
			};
		}
	}
</script>

<script>
	import UserTable from '$lib/components/UserTable.svelte';
	import OfferTable from '$lib/components/OfferTable.svelte';

	export let data;
	export let currentUser;
	async function getUsers() {
		listUsers = true;
		const response = await fetch('/api/user/list');
		if (response.ok) {
			data = await response.json();
		}
	}
	async function getOffers() {
		listUsers = false;
		const response = await fetch('/api/offer/list');
		if (response.ok) {
			data = await response.json();
		}
	}
	let listUsers = true;
</script>

<svelte:head>
	<title>Panel de administración</title>
</svelte:head>

<article
	class="card col-span-1 row-span-3 shadow-lg p-4  bg-base-100 m-auto justify-center flex flex-col"
>
	<div class="card w-full">
		<div class="btn-group m-auto">
			<button class="btn btn-lg" class:btn-active={listUsers} on:click={getUsers}>Usuarios</button>
			<button class="btn btn-lg" class:btn-active={!listUsers} on:click={getOffers}>Ofertas</button>
		</div>
	</div>
	<div class="overflow-x-auto mt-4">
		{#if listUsers}
			<UserTable bind:data />
		{:else}
			<OfferTable bind:data />
		{/if}
	</div>
</article>
