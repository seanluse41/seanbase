<script>
    import { Button, Modal, Label, Input } from 'flowbite-svelte';
    import { EnvelopeSolid, UserSolid, BuildingSolid, PhoneSolid } from 'flowbite-svelte-icons';
    import { _ } from 'svelte-i18n';
  
    export let open = false;
  
    function handleSubmit() {
      // Close the modal after form submission
      setTimeout(() => {
        open = false;
      }, 1000);
    }
  </script>
  
  <Modal bind:open size="xs" autoclose={false} class="w-full">
    <form 
      name="contact" 
      method="POST" 
      data-netlify="true" 
      netlify-honeypot="bot-field" 
      on:submit={handleSubmit} 
      class="flex flex-col space-y-6"
      netlify
    >
      <input type="hidden" name="form-name" value="contact" />
      <p class="hidden">
        <label>
          Don't fill this out if you're human: <input name="bot-field" />
        </label>
      </p>
  
      <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">{$_("contact_form_title")}</h3>
      
      <Label class="space-y-2">
        <span>{$_("contact_form_name")}</span>
        <Input name="name" type="text" required>
          <UserSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </Input>
      </Label>
  
      <Label class="space-y-2">
        <span>{$_("contact_form_company")}</span>
        <Input name="company" type="text" required>
          <BuildingSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </Input>
      </Label>
  
      <Label class="space-y-2">
        <span>{$_("contact_form_email")}</span>
        <Input name="email" type="email" required>
          <EnvelopeSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </Input>
      </Label>
  
      <Label class="space-y-2">
        <span>{$_("contact_form_phone")}</span>
        <Input name="phone" type="tel">
          <PhoneSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </Input>
      </Label>
  
      <Button type="submit" class="w-full">{$_("contact_form_submit")}</Button>
    </form>
  </Modal>