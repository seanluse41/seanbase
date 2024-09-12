<script>
    import { SyncLoader } from "svelte-loading-spinners";
</script>

<div class="loadingContainer">
    <SyncLoader size="200" color="#8c86aa" unit="px" duration="1s" />
</div>

<style>
    .loadingContainer {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>