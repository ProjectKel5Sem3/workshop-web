<?php

header ('Content-Type: application/json');

include '../../connect.php';

$request_method = $_SERVER['REQUEST_METHOD'];

$query = "SELECT 
            transaksi.id_transaksi as id,
            user.user_fullname AS nama, 
            user.alamat AS alamat,
            user.telp AS telp,
            ukuran_cake.ukuran AS ukuran, 
            transaksi.waktu as tanggalpesan, 
            transaksi.total as hargatotal, 
            transaksi.status as status
            FROM user
            JOIN transaksi ON user.id = transaksi.id_user
            JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
            JOIN detailharga_ukurandanbasecake ON transaksi_detail.id_harga = detailharga_ukurandanbasecake.id_harga
            JOIN ukuran_cake ON detailharga_ukurandanbasecake.id_uk = ukuran_cake.id_ukuran";
            
$result = $koneksi->query($query);
            
if ($result) {
    $transactions = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($transactions);
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Error retrieving data"));
}


?>