<script>
  export let data = [];

  const handleRowClick = (id) => {
    console.log(`Selected Row ID: ${id}`);
  };
</script>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    {#each data as row}
      <tr on:click={() => handleRowClick(row.id)}>
        <td>{row.id}</td>
        <td>{row.name}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  tr:hover {
    background-color: #f1f1f1;
  }
  button {
    padding: 5px 10px;
    cursor: pointer;
  }
</style>
