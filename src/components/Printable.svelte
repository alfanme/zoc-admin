<script>
    import {pop} from 'svelte-spa-router'
    import CardPrintable from './CardPrintable.svelte'
    import {selectedAlamat} from '../store';

    const handlePrint = () => {
        window.focus()
        window.print()
    }

    const handleMainMenu = () => {
        pop()
    }
</script>

<div class="kertas">
    {#each $selectedAlamat as s}
        {#each [...Array(s.data().jumlah).keys()] as _}
            <CardPrintable data={s.data()} />
        {/each}
    {/each}
</div>
<div class='control'>
    <button on:click={handlePrint} class="print">PRINT SEKARANG</button>
    <button on:click={handleMainMenu} class="home">MENU UTAMA</button>
</div>

<style>
    .kertas {
        margin: 0 auto;
        width: 21cm;
        min-height: 29.7cm;
        padding: 20px;
        border: 1px dashed #ccc;
        display: grid;
        gap: 40px;
        grid-template-columns: repeat(2, auto);
        grid-auto-rows: max-content;
    }

    @media screen and (max-width: 680px) {
        .kertas {
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-bottom: 150px;
        }
    }

    button {
        width: 100%;
        padding: 10px;
        border: none;
        color: #333;
        background: #eee;
        border-radius: 7.5px;
        cursor: pointer;
    }

    .print {
        color: #fff;
        background: #4088FF;
    }

    .home:hover {
        color: #fff;
        background: orange;
    }

    .control {
        position: fixed;
        top: 50px;
        right: 100px;
        display: flex;
        flex-direction: column;
    }

    @media screen and (max-width: 680px) {
        .control {
            padding: 25px;
            background: #fff;
            width: 100%;
            top: auto;
            bottom: 0;
            left: 0;
        }
    }

    @media print {
        .kertas {
            border: none;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 29.7cm;
        }

        .control {
            display: none;
        }
    }
</style>