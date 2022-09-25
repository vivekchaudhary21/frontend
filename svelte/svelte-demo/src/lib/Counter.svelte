<script>
  let count = 0;
  const increment = () => {
    count += 1;
  };
  const decrement = () => {
    count -= 1;
  };
</script>

<div>
  <button on:click={increment}> Inc </button>
  <button>{count}</button>
  <button on:click={decrement}> Dec </button>
  <button
    on:click={() => {
      count = 0;
    }}>Reset</button
  >
</div>

<style>
  div {
    margin-bottom: 20px;
  }
</style>
