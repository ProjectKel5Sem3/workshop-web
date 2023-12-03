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



let timeout;

function startSessionTimeout() {
  console.log('Session timeout started.');
  timeout = setTimeout(function() {
    // Redirect ke halaman login setelah 1 menit tanpa aktivitas
    window.location.href = "../../login-admin/login.php";
  }, 1 * 60 * 1000); // 1 menit dalam milidetik
}

function resetSessionTimeout() {
  console.log('Activity detected. Resetting session timeout.');
  clearTimeout(timeout);
  startSessionTimeout();
}

// Panggil resetSessionTimeout setiap kali ada aktivitas di halaman
document.addEventListener('mousemove', resetSessionTimeout);
document.addEventListener('keypress', resetSessionTimeout);

// Mulai hitung mundur pada saat halaman dimuat
startSessionTimeout();

