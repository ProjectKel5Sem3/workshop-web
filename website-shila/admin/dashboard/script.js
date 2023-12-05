document.addEventListener('DOMContentLoaded', function() {
    //api conect
    fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=transaksi')
    .then(response => response.json())
    .then(data => {
        // Update the total transactions count on the page
        document.getElementById('total-transaksi').innerText = data.length + " pesanan";
    })
    .catch(error => console.error('Error fetching data:', error));
});

// pelanggan
document.addEventListener('DOMContentLoaded', function() {
    //api conect
    fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=pelanggan')
    .then(response => response.json())
    .then(data => {
        // Update the total transactions count on the page
        document.getElementById('total-pelanggan').innerText = data.length + " orang";
    })
    .catch(error => console.error('Error fetching data:', error));
});

// pendapatan
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=pendapatan');
        const data = await response.json();

        console.log('Received data:', data);

        // Check if data is an object
        if (typeof data !== 'object' || data === null) {
            throw new Error('Invalid data format. Expected an object.');
        }

        // Convert object to array using Object.values()
        const transactionsArray = Object.values(data);

        // Sum 'total' values
        const totalPendapatan = transactionsArray.reduce((sum, transaction) => sum + parseInt(transaction.total), 0);

        // Format as thousands
        const formattedTotal = new Intl.NumberFormat('id-ID').format(totalPendapatan);

        // Update the total pendapatan count on the page
        document.getElementById('total-pendapatan').innerText = `Rp ${formattedTotal}`;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
});



// tabel transaksi
fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=tabel_transaksi')
    .then(response => response.json())
    .then(data => {
        console.log('Received data:', data);

        // Display data in the table
        const tableBody = document.getElementById('tabel-transaksi');

        data.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="../img/${transaction.pict}">
                    ${transaction.user_fullname}
                </td>
                <td>${transaction.waktu}</td>
                <td><span class="status pending">${transaction.status}</span></td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching data:', error));


// note catatan
// note catatan
document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display existing notes on page load
    fetchNotes();

    // Set up an event listener for the "Save" button
    // document.querySelector(".editor button").addEventListener("click", saveNote);
});

function fetchNotes() {
    // Fetch existing notes
    fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=note_read')
        .then(function (responseRead) {
            return responseRead.json();
        })
        .then(function (data) {
            // Update the displayed notes
            const savedNotesContainer = document.getElementById("savedNotes");
            savedNotesContainer.innerHTML = "";

            data.forEach(function (note) {
                const newNoteElement = document.createElement("div");
                newNoteElement.classList.add("saved-note");

                const noteIDElement = document.createElement("span");                
                noteIDElement.textContent = note.id_catatan;
                newNoteElement.appendChild(noteIDElement);

                const noteTextElement = document.createElement("span");
                noteIDElement.classList.add('nota');
                noteTextElement.textContent = note.catatan;
                newNoteElement.appendChild(noteTextElement);

                const noteWaktuElement = document.createElement("span");
                noteWaktuElement.textContent = '(' + note.waktu + ')';
                noteWaktuElement.style.color = 'orange';
                newNoteElement.appendChild(noteWaktuElement);

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = function () {
                    // Delete note
                    deleteNote(note.catatan, newNoteElement);
                };

                newNoteElement.appendChild(deleteButton);

                savedNotesContainer.appendChild(newNoteElement);
            });
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
            alert('Gagal Mengambil Data:' + error.message);
        });
}

function deleteNote(catatan, noteElement) {
    // Delete note
    fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=note_delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'catatan=' + encodeURIComponent(catatan),
    })
        .then(function (responseDelete) {
            if (!responseDelete.ok) {
                throw new Error('Error deleting note');
            }

            // Remove the entire note element when the Delete button is clicked
            noteElement.parentNode.removeChild(noteElement);
        })
        .catch(function (error) {
            console.error('Error:', error);
            alert('Failed to delete note.');
        });
}

function saveNote() {
    // Save note
    const textarea = document.querySelector(".editor textarea");
    const noteText = textarea.value.trim();

    if (noteText !== "") {
        fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=note_write', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'catatan=' + encodeURIComponent(noteText),
        })
            .then(function (responseWrite) {
                if (!responseWrite.ok) {
                    throw new Error('Error writing note');
                }

                // Fetch and display updated notes after saving
                fetchNotes();

                textarea.value = "";
            })
            .catch(function (error) {
                console.error('Error:', error);
                alert('Failed to save note.');
            });
    } else {
        alert("Please write a note before saving.");
    }
}