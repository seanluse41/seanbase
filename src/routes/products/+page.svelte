<script>
    import { Heading, P, Hr, Span, Card, Img } from "flowbite-svelte";
    import { _ } from "svelte-i18n";
    import { fly } from "svelte/transition";
    import powerup from "../../lib/powerUp.png";
    import { getProjectsByType } from "../../requests/kintoneProjectRequests";
    import Loader from "../../components/loader.svelte";
    import ProjectCard from "../../components/projectCard.svelte";
    let cardDelay = 100; // Delay between each card in milliseconds
    let projectsPromise = getProjectsByType("kintone", fetch);
</script>

<Card size="xl" class="mt-8 p-8 self-center">
    <div class="flex flex-col md:flex-row justify-evenly items-center mb-8">
        <div class="flex flex-col mb-4 md:mb-0 order-1 md:order-none">
            <Heading tag="h1" class=" lg:mb-4 mt-4 sm:mb-0">
                {$_("projects.kintone.title")}
                <Span highlight highlightClass="text-yellow-300">
                    {$_("projects.kintone.titleHighlight")}
                </Span>
                {@html $_("projects.kintone.titleEnd")}
            </Heading>
            <P class="mb-4">
                {$_("projects.kintone.introduction")}
            </P>
        </div>
        <Img
            alt="notion style image of plugins"
            class="rounded-lg sm:w-60 md:w-72 md:max-w-lg order-2 md:order-none"
            src={powerup}
        />
    </div>
    <Hr classHr="w-48 h-1 mx-auto my-4 rounded md:my-10" />
    {#await projectsPromise}
        <Loader />
    {:then projects}
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
    {/await}
</Card>
