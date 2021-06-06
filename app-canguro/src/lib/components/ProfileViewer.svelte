<script>
    export let user;
</script>
<article class="flex flex-row md:flex-col lg:flex-col justify-start w-full">
    <article class="card bg-base-300 shadow-lg mt-4 mr-5 compact side self-start flex-grow w-full">
        <div class="flex-col items-center text-left space-x-4 card-body p-4">
            <div class="flex flex-col w-full">
                <h2 class="card-title text-4xl w-full"> Bienvenido a tú perfil {user.name}</h2>
                <div class="flex flex-row">
                    <p class="mx-1">{user?.firstname} </p>
                    <p class="mx-1">{user?.lastname}</p>
                </div>
            </div>
            <div class="more-info flex flex-row w-full">
                <p class="text-base-content text-opacity-40">{new Date().getYear() - new Date(user.birthDay).getYear()}</p>
                <div class="divider divider-vertical"></div> 
                <p class="text-base-content text-opacity-40">{user.location ? user.location : 'Esperando a la localización'}</p>
            </div>
                <p class="break-all text-left ml-0 w-full">{user.description}</p>
        </div>
    </article>
    <article class="card bg-base-300 shadow-lg mt-4 compact side self-start flex-shrink">
        <div class="flex-col items-center text-left space-x-4 card-body p-4">
            <h2 class="card-title text-4xl w-full">Disponibilidad Horaria</h2>
                asdfasdfasdf
                <p>Actualmente no se tiene una disponibilidad horaria</p>
        </div>
    </article>
</article>