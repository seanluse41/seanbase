<script>
    import "../app.pcss";
    import Fab from "../components/fab.svelte";
    import Navbar from "../components/navbar.svelte";
    import ParticleBackground from "../components/particleBackground.svelte";
</script>


<div class="main">
    <ParticleBackground/>
    <Navbar />
    <div class="flex flex-col mt-24 z-10 relative">
        <slot></slot>
    </div>
</div>
<div class="fabContainer">
    <Fab/>
</div>

<style>
    .main {
        min-height: 100vh;
        background-color: whitesmoke;
        padding: 5%;
    }

    .fabContainer {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 20;
    }
</style>