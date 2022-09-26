<script>
  import { v4 as uuidv4 } from 'uuid';

  let name = '';
  let age = '';
  let list = [
    { id: '1', name: 'Vihaan', age: 7 },
    { id: '2', name: 'Chandni', age: 34 },
    { id: '3', name: 'Vivek', age: 35 },
  ];

  const handleSubmit = () => {
    if (name === '' || age === '') {
      return;
    }
    if (isNaN(Number(age))) {
      return;
    }
    const item = {
      name,
      age: Number(age),
      id: uuidv4(),
    };

    list.push(item);
    list = list;
    name = '';
    age = '';
  };

  const handleDelete = (id) => {
    list = list.filter((item) => item.id !== id);
  };
</script>

<div>
  <input type="text" placeholder="Enter Name" bind:value={name} />
  <input type="text" placeholder="Enter Age" bind:value={age} />
  <button type="submit" on:click={handleSubmit}>Submit</button>

  <ul>
    {#each list as item (item.id)}
      <li>
        {item.name} - {item.age}
        <p on:click={() => handleDelete(item.id)}>Delete</p>
      </li>
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
  p {
    display: inline-block;
    text-decoration: underline;
  }
</style>
