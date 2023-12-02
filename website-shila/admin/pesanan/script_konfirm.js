document.addEventListener('DOMContentLoaded', function () {

    // Mendapatkan ID transaksi dari parameter URL
    const urlParams = new URLSearchParams(window.location.search);
    const idTransaksi = urlParams.get('id');

    // Fetch data from the API
    const apiUrl = 'http://localhost/a/github/workshop-web/website-shila/admin/pesanan/api_pesanan.php?action=rincian';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'id=' + encodeURIComponent(idTransaksi),
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(konfirm => {

            // Update the content of the 'numberPesan' cell
            document.getElementById('numberPesan').textContent = 'Pesanan ' + konfirm.id;

            // Update the content of the 'nama1' cell
            document.getElementById('nama1').textContent = konfirm.nama;

            // Update the content of the 'base1' cell
            document.getElementById('base1').textContent = konfirm.base;

            // Update the content of the 'ukuran1' cell
            document.getElementById('ukuran1').textContent = konfirm.jenis + ' (' + konfirm.ukuran + ')';

            // Update the content of the 'toping1' cell
            document.getElementById('toping1').textContent = konfirm.toping;

            // Update the content of the 'ket1' cell
            document.getElementById('ket1').textContent = konfirm.ket;

            // Update the content of the 'tanggal1' cell
            document.getElementById('tanggal1').textContent = formatDate(konfirm.waktu);

            // Update the content of the 'subT1' cell
            const formattedSubTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(konfirm.subtotal);
            document.getElementById('subT1').textContent = formattedSubTotal;

            // Update the content of the 'total1' cell
            const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(konfirm.harga);
            document.getElementById('total1').textContent = formattedTotal;

            // Update the content of the 'imgPict' cell
            document.getElementById('imgPict').src = '../img/' + konfirm.pict;

        });
    })
    .catch(error => console.error('Error fetching data:', error));
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


// document.addEventListener('DOMContentLoaded', function () {
// konfirmasi
    const confirmationPopup = document.querySelector(".confirmation-popup");
    const overlayConfirmation = document.querySelector(".confirmation-popup .overlay");
    const closeBtnConfirmation = document.querySelector(".confirmation-popup .close-btn");

    function showConfirmationPopup() {
    confirmationPopup.classList.add("active");
    }

    function closeConfirmationPopup() {
    confirmationPopup.classList.remove("active");
    }

    // Mendapatkan ID transaksi dari parameter URL
    const urlParams = new URLSearchParams(window.location.search);
    const idTransaksi = urlParams.get('id');

    async function konfirmasiPesanan() {
    const hargaInput = document.getElementById("hargaInput").value;

    // cek apakah data kosong
    if (hargaInput === "") {
        alert("Data tidak boleh kosong...!!");
        return;
    }

    if (confirm("Apakah Anda yakin ingin mengkonfirmasi pesanan dengan harga: " + hargaInput + "?")) {
        try {
        const response = await fetch('http://localhost/a/github/workshop-web/website-shila/admin/pesanan/api_pesanan.php?action=konfirm', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id=' + encodeURIComponent(idTransaksi) + '&total=' + encodeURIComponent(hargaInput),
        });

        if (!response.ok) {
            throw new Error('Error confirming order');
        }

        const data = await response.json();
        alert(data.message);
        window.location.href = "rincian_pesanan1.html?id=" +  + idTransaksi;
        } catch (error) {
        console.error('Error:', error);
        alert('Failed to confirm order.');
        }
    } else {
        alert("Konfirmasi pesanan dibatalkan!");
    }

    closeConfirmationPopup();
    }

// });