
document.addEventListener("DOMContentLoaded", function () {
    const statusFilter = document.getElementById("statusFilter");
    const timeFilter = document.getElementById("timeFilter");
    const tableBody = document.getElementById("tabel-laporan");
    const spinnerContainer = document.getElementById("spinnerContainer");

    // Event listeners for filter changes
    statusFilter.addEventListener("change", applyFilters);
    timeFilter.addEventListener("change", applyFilters);

    // Fetch data and populate the table
    fetchDataAndPopulateTable();

    function fetchDataAndPopulateTable() {
        // Show spinner while fetching data
        showSpinner();

        // Fetch data from the API
        fetch("http://localhost/a/github/workshop-web/website-shila/admin/laporan/api_laporan.php")
            .then(response => response.json())
            .then(data => {
                // Hide spinner after data is fetched
                hideSpinner();

                // Populate the table with the fetched data
                populateTable(data);

                // hitung total pendapatan
                const totalPendapatan = calculateTotalPendapatan(data);
                const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPendapatan);
                document.getElementById('total1').textContent = formattedTotal;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Hide spinner in case of an error
                hideSpinner();
            });
    }

    // Function to calculate total pendapatan from the fetched data
    function calculateTotalPendapatan(data) {
        return data.reduce((sum, item) => {
            return sum + ((item.status === 'selesai' || item.status === 'kue dibuat') ? parseInt(item.hargatotal) : 0);
        }, 0);
    }

    // Fungsi untuk mengubah format mata uang
    function formatCurrency(amount) {
        const formattedAmount = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
        return formattedAmount;
    }

    //mengambil data untuk tabel laporan
    function populateTable(data) {
        // Clear existing rows in the table
        tableBody.innerHTML = "";

        // Iterate through the data and create table rows
        data.forEach((transaction, index) => {
            const row = document.createElement("tr");

            // Convert date format
            // const rawDate = new Date(transaction.tanggalpesan);
            // const formattedDate = `${rawDate.getDate().toString().padStart(2, '0')}-${(rawDate.getMonth() + 1).toString().padStart(2, '0')}-${rawDate.getFullYear()}`;

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${transaction.nama}</td>
                <td>${transaction.alamat}</td>
                <td>${transaction.telp}</td>
                <td>${transaction.ukuran}</td>
                <td>${transaction.tanggalpesan}</td>
                <td>${transaction.hargatotal}</td>
                <td>${transaction.status}</td>
            `;

            // Append the row to the table
            tableBody.appendChild(row);
        });

        // Apply filters
        applyFilters();
    }

    // filter
    function applyFilters() {
        const selectedStatus = statusFilter.value.toLowerCase();
        const selectedTimeFilter = timeFilter.value.toLowerCase();

        // Show spinner while applying filters
        showSpinner();

        // Get all rows in the table
        const rows = tableBody.querySelectorAll("tr");

        // Loop through each row and toggle its visibility based on the selected status and time filter
        rows.forEach(row => {
            const statusCell = row.querySelector("td:nth-child(6)"); // Assuming status is in the 6th column
            const dateCell = row.querySelector("td:nth-child(4)"); // Assuming date is in the 4th column

            const rowStatus = statusCell.textContent.toLowerCase();
            const rowDate = new Date(dateCell.textContent);

            const statusFilterMatch = selectedStatus === "all" || rowStatus === selectedStatus;
            const timeFilterMatch = applyTimeFilter(rowDate, selectedTimeFilter);

            console.log(`Row Date: ${rowDate}, Status: ${rowStatus}, Status Filter: ${statusFilterMatch}, Time Filter: ${timeFilterMatch}`);

            if (statusFilterMatch && timeFilterMatch) {
                // Show the row if it matches the selected status and time filter
                row.style.display = "table-row";
            } else {
                // Hide the row if it doesn't match the selected status or time filter
                row.style.display = "none";
            }
        });

        // Hide spinner after applying filters
        hideSpinner();
    }

    function applyTimeFilter(date, selectedTimeFilter) {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        
        switch (selectedTimeFilter) {
            case "1 bulan":
                return date >= startOfMonth && date <= now;
            case "1 minggu":
                return date >= startOfLastWeek && date <= now;
            case "all":
                return true;
            default:
                return false;
        }
    }

    
    

    function showSpinner() {
        spinnerContainer.style.display = "block";
    }

    function hideSpinner() {
        spinnerContainer.style.display = "none";
    }
});



// unduh csv

// var btnXsl = document.getElementById('unduhButton');
// btnXsl.onclick = () => exportData('Xlsx')

// function exportData(type) {
//     const fileName = 'exported-sheet.' + type;

//     // Fetch data from the API
//     fetch("http://localhost/a/github/workshop-web/website-shila/admin/laporan/api_laporan.php")
//         .then(response => response.json())
//         .then(data => {
//             const ws = XLSX.utils.json_to_sheet(data);

//             // Custom header
//             XLSX.utils.sheet_add_aoa(ws, [
//                 ["Id", "Nama", "Alamat", "Telepon", "Ukuran", "Tanggal Pesan", "Total Harga", "Status"]
//             ], { origin: "A1" });

//             XLSX.utils.sheet_add_aoa(ws, [
//                 ["Total Pendapatan"]
//             ], { origin: "A1" });

//             const wb = XLSX.utils.book_new();
//             XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

//             // Save the workbook
//             XLSX.writeFile(wb, fileName);
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }

var btnXsl = document.getElementById('unduhButton');
btnXsl.onclick = () => exportData('Xlsx')

function exportData(type) {
    const fileName = 'exported-sheet.' + type;

    // Fetch data from the API
    fetch("http://localhost/a/github/workshop-web/website-shila/admin/laporan/api_laporan.php")
        .then(response => response.json())
        .then(data => {
            const ws = XLSX.utils.json_to_sheet(data);

            // Custom header
            XLSX.utils.sheet_add_aoa(ws, [
                ["No", "Nama", "Alamat", "Telepon", "Ukuran", "Tanggal Pesan", "Total Harga", "Status"]
            ], { origin: "A1" });

            // Add data rows
            const startingRow = 1; // Start from row 2 to leave space for the header
            for (let i = 0; i < data.length; i++) {
                data[i].index = i + 1;
            }
            for (let i = 0; i < data.length; i++) {
                const rowData = [
                    data[i].index,
                    data[i].nama,
                    data[i].alamat,
                    data[i].telp,
                    data[i].ukuran,
                    data[i].tanggalpesan,
                    data[i].hargatotal,
                    data[i].status
                ];
                XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: { r: startingRow + i, c: 0 } });
            }

            // Calculate and add total income
            const totalPendapatan = calculateTotalPendapatan(data);
            XLSX.utils.sheet_add_aoa(ws, [["", "", "", "", "", "", "Total Pendapatan", totalPendapatan]], { origin: { r: startingRow + data.length + 1, c: 0 } });

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

            // Save the workbook
            XLSX.writeFile(wb, fileName);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to calculate total pendapatan from the fetched data
function calculateTotalPendapatan(data) {
    return data.reduce((sum, item) => {
        return sum + ((item.status === 'selesai' || item.status === 'kue dibuat') ? parseInt(item.hargatotal) : 0);
    }, 0);
}

