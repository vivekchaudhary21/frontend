<script>
  import Counter from './lib/Counter.svelte';
  import Button from './lib/Button.svelte';
  import Loops from './lib/Loops.svelte';
  import Conditional from './lib/Conditional.svelte';
</script>

<main id="app">
  <div class="card">
    <Conditional loggedIn={false} />
    <Counter />
    <Button />
    <Loops />
  </div>
</main>
