<script>
    export let data;
</script>

{#each data.projects as project}
    <p>{project.title.value}</p>
{/each}