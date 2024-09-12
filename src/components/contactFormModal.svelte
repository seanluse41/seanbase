<script>
    import { Modal } from 'flowbite-svelte';
    import ContactForm from './contactForm.svelte';
    import { onMount } from 'svelte';
  
    export let open = false;
    let submitting = false;
    let submitted = false;
    let formStartTime;
  
    onMount(() => {
      formStartTime = Date.now();
    });
  
    function handleSubmitted() {
      setTimeout(() => {
        open = false;
        setTimeout(() => {
          submitted = false;
          submitting = false;
          formStartTime = Date.now();  // Reset timer for next opening
        }, 300);
      }, 2000);
    }
  </script>
  
  <Modal bind:open size="xs" autoclose={false} class="w-full">
    <ContactForm 
      bind:submitting 
      bind:submitted 
      on:submitted={handleSubmitted}
      isModal={true}
    />
  </Modal>