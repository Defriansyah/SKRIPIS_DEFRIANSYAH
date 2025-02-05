<script>
  import { onMount } from 'svelte';
  let data = []; // Menyimpan semua data yang akan ditampilkan
  let isBenchmarking = false;

  const runBenchmark = async () => {
    isBenchmarking = true;

    // Setiap kali batch selesai, data akan ditambahkan secara bertahap
    for (let i = 1; i <= 10; i++) {
      try {
        // Mengirimkan request ke backend untuk memproses batch
        const response = await fetch('http://localhost:5000/benchmark', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ batchNumber: i }),
        });

        const { dataSample } = await response.json();

        // Menambahkan data sample yang baru ke dalam state
        data = [
          ...data,
          ...dataSample.map((item) => ({
            ...item,
            uniqueKey: `${i}-${item.id}`, // Membuat key unik untuk setiap item
          })),
        ];
      } catch (error) {
        console.error('Error during benchmark:', error);
      }
    }

    isBenchmarking = false;
  };
</script>

<main>
  <h1>Benchmark Pemrosesan Batch</h1>
  <button on:click={runBenchmark} disabled={isBenchmarking}>
    {isBenchmarking ? 'Sedang Menjalankan Benchmark...' : 'Mulai Benchmark'}
  </button>

  <div>
    <h2>Data Hasil Benchmark</h2>
    <table border="1" style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Umur</th>
          <th>TTL</th>
          <th>Alamat</th>
          <th>Nomor HP</th>
        </tr>
      </thead>
      <tbody>
        {#each data as item}
          <tr key={item.uniqueKey}>
            <td>{item.id}</td>
            <td>{item.nama}</td>
            <td>{item.umur}</td>
            <td>{item.ttl}</td>
            <td>{item.alamat}</td>
            <td>{item.nomor_hp}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
  table, th, td {
    border: 1px solid black;
  }
  th, td {
    padding: 8px;
    text-align: left;
  }
  button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 16px;
  }
</style>
