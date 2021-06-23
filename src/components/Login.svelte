<script>
    import {onMount, onDestroy} from 'svelte'
    import {auth} from '../database/firebase'
    import {isLogged} from '../store'

    let unsubscribe

    onMount(() => {
        unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                $isLogged = true
            } else {
                $isLogged = false
            }
            console.log('-- onAuthChanged --', $isLogged)
        });
    })
    
    onDestroy(() => {
        unsubscribe()
        console.log('-- unsubscribed onAuthChanged --', unsubscribe)
    })

    let email
    let password

    let loginFailedMessage=''

    const handleLogin = () => {
        const unsubscribe = auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            loginFailedMessage = error.message;
        });

        console.log('-- Login triggered --')

        console.log('-- Login unsubscribed --')
        return unsubscribe
    }
</script>

<div class="flex w-full h-full">
    <form on:submit|preventDefault={handleLogin}
        class="flex flex-col gap-y-2 my-auto mx-4 sm:mx-auto w-full sm:w-72"
    >
        <h1 class="mb-8 text-center text-2xl font-bold">ZOC [Admin App]</h1>
        <input class="px-4 h-12 w-full rounded-full bg-gray-800 focus:outline-none" bind:value={email} type="email" placeholder="Email anda">
        <input class="px-4 h-12 w-full rounded-full bg-gray-800 focus:outline-none" bind:value={password} type="password" placeholder="Kata sandi">
        <button class="mt-2 h-12 w-full rounded-full bg-blue-700 hover:bg-blue-500 focus:outline-none">LOGIN</button>
        <p class='mt-8 text-center text-red-400'>{loginFailedMessage}</p>
    </form>
</div>