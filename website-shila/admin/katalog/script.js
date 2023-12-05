fetch('http://localhost/a/github/workshop-web/website-shila/admin/katalog/api_katalog.php?action=baseCake')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('dataBaseCake');

        data.forEach((transaction, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${transaction.basecake}</td>
                <td><img src="../img/${transaction.gambar_basecake}" style="height: 200px;"></td>
            `;
            tableBody.appendChild(row);
        });
    })
.catch(error => console.error('Error fetching data:', error));

fetch('http://localhost/a/github/workshop-web/website-shila/admin/katalog/api_katalog.php?action=ukuranCake')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('dataUkuranCake');

        data.forEach((transaction, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${transaction.ukuran}</td>
                <td>${transaction.jenis}</td>
            `;
            tableBody.appendChild(row);
        });
    })
.catch(error => console.error('Error fetching data:', error));

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost/a/github/workshop-web/website-shila/admin/katalog/api_katalog.php?action=priceList')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('dataPriceList');
            const searchInput = document.getElementById('cari1');

            // Initial rendering of the table
            renderTable(data);

            // Add event listener for input change
            searchInput.addEventListener('input', function() {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredData = data.filter(item =>
                    item.ukuran.toLowerCase().includes(searchTerm) ||
                    item.jenis.toLowerCase().includes(searchTerm) ||
                    item.basecake.toLowerCase().includes(searchTerm) ||
                    item.harga.toLowerCase().includes(searchTerm)
                );

                // Re-render the table with filtered data
                renderTable(filteredData);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    function renderTable(data) {
        const tableBody = document.getElementById('dataPriceList');
        tableBody.innerHTML = ''; // Clear existing rows

        data.forEach((transaction, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${transaction.ukuran}</td>
                <td>${transaction.jenis}</td>
                <td>${transaction.basecake}</td>
                <td>${transaction.harga}</td>
            `;
            tableBody.appendChild(row);
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost/a/github/workshop-web/website-shila/admin/katalog/api_katalog.php?action=priceToping')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('dataPriceToping');
            const searchInput = document.getElementById('cari2');

            // Initial rendering of the table
            renderTable(data);

            // Add event listener for input change
            searchInput.addEventListener('input', function() {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredData = data.filter(item =>
                    item.topping.toLowerCase().includes(searchTerm) ||
                    item.harga.toLowerCase().includes(searchTerm)
                );

                // Re-render the table with filtered data
                renderTable(filteredData);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    function renderTable(data) {
        const tableBody = document.getElementById('dataPriceToping');
        tableBody.innerHTML = ''; // Clear existing rows

        data.forEach((transaction, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${transaction.topping}</td>
                <td>${transaction.harga}</td>
            `;
            tableBody.appendChild(row);
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const imageGallery = document.getElementById("imageGallery1");

    // Fetch data from the API
    fetch('http://localhost/a/github/workshop-web/website-shila/admin/katalog/api_katalog.php?action=designCake1')
        .then(response => response.json())
        .then(data => {
            // Iterate through the data and create img elements
            data.forEach(imageData => {
                const imgElement = document.createElement("img");
                imgElement.classList.add('zoomable');
                imgElement.src = '../img/' + imageData.gambar; // Assuming there's a 'gambar' property in your data
                imgElement.alt = imageData.alt || ''; // Set alt attribute if available
                imageGallery.appendChild(imgElement);

                imgElement.addEventListener("click", function () {
                    openOverlay(imgElement.src);
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.addEventListener("DOMContentLoaded", function() {
    const imageGallery = document.getElementById("imageGallery2");

    // Fetch data from the API
    fetch('http://localhost/a/github/workshop-web/website-shila/admin/katalog/api_katalog.php?action=designCake2')
        .then(response => response.json())
        .then(data => {
            // Iterate through the data and create img elements
            data.forEach(imageData => {
                const imgElement = document.createElement("img");
                imgElement.classList.add('zoomable');
                imgElement.src = '../img/' + imageData.gambar; // Assuming there's a 'gambar' property in your data
                imgElement.alt = imageData.alt || ''; // Set alt attribute if available
                imageGallery.appendChild(imgElement);

                imgElement.addEventListener("click", function () {
                    openOverlay(imgElement.src);
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function openOverlay(imageSrc) {
    const overlay = document.getElementById("overlay");
    const zoomedImage = overlay.querySelector(".zoomed-image");

    zoomedImage.src = imageSrc;
    overlay.style.display = "flex";
}

function closeOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
}