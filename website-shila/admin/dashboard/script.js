document.addEventListener('DOMContentLoaded', function() {
    //api conect
    fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=transaksi')
    .then(response => response.json())
    .then(data => {
        // Filter transactions for today
        const today = new Date().toISOString().split('T')[0];
        const transactionsToday = data.filter(transaction => transaction.waktu.includes(today));

        // Update the total transactions count on the page
        document.getElementById('total-transaksi').innerText = transactionsToday.length + " pesanan";
    })
    .catch(error => console.error('Error fetching data:', error));
});

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



// function saveNote() {
//     const textarea = document.querySelector(".editor textarea");
//     const noteText = textarea.value.trim();

//     if (noteText !== "") {
//         const savedNotesContainer = document.getElementById("savedNotes");
//         const newNoteElement = document.createElement("div");
//         newNoteElement.classList.add("saved-note");

//         const noteTextElement = document.createElement("span");
//         noteTextElement.textContent = noteText;
//         newNoteElement.appendChild(noteTextElement);

//         const deleteButton = document.createElement("button");
//         deleteButton.textContent = "Delete";
//         deleteButton.onclick = function () {
//         savedNotesContainer.removeChild(newNoteElement);
//         };
//         newNoteElement.appendChild(deleteButton);

//         savedNotesContainer.appendChild(newNoteElement);

//         textarea.value = "";
//     } else {
//         alert("Please write a note before saving.");
//     }
//     }

async function saveNote() {
    const textarea = document.querySelector(".editor textarea");
    const noteText = textarea.value.trim();

    if (noteText !== "") {
        // Make a POST request to the note_write API endpoint
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

            // Make a GET request to the note_read API endpoint
            const responseRead = await fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=note_read');
            const data = await responseRead.json();

            // Update the displayed notes
            const savedNotesContainer = document.getElementById("savedNotes");
            savedNotesContainer.innerHTML = "";

            data.forEach(note => {
                const newNoteElement = document.createElement("div");
                newNoteElement.classList.add("saved-note");

                const noteTextElement = document.createElement("span");
                noteTextElement.textContent = note.catatan;
                newNoteElement.appendChild(noteTextElement);

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = async function () {
                    // Make a DELETE request to the note_delete API endpoint based on content
                    const responseDelete = await fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=note_delete&catatan=' + encodeURIComponent(note.catatan), {
                        method: 'DELETE',
                    });

                    if (!responseDelete.ok) {
                        throw new Error('Error deleting note');
                    }

                    savedNotesContainer.removeChild(newNoteElement);
                };
                newNoteElement.appendChild(deleteButton);

                savedNotesContainer.appendChild(newNoteElement);
            });

            textarea.value = "";
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to save note.');
        }
    } else {
        alert("Please write a note before saving.");
    }
}