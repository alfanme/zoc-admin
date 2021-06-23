<script>
    import {auth} from '../database/firebase'
    import {isLogged} from '../store'

    const handleLogout = () => {
        auth.signOut()
        $isLogged = false
    }
</script>

<div class="sticky top-0 z-50 px-6 h-16 bg-gray-800 border-t-4 border-t-blue-700">
    <nav class="flex justify-between items-center h-full">
        <h1 class="text-2xl font-medium">ZOC Admin <span class="text-xs">v.2</span></h1>
        <button on:click={handleLogout}
            class="px-6 h-10 bg-gray-900 hover:bg-red-500 hover:bg-opacity-25 text-red-400 rounded-full text-sm font-medium tracking-wide uppercase focus:outline-none"
        >
            Logout</button>
    </nav>
</div>