<script>
    export let data;
</script>

<h1>Website Projects</h1>
{#each data.projects as project}
    <p>{project.title.value}</p>
{/each}