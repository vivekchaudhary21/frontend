<script>
  let fname = 'Vihaan';
  let lname = 'Bhakra';
  let color = 'white';

  // Code will run everytime values changes inside them
  // Reactive Variables
  $: fullname = `${fname} ${lname}`;
  // Reactive Statements
  $: {
    console.log(color);
  }

  const changeCase = () => {
    fullname = fullname.toUpperCase();
  };
  const changeHandler = (e) => {
    fullname = e.target.value;
  };
</script>

<div>
  <button style="color: {color}; min-width:200px" on:click={changeCase}
    >{fullname}</button
  >
  <input on:input={changeHandler} value={fullname} />
  <!-- bind:value={} does same thing we did on input on:input={} value={} -->
  <input type="text" bind:value={color} placeholder="Please enter a color" />
</div>

<style>
  input {
    padding: 18px;
    border-radius: 5px;
  }
  div {
    margin-bottom: 20px;
  }
</style>
