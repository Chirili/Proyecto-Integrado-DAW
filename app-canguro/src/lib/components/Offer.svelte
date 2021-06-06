<script>
    export let _id;
    export let title;
    export let user;
    export let description;
    export let hours;
    export let hoursPrice;
</script>

<article class="card shadow w-1/2 m-auto" class:bg-primary={user.role === 'prog'} class:bg-accent={user.role === 'cang'} class:bg-warning={user.role === 'admin'}>
    <main class="card-body flex flex-row justify-between flex-wrap">
        <div>
            <h2 class="card-title">{title}</h2>
            <a href={`/user/${user._id}/my-profile`} class="text-base-content" sveltekit:prefetch>{user.name}</a>
            <p>{description}</p>
        </div>
        <div class="">
            <a href={`/offer/${_id}/details`} class="btn btn-neutral">Ver detalles de la oferta</a>
        </div>
    </main>
</article>