<script>
    import { Pulse } from 'svelte-loading-spinners';
    export let size = '3'
</script>

<Pulse {size} unit='rem' color="#4088FF" duration="1s" />
