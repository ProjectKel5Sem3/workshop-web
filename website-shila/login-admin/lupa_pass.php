<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Lupa Pass</title>
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
    <h2>Lupa Password</h2>
    <form class="login-form" method="post" action="">
    <div class="form-group">
        <input type="text" name="your-email" id="your-email" class="input-text" placeholder="Email Address" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}">
    </div>
        <div class="form-group">
            <button type="submit">Kirim Permintaan</button>
        </div>
    </form>
</div>

<script>
    function togglePassword() {
        var passwordInput = document.getElementById('password');
        passwordInput.type = (passwordInput.type === 'password') ? 'text' : 'password';
    }
</script>

</body>
</html>