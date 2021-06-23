<script>
    import { db } from "../database/firebase";
    import { idToEdit } from '../store'

    export let penerima
    export let id
    export let handleEditModal
    export let handleSenderModal

    const deleteAlamat = () => {
        db.collection('alamat').doc(id).delete()
    }

    const getId = () => {
        $idToEdit = id;
    }

</script>

<div class="flex flex-col justify-between p-6 w-full h-full rounded-2xl bg-gray-800">
    <div class="mb-6">
        <p class="text-lg font-bold tracking-wide">{penerima.nama}</p>
        <p>Hp. {penerima.hp}</p>
        <p class="line-clamp-3">{penerima.alamat}</p>
    </div>

    <div class="flex justify-between gap-4 -mx-2 -mb-2 items-center">
        <button on:click={deleteAlamat}
            class="grid place-items-center h-12 w-12 bg-gray-700 hover:bg-gray-500 rounded-full focus:outline-none"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
        <button on:click={() => {
            handleEditModal()
            getId()
        }} class="grid place-items-center h-12 w-12 bg-gray-700 hover:bg-gray-500 rounded-full focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
        <button on:click={() => {
            handleSenderModal()
            getId()
        }} class="flex justify-center items-center h-12 flex-1 text-sm font-medium tracking-wide bg-blue-900 hover:bg-blue-700 rounded-full focus:outline-none uppercase">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            <span class="ml-2">Print</span>
        </button>
    </div>
</div>