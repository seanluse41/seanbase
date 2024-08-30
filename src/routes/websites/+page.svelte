<script>
    import ProjectCard from "../../components/projectCard.svelte";
    import Loader from "../../components/loader.svelte";
    import { fly } from "svelte/transition";
    export let data;
    let cardDelay = 100; // Delay between each card in milliseconds
</script>

{#await data}
<Loader />
{:then data}
<div class="flex flex-row flex-wrap">
    {#each data.projects as project, i}
        <div
            in:fly|global={{
                y: 200,
                duration: 2000,
                delay: i * cardDelay,
            }}
        >
            <ProjectCard
                title={project.title.value}
                description={project.description.value}
                type={project.type.value}
                link={project.link.value}
                imageURL={project.imageURL}
            />
        </div>
    {/each}
</div>
{/await}