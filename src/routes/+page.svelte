<script lang="js">
    import { _ } from "svelte-i18n";
    import { Heading, P } from "flowbite-svelte";
    import ProjectCard from "../components/projectCard.svelte";
    import Loader from "../components/loader.svelte";
    import { projectsStore } from "../stores/projects.js";
    import { fly } from "svelte/transition";
    import { get } from 'svelte/store';

    let cardDelay = 100; // Delay between each card in milliseconds

    const getImage = async (recordID) => {
        let imageURL;
        const imageRequest = await fetch("/getImage", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ recordID }),
        });
        if (imageRequest.status == 200) {
            let imageBlob = await imageRequest.blob();
            imageURL = URL.createObjectURL(imageBlob);
        } else {
            imageURL = null;
        }
        return imageURL;
    };

    const getProjects = async () => {
        // Check if we have projects in the store
        let projects = get(projectsStore);
        if (projects.length > 0) {
            // If we have projects in the store, use them
            return projects;
        }
        // If not, fetch projects from the server
        const projectRequest = await fetch("/", {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "content-type": "application/json",
            },
        });
        projects = await projectRequest.json();

        for (const project of projects) {
            if (!project.imageURL) {
                let imageURL = await getImage(project.Record_number.value);
                project.imageURL = imageURL;
            }
            if (!project.detailImagesStore) {
                project.detailImagesStore = [];
            }
        }
        projectsStore.set(projects);
        return projects;
    };
    let projectsPromise = getProjects();
</script>

<div>
    <Heading
        tag="h1"
        class="mb-4 text-stone-700"
        customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
    >{$_("main_name")}</Heading>
    <P class="mb-6 text-lg lg:text-xl text-stone-700">{$_("main_subtitle")}</P>
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