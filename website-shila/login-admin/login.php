<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Login</title>
    <!-- CSS -->
    <link rel="stylesheet" href="admin.css">
    <!-- Font -->
    <link rel="stylesheet" type="text/css" href="../font/font.css">
    <!-- Icon -->
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
</head>
<body>

<div class="login-container">
    <div class="logo-container">
        <img src="../company-profile/image/tentang-kami.png" width="200px" alt="Mitra Pemesanan Kue Logo" class="logo">
    </div>

    <h2>Selamat Datang 👋</h2>

    <form class="login-form" id="loginForm" method="post" action="">
        
        <div class="form-group">
            <input type="text" name="your-email" id="your-email" class="input-text" placeholder="Email Address" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}">
        </div>
        <div class="form-group">
            <input type="password" name="password" id="password" class="input-text" placeholder="Password" required>
            <div class="password-input-container">
                <span class="toggle-password" onclick="togglePassword()"><i class="ri-eye-fill:before"></i></span>
            </div>
        </div>

        <div class="form-group">
            <a href="lupa_pass.php" class="forgot-password">Lupa Password?</a>
        </div>
        <div class="form-group">
            <button type="submit">Login</button>
        </div>
    </form>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var loginForm = document.getElementById('loginForm');

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            var userEmail = document.getElementById('your-email').value;
            var userPassword = document.getElementById('password').value;
            //ip = cmd -> ipconfig -> IPv4 Address -> 000.000.0.0
            fetch('http://localhost/a/github/workshop-web/dari%20dimas/API/api_users.php?action=login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
                body: 'user_email=' + encodeURIComponent(userEmail) + '&user_password=' + encodeURIComponent(userPassword),
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.code === 200) {
                    window.location.href = '../admin/dashboard/dashboard.html';
                } else if (data.code === 401) {
                    alert('login Gagal. Username atau password salah.')
                } else if (data.code === 500) {
                    alert('Koneksi DB Gagal');
                }                
            })
            .catch(function(error) {
                console.error('Error:, error');
                alert('terjadi kesalahan')
            })
        })
    })
</script>


</body>
</html>