<script>
	import { onMount } from 'svelte';
	let users = [];
	onMount(() => {});

	async function list() {
		const response = await fetch('/api/user/list', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
			//body: JSON.stringify(offerForm),
		});
		let result = await response.json();
		return result;
	}
	async function deleteUser(user) {
		console.log('delete user ' + user);
        const response = await fetch('/api/user/del', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user),
		});
		let result = await response.json();        
        console.log(result)
        users = users.filter(u => user._id !== u._id)
        //loadLIst();
	}
	async function deleteOffer(user) {
		console.log('delete user ' + user);
	}
	function loadLIst() {
		list().then(
			(res) => {
				users = res;
				console.log(res);
			},
			(err) => {
				console.log(err);
			}
		);
	}
	loadLIst();
</script>

<h1>admin</h1>
<h3>Users</h3>
<table>
	<tr>
		<th>name</th>
		<th>email</th>
		<th>action</th>
	</tr>
	{#each users as user}
		<tr>
			<td>{user.name}</td>
			<td>{user.email}</td>
			<td><button on:click={deleteUser(user)}>tocame please</button></td>
		</tr>
	{/each}
</table>
<h3>offer</h3>
<table>
	<tr>
		<th>name</th>
		<th>email</th>
		<th>action</th>
	</tr>
	{#each users as user}
		<tr>
			<td>{user.name}</td>
			<td>{user.email}</td>
			<td><button on:click={deleteUser(user)}>tocame please</button></td>
		</tr>
	{/each}
</table>
