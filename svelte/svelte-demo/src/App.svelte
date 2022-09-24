<script>
  let name = 'Vihaan';
  import Counter from './lib/Counter.svelte';

  const changeCase = () => {
    name = name.toUpperCase();
  };
</script>

<main id="app">
  <div class="card">
    <Counter />
    <button on:click={changeCase}>{name}</button>
  </div>
</main>
