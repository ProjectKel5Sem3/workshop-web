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
fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=pendapatan')
    .then(response => response.json())
    .then(data => {
        // Sum 'total' values
        const totalPendapatan = data.reduce((sum, transaction) => sum + parseInt(transaction.total), 0);

        // Format as thousands
        const formattedTotal = new Intl.NumberFormat('id-ID').format(totalPendapatan);

        // Update the total pendapatan count on the page
    document.getElementById('total-pendapatan').innerText = `Rp ${formattedTotal}`;
})
.catch(error => console.error('Error fetching data:', error));

// tabel transaksi
fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=tabel_transaksi')
    .then(response => response.json())
    .then(data => {
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
document.addEventListener("DOMContentLoaded", function() {
    // Fetch and display existing notes on page load
    fetchNotes();

    // Set up an event listener for the "Save" button
    // document.querySelector(".editor button").addEventListener("click", saveNote);
});

async function fetchNotes() {
    try {
        const responseRead = await fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=note_read');
        const data = await responseRead.json();

        // Update the displayed notes
        const savedNotesContainer = document.getElementById("savedNotes");
        savedNotesContainer.innerHTML = "";

        data.forEach(note => {
            const newNoteElement = document.createElement("div");
            newNoteElement.classList.add("saved-note");

            const noteIDElement = document.createElement("span");
            noteIDElement.textContent = note.id_catatan;
            newNoteElement.appendChild(noteIDElement);

            const noteTextElement = document.createElement("span");
            noteTextElement.textContent = note.catatan;
            newNoteElement.appendChild(noteTextElement);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = async function () {
                try {
                    const responseDelete = await fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=note_delete', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: 'catatan=' + encodeURIComponent(note.catatan),
                    });
            
                    if (!responseDelete.ok) {
                        throw new Error('Error deleting note');
                    }
            
                    // Remove the entire note element when the Delete button is clicked
                    savedNotesContainer.removeChild(newNoteElement);
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to delete note.');
                }
            };

            newNoteElement.appendChild(deleteButton);

            savedNotesContainer.appendChild(newNoteElement);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal Mengambil Data');
    }
}


async function saveNote() {
    const textarea = document.querySelector(".editor textarea");
    const noteText = textarea.value.trim();

    if (noteText !== "") {
        try {
            const responseWrite = await fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=note_write', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'catatan=' + encodeURIComponent(noteText),
            });

            if (!responseWrite.ok) {
                throw new Error('Error writing note');
            }

            // Fetch and display updated notes after saving
            fetchNotes();

            textarea.value = "";
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to save note.');
        }
    } else {
        alert("Please write a note before saving.");
    }
}