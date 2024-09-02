<!-- /src/routes/+page.svelte -->
<script lang="js">
    import { _ } from "svelte-i18n";
    import { Heading, P } from "flowbite-svelte";
    import ProjectCard from "../components/projectCard.svelte";
    import Loader from "../components/loader.svelte";
    import { fly } from "svelte/transition";
    import { getAllProjects } from "../requests/kintoneProjectRequests";

    let cardDelay = 100; // Delay between each card in milliseconds
    let projectsPromise = getAllProjects(fetch);
</script>

<div>
    <Heading
        tag="h1"
        class="mt-8 mb-10 text-stone-700"
        customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
        >SEANCO</Heading
    >
    {#await projectsPromise}
        <Loader />
    {:then projects}
        <div class="flex flex-row flex-wrap">
            {#each projects as project, i}
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
</div>
