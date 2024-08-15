<script>
    import { fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
  
    export let src = '';
    export let alt = '';
    export let title = '';
  
    let enlarged = false;
    const dispatch = createEventDispatcher();
  
    function toggleEnlarged() {
      enlarged = !enlarged;
      dispatch('toggle', { enlarged });
    }
  
    function handleKeydown(event) {
      if (event.key === 'Escape' && enlarged) {
        toggleEnlarged();
      }
    }
  </script>
  
  <svelte:window on:keydown={handleKeydown}/>
  
  <div class="image-container">
    <img
      {src}
      {alt}
      {title}
      class="thumbnail"
      on:click={toggleEnlarged}
      on:keypress={(e) => e.key === 'Enter' && toggleEnlarged()}
      tabindex="0"
      role="button"
      aria-label="Click to enlarge image"
    />
    
    {#if enlarged}
      <div
        class="overlay"
        on:click={toggleEnlarged}
        transition:fade={{ duration: 200 }}
      >
        <div class="enlarged-image-container">
          <img {src} {alt} class="enlarged-image" />
          <button class="close-button" on:click={toggleEnlarged}>×</button>
        </div>
      </div>
    {/if}
  </div>
  
  <style>
    .image-container {
      display: inline-block;
      position: relative;
    }
  
    .thumbnail {
      cursor: pointer;
      transition: opacity 0.3s ease;
    }
  
    .thumbnail:hover {
      opacity: 0.8;
    }
  
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
  
    .enlarged-image-container {
      position: relative;
      max-width: 90%;
      max-height: 90%;
    }
  
    .enlarged-image {
      max-width: 100%;
      max-height: 90vh;
      object-fit: contain;
    }
  
    .close-button {
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 30px;
      cursor: pointer;
    }
  </style>