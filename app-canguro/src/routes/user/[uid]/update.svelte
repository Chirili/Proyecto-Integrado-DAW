<script context="module">
    export async function load({page,fetch,session}){
        let uid = page.params.uid
        console.log(uid);
        const response = await fetch('/api/user',{
            method: 'POST',
            header:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({uid: uid}),
        });
        if(response.ok){
            const data = await response.json();
            return {
                status: 200,
                props: {
                    user: data,
                    currentUser: session.user,
                }
            }
        }
    }
</script>
<script>
    import ProfileViewer from '$lib/components/ProfileViewer.svelte';
    import { days, dayTime } from '$lib/days';

    export let user;
    let timeSelected;
    let times = [];
    async function handleUpdateProfile(){
        user.hours = timeSelected;
        fetch('/api/user',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
    }
</script>

<svelte:head>
    <title>Actualización de perfil</title>
</svelte:head>

<article class="m-auto flex flex-col sm:flex-row justify-center flex-wrap">
    <main class="card bg-base-100 shadow-2xl p-10 flex flex-col justify-center rounded-box m-5 flex-wrap">
        <h2 class="card-title">Formulario de actualización de datos</h2>
        <form on:submit|preventDefault={handleUpdateProfile} >
            <div class="form-control space-x-2">
                <label for="username" class="label label-text">Nombre de usuario</label>
                <input type="text" bind:value={user.name} class="input input-primary input-bordered">
            </div>
            <div class="form-control flex flex-row">
                <div class="form-control space-x-2">
                    <label for="firstname" class="label label-text">Primer Apellido</label>
                    <input type="text" bind:value={user.firstname} class="input input-primary input-bordered">
                </div>
                <div class="form-control space-x-2">
                    <label for="lastname" class="label label-text">Segundo Apellido</label>
                    <input type="text" bind:value={user.lastname} class="input input-primary input-bordered">
                </div>
            </div>
            <div class="form-control space-x-2">
                <label for="location" class="label label-text">Dirección: </label>
                <input type="text" bind:value={user.location} class="input input-primary input-bordered">
            </div>
            <div class="form-control space-x-2">
                <label for="location" class="label label-text">Dirección: </label>
                <input type="date" bind:value={user.birthDay} class="input input-primary input-bordered">
            </div>
                {#each dayTime as dayT}
                <div class="form-control">
                    <label class="cursor-pointer label">
                      <span class="label-text">{dayT.timeName}</span> 
                      <div>
                        <input type="radio" name="opt" bind:group={times} value={dayT} class="radio radio-primary" on:click={() => timeSelected = dayT}> 
                        <span class="radio-mark"></span>
                      </div>
                    </label>
                  </div> 
                {/each}
               {#if timeSelected}
                {#each days as day}
                <div class="form-control">
                    <label class="cursor-pointer label">
                      <span class="label-text">{day.dayName}</span> 
                      <div>
                        <input type="checkbox" bind:group={timeSelected.days} value={day} class="checkbox checkbox-primary"> 
                        <span class="checkbox-mark"></span>
                      </div>
                    </label>
                  </div>
                {/each}
               {/if}
            <div class="form-control mt-4">
                <button class="btn btn-primary">Enviar</button>
            </div>
        </form>
    </main>
    <main class="card bg-base-100 shadow-2xl p-10 flex flex-col justify-center rounded-box m-5 flex-shrink flex-wrap">
        <ProfileViewer bind:user />
    </main>
</article>