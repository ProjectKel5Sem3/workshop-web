<?php

$server     = "localhost";
$username   = "root";
$password   = "";
$db         = "a_percobaan_native"; //nama db
$koneksi    = mysqli_connect($server, $username, $password, $db);

//cek jika koneksi gagal
if(mysqli_connect_errno()) {
    echo "Koneksi gagal : " . mysqli_connect_error();
}

?>