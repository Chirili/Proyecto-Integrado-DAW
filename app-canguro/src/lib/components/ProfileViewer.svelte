<script>
    export let user;
</script>
<article class="flex flex-row justify-start flex-wrap">
	<article class="card bg-base-300 shadow-lg mt-4 mr-5 compact side w-full">
		<div class="flex-col items-center text-left space-x-4 card-body p-4">
			<div class="flex flex-col sm:flex-row w-full">
				<h2 class="card-title text-4xl w-full">
					Bienvenido a tú perfil 
					{user.name}
				</h2>
			</div>
			<div class="more-info flex flex-row w-full flex-wrap">
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
	<article class="card bg-base-300 shadow-lg m-4 compact side self-start w-full">
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
</article>