<script>
  export let showModal;
  export let promo = false;
</script>

{#if showModal}
  <div class="backdrop" on:click|self>
    <div class="modal" class:promo>
      <!-- Slot acts as a children -->
      <slot />
    </div>
  </div>
{/if}

<style>
  .backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
  }
  .modal {
    border: 1px solid black;
    height: 500px;
    width: 500px;
    background-color: white;
    display: flex;
    place-content: center;
    place-items: center;
    border-radius: 10px;
  }

  .promo {
    background-color: crimson;
    color: white;
  }
</style>
