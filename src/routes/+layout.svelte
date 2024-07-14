<script>
    import "../app.pcss";
    import Fab from "../components/fab.svelte";
    import Navbar from "../components/navbar.svelte";
</script>

<div class="flex flex-col">
    <Navbar />
    <div class="main">
        <slot></slot>
    </div>
    <Fab/>
</div>

<style>
    .main {
        margin-top: 64px;
        height: 100vh;
        background-color: whitesmoke;
        color: #3C3D36;
        padding: 3%;
    }
</style>