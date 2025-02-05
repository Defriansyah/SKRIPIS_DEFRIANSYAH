const express = require('express');
const cors = require('cors');
const { performance } = require('perf_hooks');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Middleware untuk parsing JSON request body

// Variabel untuk menyimpan data kumulatif
let cumulativeData = [];

// Fungsi untuk membuat data acak dengan struktur yang diinginkan
const generateData = (numItems, startIndex) => {
    const data = [];
    for (let i = 0; i < numItems; i++) {
        data.push({
            id: startIndex + i, // Memastikan ID bersifat unik dan bertambah
            nama: `Nama ${startIndex + i}`,
            umur: Math.floor(Math.random() * 100) + 1, // Umur antara 1-100
            ttl: `2000-01-${Math.floor(Math.random() * 28) + 1}`, // Tanggal lahir acak
            alamat: `Alamat ${startIndex + i}, Kota ABC, Negara XYZ`,
            nomor_hp: `08${Math.floor(Math.random() * 900000000) + 100000000}`, // Nomor HP acak
        });
    }
    return data;
};

// Endpoint untuk mensimulasikan proses batch
app.post('/benchmark', (req, res) => {
    try {
        const startTime = performance.now();

        // Mendapatkan batch number dari request body
        const { batchNumber } = req.body;

        if (!batchNumber || typeof batchNumber !== 'number') {
            return res.status(400).json({ error: 'batchNumber harus berupa angka dan tidak boleh kosong.' });
        }

        // Set dataLength selalu 100 per batch
        const dataLength = 100;

        // Start index untuk data baru yang akan ditambahkan
        const startIndex = cumulativeData.length + 1;

        // Simulasi pengambilan dan pemrosesan data baru
        const newData = generateData(dataLength, startIndex);

        // Menambahkan data baru ke data kumulatif
        cumulativeData.push(...newData);

        console.log(`\nMemproses Batch ${batchNumber} dengan ${newData.length} item data baru.`);
        console.log(`Total data kumulatif setelah batch ${batchNumber}: ${cumulativeData.length}`);

        // Simulasi keterlambatan pemrosesan
        setTimeout(() => {
            const endTime = performance.now();
            const executionTime = endTime - startTime;

            // Mengukur memori setelah pemrosesan
            const memoryAfterRequest = process.memoryUsage().heapUsed;

            // Menghitung memori yang digunakan oleh heap (dalam MB)
            const memoryUsageAfter = memoryAfterRequest / 1024 / 1024; // Dalam MB

            // Log hasil benchmark ke console
            console.log(`\n===== Hasil Benchmark Batch ${batchNumber} =====`);
            console.log(`Waktu Eksekusi: ${executionTime.toFixed(2)} ms`);
            console.log(`Penggunaan Memori: ${memoryUsageAfter.toFixed(2)} MB`);
            console.log(`Total Data yang Diproses: ${cumulativeData.length}`);
            console.log(`Panjang Data pada Batch Ini: ${dataLength}`);
            console.log(`Data Sample (5 item pertama):`, cumulativeData.slice(0, 5));

            // Mengirimkan respons kepada frontend
            res.json({
                message: `Batch ${batchNumber} berhasil diproses`,
                executionTime,
                memoryUsageAfter, // Memori setelah batch
                totalData: cumulativeData.length, // Total jumlah data
                dataLength, // Panjang data pada batch ini
                dataSample: cumulativeData.slice(0, 5), // Contoh data
            });
        }, Math.random() * 2000 + 500); // Simulasi keterlambatan acak antara 500ms hingga 2.5s
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
});

// Menjalankan server backend
app.listen(port, () => {
    console.log(`Server backend berjalan di http://localhost:${port}`);
});
