<script>
	import {onMount, onDestroy} from 'svelte'
	import Router, {replace} from 'svelte-spa-router'
	import {wrap} from 'svelte-spa-router/wrap'
	import {auth} from './database/firebase'
	import Login from './components/Login.svelte'
	import Alamat from './components/Alamat.svelte'
	import Printable from './components/Printable.svelte'
	import NotFound from './components/NotFound.svelte'
	import LoadingPage from './components/LoadingPage.svelte'
	import {isLogged} from './store'

	let unsubscribe
	let isLoading = true

    onMount(() => {
        unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                $isLogged = true
            } else {
                $isLogged = false
            }
            console.log('-- onAuthChanged --', $isLogged)
			isLoading = false
        });
    })
    
    onDestroy(() => {
        unsubscribe()
        console.log('-- unsubscribed onAuthChanged --', unsubscribe)
    })

	$: if ($isLogged) {
		replace('/alamat')
	} else {
		replace('/login')
	}

	const routes = {
		'/login': wrap({
			component: Login,
			conditions: [
				(detail) => (!$isLogged)
			]
		}),
		'/alamat': wrap({
			component: Alamat,
			conditions: [
				(detail) => ($isLogged)
			]
		}),
		'/print': wrap({
			component: Printable,
			conditions: [
				(detail) => ($isLogged)
			]
		}),
		'*': NotFound
	}

</script>


<div>
	{#if isLoading}
		<LoadingPage />
	{:else}
		<Router {routes} />
	{/if}
</div>

<style>
	div {
		width: 100%;
		height: 100vh;
	}
</style>