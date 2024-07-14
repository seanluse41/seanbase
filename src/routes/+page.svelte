<script lang="js">
	import { _ } from "svelte-i18n";
	import { Heading, P } from "flowbite-svelte";
	import logo from "../lib/logo-cropped.png"
	import ProjectCard from "../components/projectCard.svelte";
</script>

<div class="text-left">
	<Heading
		tag="h1"
		class="mb-4"
		customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
		>{$_("main_name")}</Heading
	>
	<P class="mb-6 text-lg lg:text-xl xl:px-48 dark:text-gray-400"
		>{$_("main_subtitle")}</P
	>
	<div class="flex flex-row flex-wrap justify-evenly">
		<ProjectCard image={logo} title={`aaa`} link={"/"}/>
	</div>
</div>
