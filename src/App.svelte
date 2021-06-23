<script>
	import Router, {replace} from 'svelte-spa-router'
	import {wrap} from 'svelte-spa-router/wrap'
	import Login from './components/Login.svelte'
	import Alamat from './components/Alamat.svelte'
	import Printable from './components/Printable.svelte'
	import NotFound from './components/NotFound.svelte'
	import {isLogged} from './store'

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
	<Router {routes} />
</div>

<style>
	div {
		width: 100%;
		height: 100vh;
	}
</style>