<script>
    export let data
</script>

<div>
    <p class="bold underline">PENERIMA</p>
    <p class="bold">{data.penerima[0]}</p>
    <p class="bold">{data.penerima[1]}</p>
    <p>{data.penerima[2]}</p>
    <br>
    <p class="bold underline">PENGIRIM</p>
    <p class="bold">{data.pengirim[0]}</p>
    <p>{data.pengirim[1]}</p>
    <p>{data.pengirim[2]}</p>
</div>

<style>
    div {
        width: 100%;
        max-width: calc(10.5cm - 40px);
        height: auto;
        margin: 0;
        padding: 20px;
        background: #fff;
        border: 1px solid #000;
    }

    p {
        color: #000;
        line-height: 1.5;
        text-transform: uppercase;
    }

    .bold {
        font-weight: bold;
    }

    .underline {
        text-decoration: underline;
    }
</style>