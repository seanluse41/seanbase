<script>
    import { Button, Modal, Label, Input } from 'flowbite-svelte';
    import { EnvelopeSolid, UserSolid, BuildingSolid, PhoneSolid, CheckCircleSolid } from 'flowbite-svelte-icons';
    import { _ } from 'svelte-i18n';
    import { onMount } from 'svelte';
  
    export let open = false;
    let submitting = false;
    let submitted = false;
    let formStartTime;
  
    onMount(() => {
      formStartTime = Date.now();
    });
  
    async function handleSubmit(event) {
      event.preventDefault();
      submitting = true;
  
      const formData = new FormData(event.target);
      
      // Check honeypot field
      if (formData.get('website')) {
        submitting = false;
        return;
      }
  
      // Check submission time
      const submissionTime = Date.now();
      const timeElapsed = submissionTime - formStartTime;
      if (timeElapsed < 3000) {  // Less than 3 seconds
        submitting = false;
        return;
      }
  
      // Add submission time to form data
      formData.append('submissionTime', submissionTime.toString());
  
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
          submitted = true;
          setTimeout(() => {
            open = false;
            setTimeout(() => {
              submitted = false;
              submitting = false;
              formStartTime = Date.now();  // Reset timer for next opening
            }, 300);
          }, 2000);
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert($_('contact_form_error'));
      } finally {
        submitting = false;
      }
    }
  </script>
  
  <Modal bind:open size="xs" autoclose={false} class="w-full">
    {#if !submitted}
      <form 
        name="contact" 
        method="POST" 
        on:submit={handleSubmit} 
        class="flex flex-col space-y-6"
      >
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">{$_("contact_form_title")}</h3>
        
        <!-- Honeypot field -->
        <div class="hidden">
          <Label>
            <span>{$_("contact_form_website")}</span>
            <Input name="website" type="text" tabindex="-1" autocomplete="off" />
          </Label>
        </div>
        
        <Label class="space-y-2">
          <span>{$_("contact_form_name")}</span>
          <Input name="name" type="text" required disabled={submitting}>
            <UserSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </Input>
        </Label>
  
        <Label class="space-y-2">
          <span>{$_("contact_form_company")}</span>
          <Input name="company" type="text" required disabled={submitting}>
            <BuildingSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </Input>
        </Label>
  
        <Label class="space-y-2">
          <span>{$_("contact_form_email")}</span>
          <Input name="email" type="email" required disabled={submitting}>
            <EnvelopeSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </Input>
        </Label>
  
        <Label class="space-y-2">
          <span>{$_("contact_form_phone")}</span>
          <Input name="phone" type="tel" disabled={submitting}>
            <PhoneSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </Input>
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
        <p class="text-xl font-medium text-gray-900 dark:text-white">{$_("contact_form_thank_you")}</p>
      </div>
    {/if}
  </Modal>