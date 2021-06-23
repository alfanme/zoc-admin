<script>
    import {onMount, onDestroy} from 'svelte'
    import {push} from 'svelte-spa-router'
    import {db} from '../database/firebase'
    import Navbar from './Navbar.svelte'
    import CardAlamat from './CardAlamat.svelte'
    import AddAlamatForm from './AddAlamatForm.svelte'
    import EditAlamatForm from './EditAlamatForm.svelte'
    import SenderForm from './SenderForm.svelte'
    import SelectedAlamat from './SelectedAlamat.svelte'
    import {results, showAddModal, showEditModal, showSenderModal} from '../store'

    let search = ''

    let unsubscribe
    
    onMount(() => {
        unsubscribe = db.collection('alamat').orderBy('key', 'desc').onSnapshot( data => {
            $results = data.docs
            console.log('-- onSnapshot --', $results)
        })
    })

    onDestroy(() => {
        unsubscribe()
        console.log('-- unsubscribed from onSnapshot --', unsubscribe)
    })

    $: filtered = $results.filter(result => {
        let s = search.toLowerCase()
        let r = result.data()
        return ( r.nama.toLowerCase().indexOf(s) !== -1 )
    })

    const handleAddModal = () => {
        $showAddModal = !$showAddModal;
    }

    const handleEditModal = () => {
        $showEditModal = !$showEditModal
    }

    const handleSenderModal = () => {
        $showSenderModal = !$showSenderModal
    }

    const handlePrint = () => {
        push('/print')
    }
</script>

<Navbar />
<section class="grid grid-cols-4 gap-8 w-full p-6 pb-32">
    <main class="col-start-1 col-end-4">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-xl font-medium tracking-wide">Temukan Alamat</h1>
            <button on:click={handleAddModal}
                class="px-6 h-10 text-sm font-medium tracking-wide bg-blue-900 hover:bg-blue-700 rounded-full"
            >
                TAMBAH DATA</button>
        </div>
        <input bind:value={search} type="text" placeholder='Cari nama pelanggan'
            class="px-6 h-12 w-full rounded-full bg-gray-800 hover:bg-gray-900 focus:bg-gray-900 hover:ring-4 focus:ring-4 focus:outline-none"
        >
        {#if filtered.length}
            <p class="my-6 text-center">Ditemukan {filtered.length} dari {$results.length} alamat</p>
        {:else}
            <p class="my-6 text-center text-red-400">Data tidak ditemukan ...</p>
        {/if}
        <div class="grid grid-cols-3 gap-6">
            {#if filtered.length}
                {#each filtered as flt }
                    <CardAlamat id={flt.id} penerima={flt.data()} {handleEditModal} {handleSenderModal} />
                {/each}
            {/if}
        </div>
    </main>
    <aside class="col-start-4 col-end-5">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-xl font-medium tracking-wide">Alamat Terpilih</h1>
            <button on:click={handlePrint}
                class="px-6 h-10 text-sm font-medium tracking-wide bg-blue-900 hover:bg-blue-700 rounded-full"
            >PRINT</button>
        </div>
        <SelectedAlamat />
    </aside>
    
</section>

{#if $showAddModal}
    <AddAlamatForm {handleAddModal} />
{/if}

{#if $showEditModal}
    <EditAlamatForm {handleEditModal} />
{/if}

{#if $showSenderModal}
    <SenderForm {handleSenderModal} />
{/if}