<script>
    import "../app.pcss";
    import Fab from "../components/fab.svelte";
    import Navbar from "../components/navbar.svelte";
    import ParticleBackground from "../components/particleBackground.svelte";
</script>

<div class="flex flex-col min-h-screen bg-whitesmoke relative">
    <ParticleBackground />
    <Navbar />
    <div class="flex-grow p-[5%] z-10 relative">
        <div class="flex flex-col mt-8">
            <slot></slot>
        </div>
    </div>
</div>

<div class="fixed right-4 bottom-4 z-20">
    <Fab/>
</div>

<style>
    :global(body) {
        background-color: whitesmoke;
    }
</style>