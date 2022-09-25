<script>
  let list = [
    { id: '1', name: 'Vihaan', age: 7 },
    { id: '2', name: 'Chandni', age: 34 },
    { id: '3', name: 'Vivek', age: 35 },
  ];
</script>

<div>
  <ul>
    {#each list as item (item.id)}
      <li>{item.name} - {item.age}</li>
    {:else}
      <p>No people to show</p>
    {/each}
  </ul>
</div>

<style>
  div {
    margin: 20px;
  }
  ul {
    display: flex;
    flex-direction: column;
    place-items: center;
  }
  li {
    min-width: 100px;
    text-align: start;
  }
</style>
