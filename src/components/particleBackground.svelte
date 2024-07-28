<script>
	import { particlesInit } from '@tsparticles/svelte';
	import { onMount } from 'svelte';
	import { loadSlim } from '@tsparticles/slim';
  import config from "../components/particlesjs-config.json";

	let ParticlesComponent;

	onMount(async () => {
		const module = await import('@tsparticles/svelte');

		ParticlesComponent = module.default;
	});

	let particlesConfig = config

	let onParticlesLoaded = (event) => {
		const particlesContainer = event.detail.particles;

		// you can use particlesContainer to call all the Container class
		// (from the core library) methods like play, pause, refresh, start, stop
	};

	void particlesInit(async (engine) => {
		await loadSlim(engine);
	});
</script>

<svelte:component
	this="{ParticlesComponent}"
	id="tsparticles"
	class=""
	style="position:absolute;z-index:0"
	options="{particlesConfig}"
	on:particlesLoaded="{onParticlesLoaded}"
/>