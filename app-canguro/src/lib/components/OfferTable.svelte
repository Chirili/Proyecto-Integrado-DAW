<script>
	export let data;
    import {fly,fade} from 'svelte/transition';
	import UserTable from '$lib/components/UserTable.svelte';
	async function handleDelete(i, offer) {
		if (confirm(`¿Estás seguro de que quieres eliminar la oferta del usuario: ${offer.user.name}?`)) {
			const response = await fetch('/api/offer', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(offer)
			});
			let result = await response.json();
			data = data.filter((u) => offer._id !== u._id);
		}
	}
	let user;
</script>

<div class="overflow-x-hidden">
	<table class="table w-full">
		<thead>
			<tr>
				<th />
				<th>Titulo</th>
				<th>Descripción</th>
				<th>Usuario</th>
				<th>Precio de las horas</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			{#each data as dat, i}
				<tr>
					<td>{i}</td>
					<td>{dat.title}</td>
					<td>{dat.description ? dat.description : 'No establecido'}</td>
					<td><button class="btn btn-info" on:click={() => (user = dat.user)}>Usuario</button></td>
					<td>{dat.hoursPrice ? dat.hoursPrice : 'No establecido'}</td>
					<td
						><button
							class="btn btn-warning"
							disabled={dat.role === 'admin'}
							on:click={handleDelete(i, dat)}>Eliminar oferta</button
						></td
					>
				</tr>
			{:else}
				<h1>Ya no hay mas ofertas</h1>
			{/each}
		</tbody>
	</table>
</div>
{#if user}
	<article
		class="card col-span-1 row-span-3 shadow-lg p-4  bg-base-100 m-auto justify-center flex flex-col"
	>
        <div class="flex flex-row justify-between">
            <h2 class="card-title">Datos del usuario: {user.name}</h2>
            <a href={`/user/${user._id}/my-profile`} class="btn btn-primary">Ver perfil</a>
        </div>
        <table class="table w-full">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                    <th>Fecha de nacimiento</th>
                    <th>Rol</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.firstName ? user.firstName : 'No establecido'}</td>
                        <td>{user.lastName ? user.lastName : 'No establecido'}</td>
                        <td>{user.birthDay}</td>
                        <td>{user.role}</td>
                    </tr>
            </tbody>
        </table>
    </article>

{/if}
