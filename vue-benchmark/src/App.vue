<template>
  <div>
    <h1>Benchmark Pemrosesan Batch</h1>
    <button @click="runBenchmark" :disabled="isBenchmarking">
      {{ isBenchmarking ? 'Sedang Menjalankan Benchmark...' : 'Mulai Benchmark' }}
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
          <tr v-for="item in data" :key="item.uniqueKey">
            <td>{{ item.id }}</td>
            <td>{{ item.nama }}</td>
            <td>{{ item.umur }}</td>
            <td>{{ item.ttl }}</td>
            <td>{{ item.alamat }}</td>
            <td>{{ item.nomor_hp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: [], // Menyimpan semua data yang akan ditampilkan
      isBenchmarking: false,
    };
  },
  methods: {
    async runBenchmark() {
      this.isBenchmarking = true;

      // Setiap kali batch selesai, data akan ditambahkan secara bertahap
      for (let i = 1; i <= 10; i++) {
        try {
          // Mengirimkan request ke backend untuk memproses batch
          const response = await axios.post('http://localhost:5000/benchmark', {
            batchNumber: i,
          });

          const { dataSample } = response.data;

          // Menambahkan data sample yang baru ke dalam data
          this.data.push(
            ...dataSample.map((item) => ({
              ...item,
              uniqueKey: `${i}-${item.id}`, // Membuat key unik untuk setiap item
            }))
          );
        } catch (error) {
          console.error('Error during benchmark:', error);
        }
      }

      this.isBenchmarking = false;
    },
  },
};
</script>

<style scoped>
/* Tambahkan style sesuai kebutuhan */
</style>
