<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Confirm Pass</title>
    <!-- CSS -->
    <link rel="stylesheet" href="admin.css">
    <!-- Font -->
    <link rel="stylesheet" type="text/css" href="../font/font.css">
</head>
<body>

<div class="login-container">
    <div class="logo-container">
        <img src="../company-profile/image/tentang-kami.png" width="200px" alt="Mitra Pemesanan Kue Logo" class="logo">
    </div>

    <form class="login-form" method="post" action="">
    <div class="form-group">
        <input type="password" name="password" id="password" class="input-text" placeholder="Password" required>
    </div>
    <div class="form-group">
        <input type="password" name="confirm-password" id="confirm-password" class="input-text" placeholder="Konfirmasi Password" required>
    </div>
    <div id="password-message"></div>
        <div class="form-group">
            <button type="submit">Konfirmasi</button>
        </div>
    </form>
</div>

<script>
    // ini fungsi untuk memeriksa kesamaan password
    function checkPassword() {
        var passwordInput = document.getElementById('password');
        var confirmPasswordInput = document.getElementById('confirm-password');
        var message = document.getElementById('password-message');

        if (passwordInput.value !== confirmPasswordInput.value) {
            message.innerHTML = 'Konfirmasi password tidak cocok.';
            message.style.color = 'red';
        } else {
            message.innerHTML = '';
        }
    }

    // event listener untuk memanggil fungsi checkPassword saat nilai input berubah
    document.getElementById('password').addEventListener('input', checkPassword);
    document.getElementById('confirm-password').addEventListener('input', checkPassword);
</script>


</body>
</html>