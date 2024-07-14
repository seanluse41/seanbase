<script lang="js">
	import { _ } from "svelte-i18n";
	import { Heading, P } from "flowbite-svelte";
	import ProjectCard from "../components/projectCard.svelte";
	import Loader from "../components/loader.svelte";

	const getProjects = async () => {
		const projectRequest = await fetch("/", {
			method: "GET",
			credentials: "same-origin",
			headers: {
				"content-type": "application/json",
			},
		});
		const projects = await projectRequest.json();
		console.log(projects);
		return projects;
	};
</script>

<div class="text-left">
	<Heading
		tag="h1"
		class="mb-4"
		id="top"
		customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
		>{$_("main_name")}</Heading
	>
	<P class="mb-6 text-lg lg:text-xl dark:text-gray-400"
		>{$_("main_subtitle")}</P
	>
	{#await getProjects()}
		<Loader />
	{:then projects}
		<div class="flex flex-row flex-wrap justify-evenly">
			{#each projects as project}
				<ProjectCard
					title={project.title.value}
					description={project.description.value}
					id={project.Record_number.value}
					type={project.type.value}
				/>
			{/each}
		</div>
	{/await}
</div>
