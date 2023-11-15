<?php

    require_once("../koneksi.php");

    session_start();

    if (!isset($_SESSION['id'])){
        header('Location: ../login/login.php');
        exit;
    }

    function getSafeValue($row, $key) {
        return $row && isset($row[$key]) ? $row[$key] : "Data tidak tersedia";
    }

    $idVal = $_SESSION['id'];

    $query = "SELECT * FROM user_detail WHERE id = '$idVal'";
    $result = mysqli_query($koneksi, $query);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
    
        $valId = getSafeValue($row, 'id');
        $valName = getSafeValue($row, 'user_fullname');
        $valTelp = getSafeValue($row, 'telp');
        $valEmail = getSafeValue($row, 'user_email');
        $valAlamat = getSafeValue($row, 'alamat');
        // $valPicture = getSafeValue($row, 'pict');
        $valPicture = isset($row['pict']) && $row['pict'] !== "" ? $row['pict'] : '../img/4.png';
    } else {
        // Handle jika query gagal dieksekusi
        $valId = "Gagal mengambil data";
        $valName = "Gagal mengambil data";
        $valTelp = "Gagal mengambil data";
        $valEmail = "Gagal mengambil data";
        $valAlamat = "Gagal mengambil data";
        $valPicture = '<img src="../img/4.png">';
    }
    

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>dashboard</title>
    <link rel="stylesheet" href="style_index.css">
</head>
<body>
    <div class="main">
        
        <div class="navbar2">
            <div class="menu">
                <h2 class="wel">Selamat Datang</h2>
                <div class="box_profil">
                    <img class="pic1" src="../img/<?php echo $valPicture; ?>">
                    <div class="form">
                        <form action="#">                            
                            <h3>Profil kamu :</h3>
                            <table class="t1">
                                <tr>
                                    <th>id</th>
                                    <th>:</th>
                                    <td><?php echo $valId; ?></td>
                                </tr>
                                <tr>
                                    <th>Nama</th>
                                    <th>:</th>
                                    <td> <?php echo $valName; ?> </td>
                                </tr>
                                <tr>
                                    <th>No. Telp</th>
                                    <th>:</th>
                                    <td><?php echo $valTelp; ?></td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <th>:</th>
                                    <td><?php echo $valEmail; ?></td>
                                </tr>
                                <tr>
                                    <th>Alamat</th>
                                    <th>:</th>
                                    <td><?php echo $valAlamat; ?></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="navbar1">
            <div class="icon">
                <h1 class="logo">V I O S C A K E</h1>
            </div>
            <div class="sidebar">
                <ul>
                    <li><a href="#">Profil</a></li>
                    <li><a href="#">Katalog</a></li>
                    <li><a href="#">Detail Transaksi</a></li>
                    <li><a href="../login/login.php">Logout</a></li>
                </ul>
            </div>
        </div>

    </div>
</body>
</html>