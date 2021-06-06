<script context="module">
    export async function load({fetch}){
        const response = await fetch("/api/offer/list");
        if(response.ok){
            const data = await response.json();
            return {
                props: {
                    offers: data
                }
            }
        }
    }
</script>
<script>
    import Offer from '$lib/components/Offer.svelte';
    export let offers;
</script>
<article class="self-center h-full w-full px-4 m-5">
    <header class="flex flex-row justify-between">
        {#if offers.length > 0}
            <div class="stats shadow">
                <div class="stat">
                  <div class="stat-title">Ofertas encontradas</div> 
                  <div class="stat-value">{offers.length}</div> 
                </div>
              </div>
        {/if}
    </header>
    <main>
        {#each offers as offer}
            <div class="offer-container m-4">
                <Offer {...offer}/>
            </div>
        {:else}
            <h1 class="text-4xl">En este momento no hay ofertas disponibles...</h1>
        {/each}
    </main>
</article>
