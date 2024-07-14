<script>
  import { _, locale } from "svelte-i18n";
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Button,
  } from "flowbite-svelte";
  import { LanguageOutline } from "flowbite-svelte-icons";
  import logo from "../lib/logo.svg";

  let currentLocale = "en";

  const changeLocale = () => {
    if (currentLocale == "en") {
      locale.set("ja");
      currentLocale = "ja"
    } else if (currentLocale == "ja") {
      locale.set("en");
      currentLocale = "en"
    }
  };
</script>

<div class="flex px-8">
  <Navbar
    class="p-0 fixed w-full z-20 top-0 start-0 border-b"
    style="background-color: #8875b5"
  >
    <NavBrand href="/">
      <img src={logo} class="h-16" alt="Purple Flower Logo" />
    </NavBrand>
    <div class="flex md:order-2">
      <Button color=primary on:click={changeLocale} size="sm"><LanguageOutline class="w-6 h-6"/></Button>
      <NavHamburger />
    </div>
    <NavUl>
      <NavLi class="text-white" href="/blog" active={true}
        >{$_("nav_blog")}</NavLi
      >
      <NavLi class="text-white" href="/kintone">{$_("nav_kintone")}</NavLi>
      <NavLi class="text-white" href="/gamedev">{$_("nav_gamedev")}</NavLi>
      <NavLi class="text-white" href="/hire">{$_("nav_hire")}</NavLi>
    </NavUl>
  </Navbar>
</div>
