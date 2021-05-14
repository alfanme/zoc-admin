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

<div>
    <form on:submit|preventDefault={handleLogin}>
        <h1>ZOC [Admin App]</h1>
        <input bind:value={email} type="email" placeholder="Email anda">
        <input bind:value={password} type="password" placeholder="Kata sandi">
        <button>LOGIN</button>
        <p class='failed'>{loginFailedMessage}</p>
    </form>
</div>

<style>
    div {
        width: 100%;
        height: 100%;
        display: flex;
    }

    h1 {
        text-align: center;
        margin-bottom: 50px;
        font-size: 25px;
    }

    p {
        text-align: center;
        margin-top: 20px;
        color: red;
    }

    form {
        width: 300px;
        margin: auto;
        display: flex;
        flex-direction: column;
    }

    @media screen and (max-width: 680px) {
        form {
            width: calc(100% - 100px);
        }
    }

    input {
        height: 50px;
        width: 100%;
        border: 1px solid #ccc;
        outline: none;
        border-radius: 10px;
        padding: 0 15px;
        line-height: 1.5;
    }

    @media screen and (max-width: 680px) {
        input {
            padding: 0 10px;
            font-size: 14px;
            margin-bottom: 10px;
            border-radius: 7.5px;
        }
    }

    input:hover {
        border: 1px solid #eee;
    }

    input:focus {
        box-shadow: 0 0 0 3px #4088FF;
    }

    button {
        width: 100%;
        height: 50px;
        margin: 0;
        margin-top: 5px;
        border: none;
        border-radius: 0;
        outline: none;
        color: #fff;
        background: #4088FF;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 10px;
    }

    @media screen and (max-width: 680px) {
        button {
            font-size: 16px;
            border-radius: 7.5px;
        }
    }

    button:hover, button:active {
        background: #eee;
        color: #4088FF;
    }
</style>