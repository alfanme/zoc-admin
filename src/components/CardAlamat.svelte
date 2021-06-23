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

<div class="card">
    <div class="text-wrapper">
        <p class='nama'>{penerima.nama}</p>
        <p>Hp. {penerima.hp}</p>
        <p>{penerima.alamat}</p>
    </div>

    <div class='buttons-wrapper'>
        <button on:click={deleteAlamat} class='delete'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
        </button>
        <button on:click={() => {
            handleEditModal()
            getId()
        }} class='edit'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
            </svg>
        </button>
        <button on:click={() => {
            handleSenderModal()
            getId()
        }} class='select'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Pilih</span>
        </button>
    </div>
</div>

<style lang="scss">
    @import "../scss/_mixins.scss";
    @import "../scss/_colors.scss";
    @import "../scss/_buttons.scss";
    .card {
        @include flex-col;
        padding: 1em;

        width: 100%;
        height: 100%;
        background: $white;
        border: 2px solid $light-gray;
        border-radius: 0.5em;
    }

    .text-wrapper {
        flex: auto;
        padding: 0.5em;
        margin-bottom: 1.5em;
    }   

    .buttons-wrapper {
        width: 100%;
        display: flex;
        gap: 1em;
    }

    p {
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;  
        overflow: hidden;
    }

    .nama {
        font-weight: bold;
    }

    .select {
        @include button-primary;
        flex: auto;
    }

    .edit {
        @include button-circle-warning;
    }

    .delete {
        @include button-circle-danger;
    }

    span {
        margin-left: 10px;
    }

    svg {
        width: 1.5rem;
        height: 1.5rem;
    }
</style>