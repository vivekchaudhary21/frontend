<script>
  import Counter from './lib/Counter.svelte';
  import Button from './lib/Button.svelte';
  import Loops from './lib/Loops.svelte';
  import Conditional from './lib/Conditional.svelte';
  import Modal from './lib/Modal.svelte';

  //state
  let showModal = false;
  const toggleModal = () => {
    showModal = !showModal;
  };
</script>

<main id="app">
  <Modal {showModal} promo={true} on:click={toggleModal}>This is a modal</Modal>
  <div class="appDiv">
    <div class="header">
      <button on:click={toggleModal}>Show Modal</button>
      <Conditional loggedIn={false} />
    </div>
    <Counter />
    <Button />
    <Loops />
  </div>
</main>

<style>
  .header {
    display: flex;
    justify-content: space-around;
  }
  button {
    margin-bottom: 10px;
  }
</style>
