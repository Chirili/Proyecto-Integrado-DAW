import {writable} from 'svelte/store';

function createIsAuthenticatedStore(){
    const {update, set,subscribe} = writable(false);
    return{
        subscribe,
        toggleAuthentication: () => {n => n = !n},
        update,
        set
    }
}
export const isAuthenticated = createIsAuthenticatedStore()
export const user = writable(null)