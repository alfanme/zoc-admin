<script>
    import {auth} from '../database/firebase'
    import {isLogged} from '../store'

    const handleLogout = () => {
        auth.signOut()
        $isLogged = false
    }
</script>

<div>
    <nav>
        <h1>ZOC [Admin App]</h1>
        <button on:click={handleLogout}>Log out</button>
    </nav>
</div>

<style>
    div {
        height: 80px;
        padding: 0 25px;
        background: #eee;
        border: 1px solid #eee;
    }

    nav {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    button {
        width: 100px;
        height: 40px;
        margin: 0;
        border: none;
        border-radius: 0;
        outline: none;
        color: #fff;
        background: red;
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
        background: #fff;
        color: red;
    }
</style>