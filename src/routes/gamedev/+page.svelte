<script>
    import ProjectCard from "../../components/projectCard.svelte";
    import Loader from "../../components/loader.svelte";
    import { fly } from "svelte/transition";
    import { Heading, P, Hr, Span, Card, Tabs, TabItem } from "flowbite-svelte";
    import { _ } from "svelte-i18n";
  
    export let data;
    let cardDelay = 100; // Delay between each card in milliseconds
    let activeTabValue = 0; // To keep track of the active tab
  </script>
  
  <div class="flex flex-col lg:flex-row mt-4 pb-8">
    <!-- Combined card for mobile, split for desktop -->
    <Card class="w-full lg:w-3/5 mt-8 mb-8" size="xl">
      <div class="p-4 flex flex-col h-full overflow-hidden">
        <Heading tag="h1" class="mb-4"
        >{$_("projects.gamedev.title")}<Span
            highlight
            highlightClass="text-blue-600"
            >{$_("projects.gamedev.titleHighlight")}</Span
        >.</Heading
    >
    <Hr classHr="w-48 h-1 mx-auto my-4 rounded md:my-10" />
    <P class="mb-4">
        {$_("projects.gamedev.introduction")}
    </P>  
        <!-- Mobile/Tablet view: Projects inside the card using Tabs -->
        <div class="lg:hidden mt-4 flex-1 flex flex-col">
          {#await data}
            <Loader />
          {:then data}
            <Tabs style="underline" bind:activeTabValue class="">
              {#each data.projects as project, i}
                <TabItem open={i === activeTabValue} class="flex-1 flex flex-col overflow-hidden">
                  <span slot="title" class="truncate">{project.title.value}</span>
                  <a href={project.link.value} class="flex-1 flex flex-col overflow-hidden no-underline text-current hover:text-current focus:ring-2 focus:ring-blue-300 rounded-lg outline-none">
                    <div class="mt-4 flex flex-col h-[calc(70vh-18rem)] overflow-hidden">
                      <div class="w-full h-48 mb-4 overflow-hidden rounded-lg">
                        <img 
                          src={project.imageURL} 
                          alt={project.title.value} 
                          class="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div class="flex-1 overflow-y-auto">
                        <P class="mb-2 line-clamp-3">{project.description.value}</P>
                      </div>
                    </div>
                  </a>
                </TabItem>
              {/each}
            </Tabs>
          {/await}
        </div>
      </div>
    </Card>
  
    <!-- Desktop view remains unchanged -->
    <div class="hidden lg:block lg:w-2/5 h-screen overflow-y-auto pl-4">
      {#await data}
        <Loader />
      {:then data}
        <div class="grid grid-cols-1 justify-items-center mt-8">
          {#each data.projects as project, i}
            <div
              in:fly|global={{ y: 200, duration: 2000, delay: i * cardDelay }}
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
  </div>