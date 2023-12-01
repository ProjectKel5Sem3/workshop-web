document.addEventListener('DOMContentLoaded', function () {
    // Mendapatkan ID transaksi dari parameter URL
    const urlParams = new URLSearchParams(window.location.search);
    const idTransaksi = urlParams.get('id');

    // URL API untuk rincian pesanan
    const apiUrl = 'http://localhost/a/github/workshop-web/website-shila/admin/pesanan/api_pesanan.php?action=rincian';
 
    // Fetch data dari API menggunakan ID transaksi
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'id=' + encodeURIComponent(idTransaksi),
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(rincian => {
                // Mengisi elemen-elemen pada halaman rincian_pesanan dengan data dari API
                const orderDetailCard = document.getElementById('order2');

                if (orderDetailCard) {

                    const numberPesanan = document.createElement('h3');
                    numberPesanan.textContent = 'Pesanan ' + rincian.id;
                    orderDetailCard.appendChild(numberPesanan);

                    // orderDetailCard.querySelector('h4#nama').textContent = rincian.nama;
                    const rincianUser0 = document.createElement('h4');
                    rincianUser0.textContent = 'Nama';
                    orderDetailCard.appendChild(rincianUser0);

                    const rincianUser = document.createElement('p');
                    rincianUser.classList.add('nama0')
                    rincianUser.textContent = rincian.nama;
                    orderDetailCard.appendChild(rincianUser);

                    // orderDetailCard.querySelector('h4#base-cake').textContent = rincian.base;
                    const rincianBase0 = document.createElement('h4');
                    rincianBase0.textContent = 'Base Cake';
                    orderDetailCard.appendChild(rincianBase0);

                    const rincianBase = document.createElement('p');
                    rincianBase.textContent = rincian.base;
                    orderDetailCard.appendChild(rincianBase);

                    // orderDetailCard.querySelector('h4#ukuran-cake').textContent = rincian.jenis + ' (' + rincian.ukuran + ')';
                    const rincianCake0 = document.createElement('h4');
                    rincianCake0.textContent = 'Ukuran Cake';
                    orderDetailCard.appendChild(rincianCake0);

                    const rincianCake = document.createElement('p');
                    rincianCake.textContent = rincian.jenis + ' (' + rincian.ukuran + ')';
                    orderDetailCard.appendChild(rincianCake);

                    // orderDetailCard.querySelector('h4#toping').textContent = rincian.toping;
                    const rincianToping0 = document.createElement('h4');
                    rincianToping0.textContent = 'Toping Cake';
                    orderDetailCard.appendChild(rincianToping0);

                    const rincianToping = document.createElement('p');
                    rincianToping.textContent = rincian.toping;
                    orderDetailCard.appendChild(rincianToping);

                    // orderDetailCard.querySelector('h4#keterangan').textContent = rincian.ket;
                    const rincinaKet0 = document.createElement('h4');
                    rincinaKet0.textContent = 'Keterangan';
                    orderDetailCard.appendChild(rincinaKet0);

                    const rincinaKet = document.createElement('p');
                    rincinaKet.textContent = rincian.ket;
                    orderDetailCard.appendChild(rincinaKet);

                    // orderDetailCard.querySelector('h4#waktu-pesanan').textContent = formatDate(rincian.waktu);
                    const rincianWaktu0 = document.createElement('h4');
                    rincianWaktu0.textContent = 'Waktu Pemesanan';
                    orderDetailCard.appendChild(rincianWaktu0);

                    const rincianWaktu = document.createElement('p');
                    rincianWaktu.textContent = formatDate(rincian.waktu);
                    orderDetailCard.appendChild(rincianWaktu);

                    // orderDetailCard.querySelector('h4#harga-total').textContent = 'Rp ' + formatCurrency(rincian.harga);
                    const rincianTotal0 = document.createElement('h4');
                    rincianTotal0.textContent = 'Haraga Total';
                    orderDetailCard.appendChild(rincianTotal0);

                    const rincianTotal = document.createElement('p');
                    rincianTotal.textContent = 'Rp ' + formatCurrency(rincian.harga);
                    orderDetailCard.appendChild(rincianTotal);

                    // orderDetailCard.querySelector('img#design-cake').src = '../img/' + rincian.pict;
                    const rincianDesain0 = document.createElement('h4');
                    rincianDesain0.textContent = 'Foto Desain Cake';
                    orderDetailCard.appendChild(rincianDesain0);

                    const rincianDesain = document.createElement('img');
                    rincianDesain.classList.add('pictDesain')
                    rincianDesain.src = '../img/' + rincian.pict;
                    orderDetailCard.appendChild(rincianDesain);

                    // orderDetailCard.querySelector('h4#status').textContent = getStatusLabel(rincian.status);
                    const rincianStatus0 = document.createElement('h4');
                    rincianStatus0.textContent = 'Status';
                    orderDetailCard.appendChild(rincianStatus0);
                    
                    const rincianStatus = document.createElement('p');
                    rincianStatus.classList.add('wait');
                    rincianStatus.textContent = rincian.status;
                    orderDetailCard.appendChild(rincianStatus);

                }
                

            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Tambahkan penanganan kesalahan jika diperlukan
        });
});

// Fungsi untuk mengubah format tanggal
function formatDate(dateTimeString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(dateTimeString).toLocaleDateString('id-ID', options);
    return formattedDate;
}

// Fungsi untuk mengubah format mata uang
function formatCurrency(amount) {
    const formattedAmount = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    return formattedAmount;
}

// Fungsi untuk mendapatkan label status berdasarkan status transaksi
// function getStatusLabel(status) {
//     switch (status) {
//         case 'menunggu konfirmasi':
//             return 'Menunggu Konfirmasi Admin';
//         case 'menunggu pembayaran':
//             return 'Menunggu Pembayaran';
//         // Tambahkan kasus status lain jika diperlukan
//         default:
//             return status;
//     }
// }