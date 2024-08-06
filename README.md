# Oh boy another portfolio site

We sure are web-deving now aren't we. Free database. Free hosting. Stolen computer. Pirated Linux.
Hosted on netlify @ [www.seanbase.com](seanbase.com)

[![Netlify Status](https://api.netlify.com/api/v1/badges/dac07780-2226-4d44-9bae-9b179cedf1bd/deploy-status)](https://app.netlify.com/sites/seanbase/deploys)

## Run it locally (why?)

``` shell
gh repo clone seanluse41/seanbase

cd seanbase

npm i

npm run dev
```

## Libraries etc used

- Sveltekit
- Svelte i18n
- Kintone
- flowbite-svelte and related icons etc
- bunch of other dumb shit

## Why

I need a hub to keep track of my different activities, and a easy portal for contact / selling Kintone plugins etc.

## Structure

Four Set routes:

- gamedev
- kintone dev
- hire / contact
- blog

Then a slug route for different projects.

### Index

The [index route](./src/routes/+server.js) gets all project's minimum info from Kintone.
The [frontend index](./src/routes/+page.svelte) takes the list of projects, uses the filekey to get each project's main image and then saves it all to a store. Index checks the store on subsequent loads, and uses store if it exists.

### Project Slug Route

Clicking on a project card takes you to the slug route. The [slug route](./src/routes/[slug]/+page.js) then gets the project in question's details and carousel images. Then saves it to the store as well. Subsequent visits to the route load from store first, not API.