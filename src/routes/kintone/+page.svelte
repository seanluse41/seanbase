<script>
    export let data;
    console.log(data)
</script>

{#each data.projects as project}
    <p>{project.title.value}</p>
{/each}