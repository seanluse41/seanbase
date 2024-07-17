<script>
    import "../app.pcss";
    import Fab from "../components/fab.svelte";
    import Navbar from "../components/navbar.svelte";
</script>

<div>
    <Navbar />
    <div class="main flex flex-col">
        <slot></slot>
    </div>
</div>
<div class="fabContainer">
    <Fab/>
</div>

<style>
    .main {
        margin-top: 64px;
        min-height: 100vh;
        background-color: whitesmoke;
        color: #3C3D36;
        padding: 3%;
    }

    .fabContainer {
        position: fixed;
        right: 16px;
        bottom: 16px;
    }
</style>