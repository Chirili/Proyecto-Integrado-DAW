<script>
	export let data;
    
	import { fly, fade } from 'svelte/transition';
	async function handleDelete(i, user) {

		if (confirm(`¿Estás seguro de que quiere eliminar al usuario con nombre: ${user.name}?`)) {
			const response = await fetch('/api/user/del', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			let result = await response.json();
		    data = data.filter((u) => user._id !== u._id);
		}
	}
</script>


<div class="overflow-x-hidden">
	<table class="table w-full">
		<thead>
			<tr>
				<th />
				<th>Nombre</th>
				<th>Primer Apellido</th>
				<th>Segundo Apellido</th>
				<th>Fecha de nacimiento</th>
				<th>Rol</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			{#each data as dat, i}
				<tr>
					<td>{i}</td>
					<td>{dat.name}</td>
					<td>{dat.firstName ? dat.firstName : 'No establecido'}</td>
					<td>{dat.lastName ? dat.lastName : 'No establecido'}</td>
					<td>{dat.birthDay}</td>
					<td>{dat.role}</td>
					<td
						><button
							class="btn btn-warning"
							disabled={dat.role === 'admin'}
							on:click={handleDelete(i, dat)}>Eliminar usuario</button
						></td
					>
				</tr>
            {:else}
                <h1>Ya no hay mas usuarios</h1>
			{/each}
		</tbody>
	</table>
</div>
