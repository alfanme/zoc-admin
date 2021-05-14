<script>
    import {link} from 'svelte-spa-router'
    import {isLogged} from '../store'
</script>

<div>
    <h1>Oops...<br>Page not found!</h1>
    <a href={$isLogged ? '/alamat' : '/login'} use:link>Click this link to go back</a>
</div>

<style>
    div {
        width: 100%;
        height: 100vh;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1 {
        margin-bottom: 50px;
        font-size: 30px;
    }

    a {
        color: blue;
    }

    a:hover {
        text-decoration: underline;
    } 
</style>