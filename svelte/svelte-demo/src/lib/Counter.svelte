<script>
  let count = 0;
  const increment = () => {
    count += 1;
  };
  const decrement = () => {
    count -= 1;
  };
</script>

<button on:click={increment}> Inc </button>
<button>{count}</button>
<button on:click={decrement}> Dec </button>
