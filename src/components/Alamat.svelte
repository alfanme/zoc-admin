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
    import Loading from './Loading.svelte'
    import {results, showAddModal, showEditModal, showSenderModal} from '../store'

    let search = ''

    let unsubscribe
    let isLoadingAddresses = true;
    
    onMount(() => {
        unsubscribe = db.collection('alamat').orderBy('key', 'desc').onSnapshot( data => {
            $results = data.docs
            console.log('-- onSnapshot --', $results)
            isLoadingAddresses = false
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

    const handleResetSearch = () => {
        search = ''
    }

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

    let isDownloading = false

    const handleDownload = async () => {
        isDownloading = true

        await fetch(`${import.meta.env.VITE_FIREBASE_FUNCTIONS_BASE_URL}/generatePdf`, {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            
            const filename = response.headers
                .get('Content-Disposition')
                .split(';')
                .map(part => part.trim())
                .find(part => part.startsWith('filename='))
                .split('=')[1];
            
            const link = document.createElement('a');
            link.href = response.url;
            link.download = filename;
            link.click();
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            isDownloading = false
        })
    }
</script>

<Navbar />
<section>
    <main>
        <div class='alamat-header'>
            <h1>Temukan Alamat</h1>
            <button on:click={handleAddModal}>TAMBAH DATA</button>
        </div>
        <div class='search-container'>
            <input bind:value={search} type="text" placeholder='Cari nama pelanggan'>
            {#if search.length}
            <button on:click={handleResetSearch} class='reset-button'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            {/if}
        </div>
        {#if isLoadingAddresses}
            <div class='loading-container'>
                <Loading />
            </div>
        {:else}
            <p class='found'>Ditemukan {filtered.length} dari {$results.length} alamat</p>
            <div class='alamat-wrapper'>
                {#if filtered.length}
                    {#each filtered as flt }
                        <CardAlamat id={flt.id} penerima={flt.data()} {handleEditModal} {handleSenderModal} />
                    {/each}
                {:else}
                    <p class='no-data'>Data tidak ditemukan...</p>
                {/if}
            </div>
        {/if}
    </main>
    <aside>
        <div class='alamat-header'>
            <h1>Alamat Terpilih</h1>
            <div class='button-group'>
                <button on:click={handlePrint}>PRINT</button>
                <button on:click={handleDownload}>
                    {#if isDownloading}
                        <Loading size='2' />
                    {:else}
                        DOWNLOAD
                    {/if}
                </button>
            </div>
        </div>
        {#if isLoadingAddresses}
            <div class='loading-container'>
                <Loading />
            </div>
        {:else}
            <SelectedAlamat />
        {/if}
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

<style>
    section {
        width: 100%;
        padding: 25px;
        display: grid;
        grid-template-columns: minmax(0, 1fr) 20rem;
        column-gap: 2rem;
    }

    @media screen and (max-width: 680px) {
        section {
            display: flex;
            flex-direction: column-reverse;
        }
    }

    main {
        width: 100%;
    }

    @media screen and (max-width: 680px) {
        main {
            padding-top: 50px;
        }
    }

    aside {
        width: 100%;
    }

    @media screen and (max-width: 680px) {
        aside {
            padding-left: 0;
            padding-bottom: 25px;
            border-left: none;
            border-bottom: 1px solid #eee;
        }
    }

    .alamat-header {
        width: 100%;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    button {
        padding: 10px;
        background: none;
        margin: 0;
        border: none;
        border-radius: 5px;
        outline: none;
        color: #4088FF;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    button:hover {
        background: #eaf4ff;
    }

    .button-group {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 25px 0;
    }

    .alamat-wrapper {
        margin-top: 10px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 20px;
    }

    @media screen and (max-width: 680px) {
        .alamat-wrapper {
            display: flex;
            flex-direction: column;
        }
    }

    .search-container {
        display: flex;
        gap: 1rem;
    }

    .reset-button {
        width: 4rem;
    }

    input {
        width: 100%;
        border: 1px solid #ccc;
        outline: none;
        border-radius: 10px;
        padding: 15px;
        margin: 0;
    }

    @media screen and (max-width: 680px) {
        input {
            padding: 15px;
            font-size: 16px;
        }
    }

    input:hover {
        border: 1px solid #eee;
    }

    input:focus {
        box-shadow: 0 0 0 3px #4088FF;
    }

    .no-data {
        margin-top: 25px;
        margin-left: 30px;
    }

    .found {
        margin: 25px 0;
        color: #333;
    }
</style>