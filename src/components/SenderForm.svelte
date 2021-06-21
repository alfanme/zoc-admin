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

    let jumlah = {
        value: 1,
        increment: () => jumlah.value++,
        decrement: () => {
            jumlah.value > 0 && jumlah.value--
        }
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
            key: key,
            jumlah: jumlah.value,
            penerima,
            pengirim
        })
        penerima = []
        pengirim = {}
        jumlah = 1
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
            <input class='field field-bottom' bind:value={keterangan} type="text" placeholder="Keterangan (optional)">
            {/if}

            <h1>Jumlah alamat</h1>
            <div class="amount-wrapper">
                <button on:click={jumlah.decrement}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <input type="number" bind:value={jumlah.value}>
                <button on:click={jumlah.increment}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
            </div>
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
        padding: 50px 0;
        overflow-y: auto;
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

    .field-bottom {
        margin-bottom: 25px;
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

    .amount-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .amount-wrapper > input {
        height: 3em;
        width: 3em;
        text-align: center;
        border: none;
        outline: none;
    }

    /* Chrome, Safari, Edge, Opera */
    .amount-wrapper > input::-webkit-outer-spin-button,
    .amount-wrapper > input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    .amount-wrapper > input[type=number] {
        -moz-appearance: textfield;
    }

    .amount-wrapper > button {
        display: grid;
        place-items: center;
        height: 3em;
        width: 3em;
        border-radius: 1.5em;
        background: #eee;
        color: #333;
    }

    .amount-wrapper > button:active {
        background: #f5f5f5;
        color: #888;
    }
</style>