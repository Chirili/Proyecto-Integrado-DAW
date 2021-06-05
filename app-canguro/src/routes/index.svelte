<script context="module">
    export async function load({session}){
        return {
            props: {
                session: session
            }
        }
    }
</script>
<script>
    import {user} from '$lib/auth-store';
    import { get } from 'svelte/store';
    let user2 = get(user);
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<a href="/main">Posts</a>