<?php
    require_once("../koneksi.php");

    session_start();

    $error = "";

    if (isset($_POST['submit'])) {
        $fullname = $_POST['nama'];
        $email = $_POST['email'];
        $pass = $_POST['pass'];

        if (!empty($fullname) && !empty($email) && !empty($pass)) {
            $query = "INSERT INTO `user_detail` (`id`, `user_email`, `user_password`, `user_fullname`, `telp`, `alamat`, `pict`, `level`) VALUES (NULL, '$email', '$pass', '$fullname', '', '', '', 1);";
            $result = mysqli_query($koneksi, $query);

            if ($result) {
                header('Location: ../login/login.php');
                exit;
            } else {
                $error = "GAGAL MENAMBAHKAN DATA KE DALAM DATABASE!";
            }
        } else {
            $error = "SEMUA INPUT HARUS DIISI!";
        }
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Register</title>
    <link rel="stylesheet" href="register-style.css">
</head>
<body>
    <div class="main">
        <div class="navbar">
            <img class="image1" src="../img/4.png">
            <div class="a">
                <h2>Hello</h2>
                <div class="form">
                    <form action="register.php" method="POST">
                        <div class="form-group">
                            <label for="nama">Your Fullname*</label>
                            <div class="input">
                                <input type="text" class="form-control" id="nama" name="nama" placeholder="Enter Your Name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address*</label>
                            <div class="input">
                                <input type="email" class="form-control" id="email" name="email" placeholder="Enter Email Address">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pass">Create Password*</label>
                            <div class="input">
                                <input type="password" class="form-control" id="pass" name="pass" maxlength="6" placeholder="Enter Password" onmouseover="showPassword(this)" onmouseout="hidePassword(this)">
                            </div>
                        </div>

                        <!-- <label><input class="checkbox" type="checkbox" id="condition" name="condition" value="1"> I agree to terms & condtions<br></label> -->

                        <button class="btn1" type="submit" name="submit" id="loginBtn">Daftar</button>
                        <p style="text-align:right; margin-top:5px;">Sudah punya akun!! <a href="../login/login.php">Langsung masuk saja!</a></p>

                        <!-- <p class="or">------------------- or --------------------</p> -->
                        <p class="or"> <?php echo !empty($error) ? $error : '------------------- or --------------------'; ?> </p>
                        <!-- <p class="or"><php echo $error; ?></p> -->

                    </form>

                    <button class="btn2">
                            <img class="image2" src="../img/flat-color-icons_google.png">
                            <h2>Login with Google</h2>
                            <!-- <a href="login.php"></a> -->
                    </button>
                    
                </div>
            </div>
        </div>
    </div>
</body>
<script>
    
    function showPassword(input) {
        
        input.type = 'text'; // Ubah tipe input ke "text" saat kursor berada di dalam input
    }

    function hidePassword(input) {
        input.type = 'password'; // Kembalikan tipe input ke "password" saat kursor keluar dari input
    }

    // document.getElementById('condition').addEventListener('change', function () {
    //     var loginButton = document.getElementById('loginBtn');
    //     loginButton.disabled = !this.checked;
    // });

</script>
</html>