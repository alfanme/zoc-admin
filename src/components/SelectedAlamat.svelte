<script>
    import {onMount, onDestroy} from 'svelte'
    import {db} from '../database/firebase'
    import {selectedAlamat} from '../store'
    import CardSelectedAlamat from './CardSelectedAlamat.svelte'

    let unsubscribe
    onMount(() => {
        unsubscribe = db.collection('terpilih').orderBy('key').onSnapshot(data => {
            $selectedAlamat = data.docs
            console.log('-- onSnapShot Selected --', $selectedAlamat)
        })
    })

    onDestroy(() => {
        unsubscribe()
        console.log('-- unsubscribed onSnapshot Selected', unsubscribe)
    })
</script>

{#if $selectedAlamat.length}
    {#each $selectedAlamat as s }
        <CardSelectedAlamat id={s.id} data={s.data()} />
    {/each}
{:else}
    <p>Belum ada alamat terpilih untuk di-print ...</p>
{/if}