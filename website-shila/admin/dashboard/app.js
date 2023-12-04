// document.addEventListener('DOMContentLoaded', function() {
//   var loginForm = document.getElementById('loginForm');

//   loginForm.addEventListener('submit', function(event) {
//       event.preventDefault();

//       var userEmail = document.getElementById('your-email').value;
//       var userPassword = document.getElementById('password').value;

//       //ip = cmd -> ipconfig -> IPv4 Address -> 000.000.0.0
//       fetch('http://localhost/a/github/workshop-web/dari%20dimas/API/api_users.php?action=login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
//           body: 'user_email=' + encodeURIComponent(userEmail) + '&user_password=' + encodeURIComponent(userPassword),
//       })
//       .then(function(response) {
//           return response.json();
//       })
//       .then(function(data) {
//           if (data.code === 200) {
//               // Successfully logged in, now fetch additional user information
//               const userId = data.data[0].id;

//               const urlApi = 'http://localhost/a/github/workshop-web/website-shila/admin/dashboard/api.php?action=akun';

//               return fetch(urlApi, {
//                   method: 'POST',
//                   headers: {
//                       'Content-Type': 'application/x-www-form-urlencoded',
//                   },
//                   body: 'id=' + encodeURIComponent(userId)
//               });
//           } else if (data.code === 401) {
//               alert('Login Gagal. Username atau password salah.');
//           } else if (data.code === 500) {
//               alert('Koneksi DB Gagal');
//           }
//       })
//       .then(function(response) {
//           if (response) {
//               return response.json();
//           }
//       })
//       .then(function(data) {
//         // Update the profile picture
//         const pictProfil = document.getElementById('pictProfil');
//         if (data && data.length > 0) {
//             const user = data [0];
//             pictProfil.src = '../img/' + user;
//         } else {
//             alert('Gagal mendapatkan informasi akun.');
//             // Redirect to the login page
//             // window.location.href = '../login-admin/login.php';
//         }
//       })
    
//       .catch(function(error) {
//         console.error('Error during fetch:', error);
//         alert('Terjadi kesalahan. Lihat konsol untuk rincian.');
//       });
    
//   });
// });


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

let timeout;

function startSessionTimeout() {
  console.log('Session timeout started.');
  timeout = setTimeout(function() {
    // Redirect ke halaman login setelah 1 menit tanpa aktivitas
    window.location.href = "../../login-admin/login.php";
  }, 30 * 60 * 1000); // 1 menit dalam milidetik
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
