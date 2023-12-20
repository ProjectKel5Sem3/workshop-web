// periksa apiKey dan imgProfil
document.addEventListener('DOMContentLoaded', function () {
  // Retrieve apiKey from local storage
  var apiKey = localStorage.getItem('apiKey');
  console.log('API Key:', apiKey); // Debugging statement

  // Check if apiKey is present
  if(apiKey) {
    // hapus apiKey yang tersimpan dalam tiga jam
    setTimeout(function() {
      localStorage.removeItem('apiKey');
      console.log('API Key removed from localStorage after one minute.');
    }, 10800000);
  }

  fetch('http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=imgProfile', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'apiKey=' + encodeURIComponent(apiKey),
  })
      .then(function (response) {
          console.log(response); // Debugging statement

          // Check if the request was successful
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          // Parse the JSON data from the response
          return response.json();
      })
      .then(function (data) {
          console.log('Received data:', data);

          const imgProfileCont = document.getElementById('imgProfile-cont');
          imgProfileCont.innerHTML = "";

          if (data.length === 0) {
              // Redirect to login.php if data is empty
              redirectToLoginPage();
          } else {
              data.forEach(function (profile) {
                  const imgPro = document.createElement('img');
                  imgPro.classList.add('imgP');
                  imgPro.src = '../img/' + profile.pict; // Use profile.pict instead of data.pict
                  imgProfileCont.appendChild(imgPro); // Append the created image element to the container
              });
          }
      })
      .catch(function (error) {
          console.error('Error:', error);
      });

    // Function to redirect to login page
    function redirectToLoginPage() {
      window.location.replace('../../login-admin/login.php');
    }
});



let sideMenu = document.querySelectorAll(".nav-link");
sideMenu.forEach((item) => {
  let li = item.parentElement;

  item.addEventListener("click", () => {
    sideMenu.forEach((link) => {
      link.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

let menuBar = document.querySelector(".menu-btn");
let sideBar = document.querySelector(".sidebar");

menuBar.addEventListener("click", () => {
  sideBar.classList.toggle("hide");
});

window.addEventListener("resize", () => {
  // if (window.innerWidth > 800) {
  //   searchFrom.classList.remove("show");
  //   searchIcon.classList.remove("fa-times");
  //   searchIcon.classList.add("fa-search");
  // }
  if (window.innerWidth < 800 && !sideBar.classList.contains("hide")) {
    sideBar.classList.add("hide");
  } else if (window.innerWidth > 800 && sideBar.classList.contains("hide")) {
    sideBar.classList.remove("hide");
  }
});

// document.addEventListener('DOMContentLoaded', function () {
//   // Cek apakah pengguna sudah login (gantilah dengan kondisi sesuai kebutuhan)
//   var isLoggedIn = false;

//   if (!isLoggedIn) {
//       // Jika tidak, arahkan ke halaman login
//       window.location.href = '../../login-admin/login.php';
//   }
// });


// set waktu untuk keluar jika sesi telah berakhir
let timeout;

function startSessionTimeout() {
  console.log('Session timeout started.');
  timeout = setTimeout(function() {
    // hapus apiKey
    localStorage.removeItem('apiKey');
    console.log('API Key removed from localStorage.');

    // Redirect ke halaman login setelah 1 menit tanpa aktivitas
    window.location.href = "../../login-admin/login.php";
  }, 60 * 60 * 1000); // 1 jam dalam milidetik
}

function resetSessionTimeout() {
  // console.log('Activity detected. Resetting session timeout.');
  clearTimeout(timeout);
  startSessionTimeout();
}

// Panggil resetSessionTimeout setiap kali ada aktivitas di halaman
document.addEventListener('mousemove', resetSessionTimeout);
document.addEventListener('keypress', resetSessionTimeout);

// Mulai hitung mundur pada saat halaman dimuat
startSessionTimeout();



// let switchMode = document.getElementById("switch-mode");
// switchMode.addEventListener("change", (e) => {
//   if (e.target.checked) {
//     document.body.classList.add("dark");
//   } else {
//     document.body.classList.remove("dark");
//   }
// });

// let searchFrom = document.querySelector(".content nav form");
// let searchBtn = document.querySelector(".search-btn");
// let searchIcon = document.querySelector(".search-icon");

// searchBtn.addEventListener("click", (e) => {
//   if (window.innerWidth < 576) {
//     e.preventDefault();
//     searchFrom.classList.toggle("show");
//     if (searchFrom.classList.contains("show")) {
//       searchIcon.classList.replace("fa-search", "fa-times");
//     } else {
//       searchIcon.classList.replace("fa-times", "fa-search");
//     }
//   }
// });
