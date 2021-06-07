<script context="module">
	export async function load({ page, session }) {
		let offerId = page.params.offerId;
		const response = await fetch('/api/offer/list', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ offerId: offerId })
		});
		console.log(response);
		if (response.ok) {
			const data = await response.json();
			return {
				props: {
					offer: data
				}
			};
		}
	}
</script>

<script>
	export let offer;
</script>

<article class="card col-span-1 row-span-3 shadow-lg xl:col-span-2 bg-base-100 m-auto">
	<div class="card-body">
		<h2 class="my-4 text-4xl font-bold card-title">{offer.title}</h2>
		<a
			href={`/user/${offer.user._id}/my-profile`}
			class="text-base-content text-opacity-40"
			sveltekit:prefetch>{offer.user.name}</a
		>
		<p>{offer.description}</p>
		{#if offer.hours}
			{#each offer.hours as hour}
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
        <p>Precio por hora: {offer.hoursPrice}</p>
	</div>
</article>
