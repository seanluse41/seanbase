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
  let selectedTemplate = "Select a Template";
  let dropdownOpen = false;
  let inquiryText = "";

  const templateMessages = {
    "kGuide": "I'm interested in learning more about kGuide.",
    "tenKen Buddy": "I'd like information about tenKen Buddy.",
    "Custom Integration": "I'm looking for a custom integration solution.",
    "Bug / Error Report": "I'd like to report a bug or error.",
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

    // Check honeypot field
    if (formData.get("website")) {
      submitting = false;
      return;
    }

    // Check submission time
    const submissionTime = Date.now();
    const timeElapsed = submissionTime - formStartTime;
    if (timeElapsed < 3000) {
      // Less than 3 seconds
      submitting = false;
      return;
    }

    // Add submission time to form data
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
          {selectedTemplate}
          <ChevronDownOutline size="xl" class="ml-2 text-white" />
        </Button>
        <Dropdown bind:open={dropdownOpen}>
          <DropdownItem on:click={() => handleTemplateSelection("kGuide")}>kGuide</DropdownItem>
          <DropdownItem on:click={() => handleTemplateSelection("tenKen Buddy")}>tenKen Buddy</DropdownItem>
          <DropdownDivider />
          <DropdownItem on:click={() => handleTemplateSelection("Custom Integration")}>Custom Integration</DropdownItem>
          <DropdownDivider />
          <DropdownItem on:click={() => handleTemplateSelection("Bug / Error Report")}>Bug / Error Report</DropdownItem>
        </Dropdown>
      </div>
    {/if}
    <h3 class="text-xl font-medium text-gray-900 dark:text-white">
      {$_("contact_form_title")}
    </h3>

    <!-- Honeypot field -->
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