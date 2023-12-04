document.addEventListener('DOMContentLoaded', async function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const idTransaksi = urlParams.get('id');
        const apiUrl = `http://localhost/a/github/workshop-web/website-shila/admin/pesanan/api_pesanan.php?action=rincian&id=${encodeURIComponent(idTransaksi)}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id=' + encodeURIComponent(idTransaksi),
        });

        if (!response.ok) {
            throw new Error('Gagal mengambil data pesanan.');
        }

        const data = await response.json();
        data.forEach(rincian => {
            const orderDetailCard = document.getElementById('order2');

            if (orderDetailCard) {
                const {
                    id, nama, base, jenis, ukuran, toping, ket, waktu, harga, pict, status
                } = rincian;

                const createAndAppendElement = (tag, textContent, className) => {
                    const element = document.createElement(tag);
                    if (textContent) element.textContent = textContent;
                    if (className) element.classList.add(className);
                    return element;
                };
                

                orderDetailCard.append(
                    createAndAppendElement('h3', `Pesanan ${id}`),
                    createAndAppendElement('h4', 'Nama  : ', 'nama0'),
                    createAndAppendElement('p', nama, 'nama0'),
                    createAndAppendElement('h4', 'Base Cake'),
                    createAndAppendElement('p', base),
                    createAndAppendElement('h4', 'Ukuran Cake'),
                    createAndAppendElement('p', `${jenis} (${ukuran})`),
                    createAndAppendElement('h4', 'Toping Cake'),
                    createAndAppendElement('p', toping),
                    createAndAppendElement('h4', 'Keterangan'),
                    createAndAppendElement('p', ket),
                    createAndAppendElement('h4', 'Waktu Pemesanan'),
                    createAndAppendElement('p', formatDate(waktu)),
                    createAndAppendElement('h4', 'Haraga Total'),
                    createAndAppendElement('p', `${formatCurrency(harga)}`),
                    createAndAppendElement('h4', 'Foto Desain Cake'),
                    createImageElement(`../img/${pict}`, 'pictDesain'),
                    createAndAppendElement('h4', 'Status'),
                    createAndAppendElement('p', status, 'wait'),
                );

                const spinnerContainer = document.createElement('div');
                spinnerContainer.classList.add('spinner-container');

                const ubahStatus0 = createAndAppendElement('h4', 'Ubah Status');
                const spinner = document.createElement('select');
                spinner.classList.add('spinner');

                const options = ['','kue dibuat', 'selesai'];
                options.forEach((option) => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option;
                    optionElement.textContent = option;
                    spinner.appendChild(optionElement);
                });

                spinner.addEventListener('change', (event) => {
                    const selectedStatus = event.target.value;
                    ubahStatusPesanan(selectedStatus);
                });

                spinnerContainer.append(ubahStatus0, spinner);
                orderDetailCard.appendChild(spinnerContainer);

                spinnerContainer.style.display = (status === 'selesai' || status === 'Menunggu konfirmasi') ? 'none' : 'block';

                async function ubahStatusPesanan(status) {
                    try {
                        const apiUrl = 'http://localhost/a/github/workshop-web/website-shila/admin/pesanan/api_pesanan.php?action=ubahStatus';

                        const response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `id_transaksi=${encodeURIComponent(idTransaksi)}&status=${encodeURIComponent(status)}`,
                        });

                        if (!response.ok) {
                            throw new Error('Gagal mengubah status pesanan.');
                        }

                        const responseData = await response.json();
                        console.log('Status pesanan berhasil diubah:', responseData);

                        // Refresh halaman setelah berhasil mengubah status
                        location.reload(true); // Jika parameter true diberikan, maka akan melakukan reload dari server, bukan dari cache.

                    } catch (error) {
                        console.error('Terjadi kesalahan:', error.message);
                    }
                }
            }
        });
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
    }
});

// Fungsi untuk mengubah status pesanan melalui API




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