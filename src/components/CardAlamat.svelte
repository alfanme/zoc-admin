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

<div class='card'>
    <div class="text-wrapper">
        <p class='nama'>{penerima.nama}</p>
        <p>Hp. {penerima.hp}</p>
        <p>{penerima.alamat}</p>
    </div>

    <div class='buttons-wrapper'>
        <button on:click={deleteAlamat} class='delete'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
        <button on:click={() => {
            handleEditModal()
            getId()
        }} class='edit'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
        <button on:click={() => {
            handleSenderModal()
            getId()
        }} class='print'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            <span>Print</span>
        </button>
    </div>
</div>

<style>
    .card {
        width: 100%;
        height: 100%;
        background: #fff;
        border: 1px solid #eee;
        border-radius: 10px;
        position: relative;
        transition: all 0.3s ease;
    }

    @media screen and (max-width: 680px) {
        .card {
            width: 100%;
            font-size: 16px;
        }
    }

    .text-wrapper {
        height: calc(100% - 50px);
        padding: 30px;
    }

    @media screen and (max-width: 680px) {
        .text-wrapper {
            padding: 25px;
        }
    }    

    .buttons-wrapper {
        margin-top: auto;
        width: 100%;
        height: 50px;
        display: grid;
        grid-template-columns: 1fr 1fr 3fr;
    }

    .card:hover {
        border: 1px solid #ccc;
        transform: scale(1.025);
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

    button {
        margin: 0;
        width: 100%;
        height: 100%;
        border-radius: 0;
        display: grid;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;
        background: #eee;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    button:hover {
        color: #fff;
    }

    .print {
        color: #fff;
        background: #4088FF;
        border-bottom-right-radius: 7.5px;
    }

    .edit:hover, .edit:active {
        background: orange;
    }

    .delete {
        border-bottom-left-radius: 7.5px;
    }

    .delete:hover, .delete:active {
        background: red;
    }

    span {
        margin-left: 10px;
    }
</style>