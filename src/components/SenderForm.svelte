<script>
    import {db} from '../database/firebase'
    import {results, idToEdit} from '../store'

    export let handleSenderModal

    let penerima = []

    $results.map(result => {
        if(result.id === $idToEdit) {
            penerima = result.data()
        }
    })

    let nama = '', hp = '', keterangan = ''

    let pengirim = {
        nama: '',
        hp: '',
        keterangan: ''
    }

    let selected = 'Pempek Zaskia'
    let options = [
        'Pempek Zaskia',
        'Custom'
    ]

    $: if (selected === 'Pempek Zaskia') {
        pengirim.nama = 'Pempek Zaskia'
        pengirim.hp = 'WA: +62 857-5872-1955'
        pengirim.keterangan = 'IG: @pempekzaskia'
    } else {
        pengirim.nama = nama
        pengirim.hp = hp ? `HP. ${hp}` : ''
        pengirim.keterangan = keterangan
    }

    const handlePrint = () => {
        const key = new Date().getTime()
        db.collection('terpilih').add({
            key,
            penerima: [penerima.nama, penerima.hp, penerima.alamat],
            pengirim: [pengirim.nama, pengirim.hp, pengirim.keterangan]
        })
        penerima = []
        pengirim = {}
        $idToEdit = ''
        handleSenderModal()
    }


</script>

<section on:click|self={handleSenderModal}>
    <div class="card">
        <div class="input-wrapper">
            <h1>Penerima:</h1>
            <p><b>{penerima.nama}</b></p>
            <p>Hp. {penerima.hp}</p>
            <p>{penerima.alamat}</p>

            <h1 class="h1-second">Pilih Pengirim:</h1>
            <div class="radio-wrapper">
                {#each options as value}
                    <label>
                        <input class='radio' type="radio" {value} bind:group={selected}>
                        {value}
                    </label>
                {/each}
            </div>

            {#if selected === 'Custom'}
            <input class='field' bind:value={nama} type="text" placeholder="Nama Pengirim" required>
            <input class='field' bind:value={hp} type="text" placeholder="No. Hp Pengirim" required>
            <input class='field' bind:value={keterangan} type="text" placeholder="Keterangan (optional)">
            {/if}
        </div>
        <div class="button-wrapper">
            <button on:click={handleSenderModal} class="cancel">Batalkan</button>
            <button on:click={handlePrint} class="done">Selesai</button>
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

    .h1-second {
        margin-top: 25px;
    }

    p {
        line-height: 1.5;
    }

    @media screen and (max-width: 680px) {
        h1 {
            font-size: 16px;
        }
    }

    .field {
        width: 100%;
        border: 1px solid #ccc;
        outline: none;
        border-radius: 10px;
        padding: 15px;
        line-height: 1.5;
    }

    @media screen and (max-width: 680px) {
        .field {
            padding: 10px;
            font-size: 14px;
            margin-bottom: 10px;
            border-radius: 7.5px;
        }
    }

    .field:hover {
        border: 1px solid #eee;
    }

    .field:focus {
        box-shadow: 0 0 0 3px #4088FF;
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

    .done {
        color: #fff;
        background: #4088FF;
        border-bottom-right-radius: 10px;
    }

    .radio-wrapper {
        width: 100%;
        height: 50px;
        margin-bottom: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    label {
        display: flex;
        align-items: center;
        font-size: 15px;
        padding-left: 10px;
        width: calc(50% - 7.5px);
        height: 100%;
        border: 1px solid #eee;
        border-radius: 7.5px;
        cursor: pointer;
    }

    label:hover {
        background: #eee;
    }

    .radio {
        width: 32px;
        margin: 0;
        margin-right: 10px;
        height: 32px;
        cursor: pointer;
    }
</style>