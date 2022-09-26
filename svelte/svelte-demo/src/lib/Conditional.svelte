<script>
  export let loggedIn;

  const handleLogin = () => {
    loggedIn = loggedIn ? false : true;
  };
</script>

<div>
  <button on:click={handleLogin}>
    {#if loggedIn}Log OUT{:else}Log IN{/if}
  </button>
</div>

<style>
  button {
    margin-bottom: 10px;
  }
</style>
