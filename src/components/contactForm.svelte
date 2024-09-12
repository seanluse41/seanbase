<script>
  import {
    Button,
    Label,
    Input,
    Textarea,
    Dropdown,
    DropdownDivider,
    DropdownItem,
  } from "flowbite-svelte";
  import {
    EnvelopeSolid,
    UserSolid,
    BuildingSolid,
    PhoneSolid,
    CheckCircleSolid,
    ChevronDownOutline,
  } from "flowbite-svelte-icons";
  import { _ } from "svelte-i18n";
  import { onMount, createEventDispatcher } from "svelte";

  export let submitting = false;
  export let submitted = false;
  export let isModal = false;

  let formStartTime;
  const dispatch = createEventDispatcher();
  let selectedTemplate = "";
  let dropdownOpen = false;
  let inquiryText = "";

  $: buttonText = selectedTemplate || $_("select_template");

  $: templateMessages = {
  "kGuide": $_("template_message_kGuide"),
  "tenKen Buddy": $_("template_message_tenKen_Buddy"),
  "Custom Integration": $_("template_message_custom_integration"),
  "Bug / Error Report": $_("template_message_bug_report"),
};

  onMount(() => {
    formStartTime = Date.now();
  });

  function handleTemplateSelection(template) {
    selectedTemplate = template;
    inquiryText = templateMessages[template] || "";
    dropdownOpen = false;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    submitting = true;

    const formData = new FormData(event.target);

    if (formData.get("website")) {
      submitting = false;
      return;
    }

    const submissionTime = Date.now();
    const timeElapsed = submissionTime - formStartTime;
    if (timeElapsed < 3000) {
      submitting = false;
      return;
    }

    formData.append("submissionTime", submissionTime.toString());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        submitted = true;
        dispatch("submitted");
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert($_("contact_form_error"));
    } finally {
      submitting = false;
    }
  }
</script>

{#if !submitted}
  <form
    name="contact"
    method="POST"
    on:submit={handleSubmit}
    class="flex flex-col space-y-4"
  >
    {#if isModal == false}
      <div class="flex flex-row justify-evenly">
        <Button on:click={() => dropdownOpen = !dropdownOpen}>
          {buttonText}
          <ChevronDownOutline size="xl" class="ml-2 text-white" />
        </Button>
        <Dropdown bind:open={dropdownOpen}>
          <DropdownItem on:click={() => handleTemplateSelection("kGuide")}>{$_("template_kGuide")}</DropdownItem>
          <DropdownItem on:click={() => handleTemplateSelection("tenKen Buddy")}>{$_("template_tenKen_Buddy")}</DropdownItem>
          <DropdownDivider />
          <DropdownItem on:click={() => handleTemplateSelection("Custom Integration")}>{$_("template_custom_integration")}</DropdownItem>
          <DropdownDivider />
          <DropdownItem on:click={() => handleTemplateSelection("Bug / Error Report")}>{$_("template_bug_report")}</DropdownItem>
        </Dropdown>
      </div>
    {/if}
    <h3 class="text-xl font-medium text-gray-900 dark:text-white">
      {$_("contact_form_title")}
    </h3>

    <div class="hidden">
      <Label>
        <span>{$_("contact_form_website")}</span>
        <Input name="website" type="text" tabindex="-1" autocomplete="off" />
      </Label>
    </div>

    <Label>
      <span>{$_("contact_form_name")}</span>
      <Input name="name" type="text" required disabled={submitting}>
        <UserSolid
          slot="left"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      </Input>
    </Label>

    <Label>
      <span>{$_("contact_form_company")}</span>
      <Input name="company" type="text" required disabled={submitting}>
        <BuildingSolid
          slot="left"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      </Input>
    </Label>

    <Label>
      <span>{$_("contact_form_email")}</span>
      <Input name="email" type="email" required disabled={submitting}>
        <EnvelopeSolid
          slot="left"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      </Input>
    </Label>

    <Label>
      <span>{$_("contact_form_phone")}</span>
      <Input name="phone" type="tel" disabled={submitting}>
        <PhoneSolid
          slot="left"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      </Input>
    </Label>

    <Label>
      <span>{$_("contact_form_inquiry")}</span>
      <Textarea name="inquiry" rows="3" required disabled={submitting} bind:value={inquiryText} />
    </Label>

    <Button type="submit" class="w-full" disabled={submitting}>
      {#if submitting}
        <span class="mr-2">{$_("contact_form_submitting")}</span>
      {:else}
        {$_("contact_form_submit")}
      {/if}
    </Button>
  </form>
{:else}
  <div class="flex flex-col items-center justify-center space-y-4">
    <CheckCircleSolid class="w-16 h-16 text-green-500" />
    <p class="text-xl font-medium text-gray-900 dark:text-white">
      {$_("contact_form_thank_you")}
    </p>
  </div>
{/if}