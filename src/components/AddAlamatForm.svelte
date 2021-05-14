<script>
    import {db} from '../database/firebase'
    export let handleAddModal

    let nama = ''
    let hp = ''
    let alamat = ''

    const addAlamat = () => {
        const key = new Date().getTime()
        db.collection('alamat').add({
            key, nama, hp, alamat
        })
        nama = ''
        hp = ''
        alamat = ''
        handleAddModal()
    }
</script>

<section on:click|self={handleAddModal}>
    <div class="card">
        <div class="input-wrapper">
            <h1>Tambah Data Pelanggan</h1>
            <input bind:value={nama} type="text" placeholder="Nama" required>
            <input bind:value={hp} type="text" placeholder="No. Hp" required>
            <textarea bind:value={alamat} placeholder='Alamat' required></textarea>
        </div>
        <div class="button-wrapper">
            <button on:click={handleAddModal} class="cancel">Batalkan</button>
            <button on:click={addAlamat} class="add">Tambah ke database</button>
        </div>
    </div>
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card {
        width: 500px;
        height: fit-content;
        border-radius: 10px;
        background: #fff;
        display: flex;
        flex-direction: column;
    }

    @media screen and (max-width: 680px) {
        .card {
            width: calc(100% - 50px);
        }
    }

    .input-wrapper {
        padding: 50px;
    }

    @media screen and (max-width: 680px) {
        .input-wrapper{
            padding: 30px;
        }
    }

    h1 {
        margin-bottom: 25px;
        font-size: 18px;
    }

    @media screen and (max-width: 680px) {
        h1 {
            font-size: 16px;
        }
    }

    input, textarea {
        width: 100%;
        border: 1px solid #ccc;
        outline: none;
        border-radius: 10px;
        padding: 15px;
        line-height: 1.5;
    }

    @media screen and (max-width: 680px) {
        input, textarea {
            padding: 10px;
            font-size: 14px;
            margin-bottom: 10px;
            border-radius: 7.5px;
        }
    }

    input:hover, textarea:hover {
        border: 1px solid #eee;
    }

    input:focus, textarea:focus {
        box-shadow: 0 0 0 3px #4088FF;
    }

    textarea {
        height: 150px;
    }

    @media screen and (max-width: 680px) {
        textarea {
            height: 110px;
        }
    }

    .button-wrapper {
        height: 50px;
        display: grid;
        grid-template-columns: 1fr 1.5fr;
    }

    button {
        width: 100%;
        height: 100%;
        background: none;
        margin: 0;
        border: none;
        border-radius: 0;
        outline: none;
        color: #333;
        background: #eee;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    @media screen and (max-width: 680px) {
        button {
            font-size: 16px;
        }
    }

    button:hover, button:active {
        color: #fff;
    }

    .cancel {
        border-bottom-left-radius: 10px;
    }

    .cancel:hover, .cancel:active {
        background: red;
    }

    .add {
        color: #fff;
        background: #4088FF;
        border-bottom-right-radius: 10px;
    }
</style>