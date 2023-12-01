fetch('http://localhost/a/github/workshop-web/website-shila/admin/laporan/api_laporan.php')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('tabel-laporan');

        data.forEach((transaction, index) => {
            const row = document.createElement('tr');

            // Mengubah nilai tanggal menjadi format tanggal lokal
            const rawDate = new Date(transaction.tanggalpesan);
            const formattedDate = `${rawDate.getDate().toString().padStart(2, '0')}-${(rawDate.getMonth() + 1).toString().padStart(2, '0')}-${rawDate.getFullYear()}`;


            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${transaction.nama}</td>
                <td>${transaction.ukuran}</td>
                <td>${formattedDate}</td>
                <td>${transaction.hargatotal}</td>
                <td>${transaction.status}</td>
            `;
            tableBody.appendChild(row);
        });
    })
.catch(error => console.error('Error fetching data:', error));



    // Fungsi untuk membuat dan mengunduh file CSV
    function unduhCSV() {
        const table = document.getElementById('tabel-laporan'); // Sesuaikan dengan ID tabel Anda
        const rows = table.querySelectorAll('tr');

        // Header
        let csvContent = 'Nama Pembeli,Ukuran Cake,Tanggal Pesan,Total Harga,Status\n';

        // Data
        rows.forEach(row => {
            const columns = row.querySelectorAll('td');
            columns.forEach((column, index) => {
                csvContent += index === columns.length - 1 ? column.textContent + '\n' : column.textContent + ',';
            });
        });

        // Buat Blob dari konten CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });

        // Buat tautan untuk mengunduh file CSV
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'laporan.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Menambahkan event listener untuk tombol "Unduh Report"
    document.getElementById('unduhButton').addEventListener('click', unduhCSV);


    