<script>
    export let _id;
    export let title;
    export let user;
    export let description;
    export let hours;
    export let hoursPrice;
</script>

<article class="card shadow m-auto" class:bg-primary={user.role === 'prog'} class:bg-accent={user.role === 'cang'} class:bg-warning={user.role === 'admin'}>
    <main class="card-body flex flex-row justify-between flex-wrap">
        <div class="w-1/2">
            <h2 class="card-title">{title}</h2>
            <a href={`/user/${user._id}/my-profile`} class="text-base-content" sveltekit:prefetch>{user.name}</a>
            <p>{description}</p>
        </div>
        <div>
            <a href={`/offer/${_id}/details`} class="btn btn-neutral">Ver detalles de la oferta</a>
        </div>
    </main>
</article>