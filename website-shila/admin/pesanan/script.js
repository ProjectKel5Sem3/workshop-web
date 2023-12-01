document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('http://localhost/a/github/workshop-web/website-shila/admin/pesanan/api_pesanan.php?action=transaksi');
        const data = await response.json();

        const orderContainer = document.getElementById("order");

        // Check if data is empty
        if (data.length === 0) {
            orderContainer.innerHTML = '<p>Data pesanan kosong</p>';
        } else {
            data.forEach((transaksi, index) => {
                const orderCard = document.createElement('div');
                orderCard.classList.add('order-card');
                orderCard.id = 'order' + (index + 1);

                const orderTitle = document.createElement('h3');
                orderTitle.textContent = 'Pesanan ' + transaksi.id_transaksi;
                orderCard.appendChild(orderTitle);

                const orderDate = document.createElement('h4');
                orderDate.textContent = 'Waktu Pesanan';
                orderCard.appendChild(orderDate);

                const orderDateValue = document.createElement('p');
                // Konversi format tanggal dari string ke objek Date
                const transactionDate = new Date(transaksi.waktu);
                // Array untuk menyimpan nama-nama bulan
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                // Format tanggal sesuai dengan format yang diinginkan
                const formattedDate = `${transactionDate.getDate()} ${monthNames[transactionDate.getMonth()]} ${transactionDate.getFullYear()}`;
                orderDateValue.textContent = formattedDate;
                orderCard.appendChild(orderDateValue);


                const orderTotal = document.createElement('h4');
                orderTotal.textContent = 'Harga Total';
                orderCard.appendChild(orderTotal);

                const orderTotalValue = document.createElement('p');
                const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaksi.total);
                orderTotalValue.textContent = formattedTotal;
                orderCard.appendChild(orderTotalValue);

                const orderStatus = document.createElement('h4');
                orderStatus.textContent = 'Status';
                orderCard.appendChild(orderStatus);

                const orderStatusValue = document.createElement('p');
                orderStatusValue.textContent = transaksi.status;
                orderCard.appendChild(orderStatusValue);

                switch (transaksi.status) {
                    case 'Menunggu konfirmasi':
                        const rincianLink1 = document.createElement('a');
                        rincianLink1.href = 'rincian_pesanan1.html';
                        rincianLink1.classList.add('btn-rincian');
                        rincianLink1.textContent = 'Rincian Pesanan';
                        orderCard.appendChild(rincianLink1);
                
                        const konfirmasiLink = document.createElement('a');
                        konfirmasiLink.href = 'konfirmasi_pesanan1.html';
                        konfirmasiLink.classList.add('btn-konfirmasi');
                        konfirmasiLink.textContent = 'Konfirmasi';
                        orderCard.appendChild(konfirmasiLink);

                        break;

                    case 'menunggu pembayaran':
                        const rincianLink2 = document.createElement('a');
                        rincianLink2.href = 'rincian_pesanan1.html';
                        rincianLink2.classList.add('btn-rincian');
                        rincianLink2.textContent = 'Rincian Pesanan';
                        orderCard.appendChild(rincianLink2);
                        break;

                    default:
                        // Penanganan default jika diperlukan
                        break;
                }

                // Add orderCard to container
                orderContainer.appendChild(orderCard);
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch order data.');
    }
});
