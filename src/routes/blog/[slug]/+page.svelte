<script>
    import { Heading, P, Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
    export let data;
    console.log(data)
</script>

<Breadcrumb aria-label="BreadCrumbs" class="mt-8">
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/blog">Blog</BreadcrumbItem>
    <BreadcrumbItem>{data.post.Record_number.value}</BreadcrumbItem>
</Breadcrumb>
<Heading class="mt-8">{data.post.title.value}</Heading>
<P class="mt-8">{data.post.body.value}</P>
{#if data.post.images}
    <img src={data.post.blob1} alt="blog 1" />
{/if}
<P class="mt-8">{data.post.body2.value}</P>

{#if data.post.images}
    <img src={data.post.blob2} alt="blog 2" />
{/if}