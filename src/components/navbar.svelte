<script>
  import { _, locale } from "svelte-i18n";
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Button,
    Dropdown,
    DropdownItem,
  } from "flowbite-svelte";
  import { LanguageOutline, ChevronDownOutline } from "flowbite-svelte-icons";
  import logo from "../lib/logo.svg";
  import { navigating } from "$app/stores";

  let currentLocale = "en";
  let hamburgerMenuHidden = true;

  $: if ($navigating) {
    hamburgerMenuHidden = true;
  }

  const toggleHamburgerMenu = () => {
    hamburgerMenuHidden = !hamburgerMenuHidden;
  };

  const changeLocale = () => {
    if (currentLocale == "en") {
      locale.set("ja");
      currentLocale = "ja";
    } else if (currentLocale == "ja") {
      locale.set("en");
      currentLocale = "en";
    }
  };
</script>

<div class="flex" id="top">
  <Navbar
    class="p-0 fixed w-full z-20 top-0 start-0 border-b"
    style="background-color: #8875b5"
  >
    <NavBrand href="/">
      <img src={logo} class="w-24" alt="Purple Flower Logo" />
    </NavBrand>
    <div class="flex md:order-2">
      <Button color="primary" on:click={changeLocale} size="sm"
        ><LanguageOutline class="w-6 h-6" /></Button
      >
      <NavHamburger onClick={toggleHamburgerMenu} />
    </div>
    <NavUl hidden={hamburgerMenuHidden}>
      <NavLi class="text-stone-700 sm:text-white" href="/about"
        >{$_("nav.about")}</NavLi
      >
      <NavLi class="text-stone-700 sm:text-white" href="/products"
        >{$_("nav.products")}</NavLi
      >
      <NavLi class="text-stone-700 sm:text-white" href="/hire"
        >{$_("nav.hire")}</NavLi
      >
      <NavLi class="text-stone-700 sm:text-white" href="/blog"
        >{$_("nav.blog")}</NavLi
      >
      <NavLi class="cursor-pointer text-stone-700 sm:text-white">
        {$_("nav.legal")}<ChevronDownOutline
          class="w-6 h-6 ms-2 text-white inline"
        />
      </NavLi>
      <Dropdown class="w-44 z-20">
        <DropdownItem class="text-stone-700" href="/terms"
          >{$_("nav.terms")}</DropdownItem
        >
        <DropdownItem class="text-stone-700" href="/privacy"
          >{$_("nav.privacy")}</DropdownItem
        >
        <DropdownItem class="text-stone-700" href="/commerce-disclosure"
          >{$_("nav.commerceDisclosure")}</DropdownItem
        >
      </Dropdown>
    </NavUl>
  </Navbar>
</div>
