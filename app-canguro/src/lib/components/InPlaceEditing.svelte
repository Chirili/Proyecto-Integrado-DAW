<script>
    import { createEventDispatcher, onMount } from 'svelte'
  
    export let value;
  
    export let isEditing = false;
    export let type = "text";
    function setInputType(node){
        node.type = type;
        if(type === 'date'){
            console.log(node);
        }
    }
  </script>
  
  {#if isEditing}
    {#if type === 'textarea'}
        <textarea bind:value class="input input-primary input-bordered w-full break-all"></textarea>
    {:else}
        <input input="text" bind:value use:setInputType class="input input-primary input-bordered"/>  
    {/if}
  {/if}
  
