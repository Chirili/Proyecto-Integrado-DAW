<script context="module">
    export async function load({page,fetch,session}){
        let uid = page.params.uid
        const response = await fetch('/api/user',{
            method: 'POST',
            header:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({uid: uid}),
        });
        if(response.ok){
            const data = await response.json();
            console.log(data);
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


    export let user;
    export let currentUser;
    console.log(user._id === currentUser.user._id);
    console.log(user._id === currentUser.user._id);
</script>
<article class="flex flex-col sm:flex-row justify-start w-full">
    <article class="card bg-base-300 shadow-lg mt-4 mr-5 compact side self-start flex-shrink">
        <div class="flex-col items-center text-left space-x-4 card-body p-4">
            <div class="flex flex-col sm:flex-row w-full">
                <h2 class="card-title text-4xl w-full">{user._id === currentUser.user._id ? 'Bienvenido a tú perfil ' : 'Bienvenido al perfil de '} {user.name}</h2>
                {#if user._id === currentUser.user._id}
                    <a class="btn btn-primary" href="update">Editar</a> 
                {/if}
            </div>
            <div class="more-info flex flex-row w-full">
                {#if user.birthDay}
                <p class="text-base-content text-opacity-40">{new Date().getYear() - new Date(user.birthDay).getYear()}</p>
                {/if}
                <div class="divider divider-vertical"></div> 
                <p class="text-base-content text-opacity-40">Localizacion</p>
            </div>
            {#if user.description}
                <p class="break-all text-left ml-0 w-full">{user.description}</p>
            {:else}
                <p class="w-full text-left">Actualmente no se cuenta con una descripción</p>
            {/if}
            
        </div>
    </article>
    <article class="card bg-base-300 shadow-lg mt-4 compact side self-start flex-grow">
        <div class="flex-col items-center text-left space-x-4 card-body p-4">
            <h2 class="card-title text-4xl w-full">Disponibilidad Horaria</h2>
            {#if user.hours}
                asdfasdfasdf
            {:else}
                <p>Actualmente no se tiene una disponibilidad horaria</p>
            {/if}
        </div>
    </article>
</article>
