<script>
    import {db} from '../database/firebase'

    export let data
    export let id

    const handleDelete = () => {
        db.collection('terpilih').doc(id).delete()
    }
</script>

<div class="card">
    <button on:click={handleDelete}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    <div class="text-wrapper">
        <p class='penerima'>{data.penerima[0]}</p>
        <p>Pengirim: {data.pengirim[0]}</p>
    </div>
</div>

<style>
    @keyframes popin {
        0% {
            transform: scale(0.75);
        }
        50% {
            transform: scale(1.025);
        }
        100% {
            transform: scale(1);
        }
    }

    .card {
        animation: popin 1s ease;
        padding-right: 30px;
        margin-bottom: 15px;
        width: 100%;
        height: 75px;
        background: #fff;
        border: 1px solid #eee;
        border-radius: 10px;
        
        display: flex;
        justify-content: space-between;
        align-items: center;

        transition: all 0.3s ease;
    }

    .card:hover {
        border: 1px solid #ccc;
        transform: scale(1.025);
    }

    button {
        width: 75px;
        height: 100%;
        background: #eee;
        border: none;
        outline: none;
        margin: 0;
        border-radius: 10px 0 0 10px;

        display: grid;
        place-items: center;

        cursor: pointer;

        transition: all 0.3s ease;
    }

    button:hover, button:active {
        color: #fff;
        background: red;
    }

    p {
        font-size: 13px;
        line-height: 1.5;
    }

    .penerima {
        font-size: 15px;
        font-weight: bold;
    }

    .text-wrapper {
        width: calc(100% - 105px);
    }
</style>