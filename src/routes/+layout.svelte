<script>
    import "../app.pcss";
    import Fab from "../components/fab.svelte";
    import Navbar from "../components/navbar.svelte";
    import ParticleBackground from "../components/particleBackground.svelte";
    import { page } from '$app/stores';
    import { _, locale, waitLocale } from 'svelte-i18n';
    import { onMount } from 'svelte';
    import { blogStore } from '../stores/blogPosts.js';

    // Site information
    const siteInfo = {
        name: 'Seanco',
        twitter: '@halleyscomet41',
    };

    $: path = $page.url.pathname;
    $: lang = $locale;
    $: isBlogPost = path.startsWith('/blog/') && path !== '/blog';
    
    // Dynamic page title and description
    $: pageKey = path === '/' ? 'home' : path.slice(1).replace(/\//g, '.');
    $: pageTitle = isBlogPost 
        ? getBlogPostTitle(path, $blogStore) 
        : $_(`pageTitle.${pageKey}`) || $_('pageTitle.default');
    $: pageDescription = isBlogPost 
        ? getBlogPostDescription(path, $blogStore) 
        : $_(`pageDescription.${pageKey}`) || $_('pageDescription.default');

    function getBlogPostTitle(path, blogPosts) {
        const slug = path.split('/').pop();
        const post = blogPosts.find(p => p.Record_number.value === slug);
        return post ? `Seanco Blog - ${post.title.value}` : $_('pageTitle.blog');
    }

    function getBlogPostDescription(path, blogPosts) {
        const slug = path.split('/').pop();
        const post = blogPosts.find(p => p.Record_number.value === slug);
        return post ? post.blogIntro.value : $_('pageDescription.blog');
    }

    onMount(async () => {
        await waitLocale();
    });
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="canonical" href={`https://seanbase.com${path}`} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`https://seanbase.com${path}`} />
    <meta property="og:site_name" content={siteInfo.name} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={siteInfo.twitter} />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={pageDescription} />
    <link rel="alternate" hreflang="en" href={`https://seanbase.com${path}?lang=en`} />
    <link rel="alternate" hreflang="ja" href={`https://seanbase.com${path}?lang=ja`} />
    <meta name="robots" content="index, follow" />
</svelte:head>

<div class="flex flex-col min-h-screen bg-whitesmoke relative">
    <ParticleBackground />
    <Navbar />
    <div class="flex-grow p-[5%] z-10 relative">
        <div class="flex flex-col mt-8">
            <slot></slot>
        </div>
    </div>
</div>

<div class="fixed right-4 bottom-4 z-20">
    <Fab/>
</div>

<style>
    :global(body) {
        background-color: whitesmoke;
    }
</style>