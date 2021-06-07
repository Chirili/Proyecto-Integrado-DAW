<script>
	import { user } from '$lib/auth-store';
	import { createEventDispatcher } from 'svelte';

	export let isLoginForm = true;
	let userForm = {
		email: '',
		password: '',
		name: '',
		birthDay: new Date(new Date().setFullYear(new Date().getFullYear() -20)).toISOString().split('T')[0],
		role: ''
	};

	const dispatch = createEventDispatcher();

	async function handleLogin() {
		const response = await fetch('/auth/login/sign-in', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(userForm)
		});
		if (response.ok) {
			const data = await response.json();
			$user = data;
			dispatch('successLogin');
		}
	}

	async function handleRegister() {
		const response = await fetch('/auth/register/sign-up', {
			method: 'POST',
			body: JSON.stringify(userForm)
		});
		if (response.ok) {
			dispatch('successRegister');
		}
	}
</script>

<article
	class="card bg-base-100 shadow-2xl p-10 flex flex-col justify-center rounded-box"
	class:min-w-max={!isLoginForm}
>
	<header class="text-center">
		<slot name="formTitle" />
	</header>
	<main class="card-body">
		<form class="w-full" on:submit|preventDefault={isLoginForm ? handleLogin : handleRegister}>
			{#if !isLoginForm}
				<div class="form-control">
					<label for="name" class="label label-text">Nombre: </label>
					<input
						type="text"
						name="name"
						placeholder="Introduce el nombre"
						bind:value={userForm.name}
						class="input input-primary input-bordered"
                        minlength="6"
                        maxlength="50"
						required
					/>
				</div>
			{/if}
			<div class="form-control">
				<label for="email" class="label label-text">Correo electrónico: </label>
				<input
					type="email"
					name="email"
					placeholder="Introduce tú correo electrónico"
					bind:value={userForm.email}
					class="input input-primary input-bordered"
                    required
				/>
			</div>
			<div class="form-control">
				<label for="password" class="label label-text">Contraseña: </label>
				<input
					type="password"
					name="password"
					placeholder="Introduce la contraseña"
					bind:value={userForm.password}
                    minlength="6"
                    maxlength="20"
					class="input input-primary input-bordered"
					required
				/>
			</div>
			{#if !isLoginForm}
				<div class="form-control">
					<label for="role" class="label label-text">Introduce tú edad: </label>
					<input
						type="date"
						class="input input-primary input-bordered"
						bind:value={userForm.birthDay}
                        max={new Date(new Date().setFullYear(new Date().getFullYear() -18)).toISOString().split('T')[0]}
                        required
					/>
				</div>
				<div class="form-control">
					<label for="role" class="label label-text">Selecciona tú rol: </label>
					<div class="btn-group flex flex-row w-full">
						<button
							type="button"
							class="btn mr-0 btn-lg w-36 m-auto"
							class:btn-active={userForm.role === 'prog'}
							on:click={() => (userForm.role = 'prog')}>Progenitor</button
						>
						<div class="divider divider-vertical m-auto">O</div>
						<button
							type="button"
							class="btn btn-lg w-36 m-auto"
							class:btn-active={userForm.role === 'cang'}
							on:click={() => (userForm.role = 'cang')}>Canguro</button
						>
					</div>
				</div>
			{/if}
			<div class="form-control mt-4">
				<button type="submit" name="btnLogin" class="btn btn-primary"
					>{isLoginForm ? 'Iniciar Sesión' : 'Registrarse'}</button
				>
				<label class="label" for="btnLogin">
					<span class="label-text-alt"
						>{isLoginForm ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}</span
					>
					<a
						href={isLoginForm ? '/auth/register' : '/auth/login'}
						class="label-text-alt link link-base-content"
						>{isLoginForm ? 'Registrate' : 'Inicia sesión'}</a
					>
				</label>
			</div>
		</form>
	</main>
</article>
