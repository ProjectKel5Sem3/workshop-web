let isEditing = false;
let selectedAlbums = []; 

function toggleEdit() {
  isEditing = !isEditing;
  const albums = document.querySelectorAll(".album");

  albums.forEach((album) => {
    if (isEditing) {
      album.classList.add("selectable");
    } else {
      album.classList.remove("selectable", "selected", "checkbox-selected");
    }
  });

  selectedAlbums = []; 
}

function deleteSelectedImages() {
  selectedAlbums.forEach((album) => {
    album.remove();
  });

  selectedAlbums = [];

  isEditing = false;
}

function selectImage(album) {
  if (isEditing && album.classList.contains("selectable")) {
    album.classList.toggle("selected");
    album.classList.toggle("checkbox-selected");

    if (album.classList.contains("selected")) {
      selectedAlbums.push(album);
    } else {
      const index = selectedAlbums.indexOf(album);
      if (index !== -1) {
        selectedAlbums.splice(index, 1);
      }
    }
  }
}
//tambah
function addNewCatalog() {
  const form = document.getElementById('newCatalogForm');
  form.style.display = 'block'; // Show the form
}
//batal
function batalBtn() {
  const form = document.getElementById('newCatalogForm');
  form.style.display = 'none';
}
