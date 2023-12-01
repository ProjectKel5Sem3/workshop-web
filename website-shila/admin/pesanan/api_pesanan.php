<?php


header ('Content-Type: application/json');

include '../../connect.php';
// include '../../../apidb/koneksi.php';

$request_method = $_SERVER['REQUEST_METHOD'];

if (isset($_GET['action'])){
    $action = $_GET['action'];

    switch ($request_method){
        case 'GET' :
            if ($action == 'transaksi') {
                $query = "SELECT * FROM transaksi";

                $result = $koneksi->query($query);

                if ($result) {
                    $transaksi = $result->fetch_all(MYSQLI_ASSOC);
                    echo json_encode($transaksi);
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error retrieving data"));
                } 
                break;
            }

            if ($action == 'rincian') {
                $query = "SELECT
                            user.user_fullname as nama,
                            basecake.basecake as base,
                            ukuran_cake.ukuran as ukuran,
                            toping.topping as toping,
                            transaksi.keterangan as ket,
                            transaksi.waktu as waktu,
                            transaksi.total as harga,
                            desain.gambar as pict,
                            transaksi.status as status
                            FROM user
                            JOIN transaksi ON user.id = transaksi.id_user
                            JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
                            JOIN detailharga_ukurandanbasecake on transaksi_detail.id_harga = detailharga_ukurandanbasecake.id_harga
                            JOIN ukuran_cake ON detailharga_ukurandanbasecake.id_uk = ukuran_cake.id_ukuran
                            JOIN basecake ON detailharga_ukurandanbasecake.id_ba = basecake.id_basecake
                            JOIN toping ON transaksi_detail.id_topping = toping.id_topping
                            JOIN desain ON transaksi_detail.id_desain = desain.id_desain";

                $result = $koneksi->query($query);

                if ($result) {
                    $transactions = $result->fetch_all(MYSQLI_ASSOC);
                    echo json_encode($transactions);
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error retrieving data"));
                }
                break;
            }


            break;

        default :
        //metode http tidak didukung
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}
} else {
//action tidak diatur
http_response_code(400);
echo json_encode(array("message" => "'action' parameter is missing"));
}

$koneksi -> close();

?>
