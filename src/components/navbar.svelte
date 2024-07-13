<script>
    import { _ } from 'svelte-i18n'
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    import logo from "../lib/logo.svg";
  </script>
  
  <div class="relative px-8">
    <Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
      <NavBrand href="/">
        <img src={logo} class="me-3 h-6 sm:h-9" alt="Purple Flower Logo" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SeanCo</span>
      </NavBrand>
      <NavHamburger />
      <NavUl>
        <NavLi href="/" active={true}>{$_('nav_home')}</NavLi>
        <NavLi href="/kintone">{$_('nav_kintone')}</NavLi>
        <NavLi href="/gamedev">{$_('nav_gamedev')}</NavLi>
        <NavLi href="/hire">{$_('nav_hire')}</NavLi>
      </NavUl>
    </Navbar>
  </div>