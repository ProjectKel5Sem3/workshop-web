<?php


header ('Content-Type: application/json');

include '../../connect.php';
// include '../../../apidb/koneksi.php';

$request_method = $_SERVER['REQUEST_METHOD'];

if (isset($_GET['action'])){
    $action = $_GET['action'];

    switch ($request_method){
        case 'GET' :
            if ($action == 'priceList') {
                $query = "SELECT
                detailharga_ukurandanbasecake.id_harga AS id,
                ukuran_cake.ukuran AS ukuran,
                ukuran_cake.jenis AS jenis,
                basecake.basecake AS basecake,
                detailharga_ukurandanbasecake.harga as harga
                FROM detailharga_ukurandanbasecake
                LEFT JOIN ukuran_cake ON detailharga_ukurandanbasecake.id_uk = ukuran_cake.id_ukuran
                LEFT JOIN basecake ON detailharga_ukurandanbasecake.id_ba = basecake.id_basecake
                ORDER BY ukuran";
                $result = $koneksi->query($query);

                if ($result) {
                    $katalog = $result->fetch_all(MYSQLI_ASSOC);
                    echo json_encode($katalog);
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error retrieving data"));
                } 
                break;
            }
            if ($action == 'priceToping') {
                $query = "SELECT * FROM toping";
                $result = $koneksi->query($query);

                if ($result) {
                    $katalog = $result->fetch_all(MYSQLI_ASSOC);
                    echo json_encode($katalog);
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error retrieving data"));
                } 
                break;
            }
            if ($action == 'baseCake') {
                $query = "SELECT * FROM basecake";
                $result = $koneksi->query($query);

                if ($result) {
                    $katalog = $result->fetch_all(MYSQLI_ASSOC);
                    echo json_encode($katalog);
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error retrieving data"));
                } 
                break;
            }
            if ($action == 'ukuranCake') {
                $query = "SELECT * FROM ukuran_cake";
                $result = $koneksi->query($query);

                if ($result) {
                    $katalog = $result->fetch_all(MYSQLI_ASSOC);
                    echo json_encode($katalog);
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error retrieving data"));
                } 
                break;
            }
            if ($action == 'designCake1') {
                $query = "SELECT * FROM desain WHERE jenis = 'bento'";
                $result = $koneksi->query($query);

                if ($result) {
                    $katalog = $result->fetch_all(MYSQLI_ASSOC);
                    echo json_encode($katalog);
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error retrieving data"));
                } 
                break;
            }
            // detail data desain
            if ($action == 'designCake2') {
                $query = "SELECT * FROM desain WHERE jenis = 'birthday'";
                $result = $koneksi->query($query);

                if ($result) {
                    $katalog = $result->fetch_all(MYSQLI_ASSOC);
                    echo json_encode($katalog);
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error retrieving data"));
                } 
                break;
            }

            break;

        case 'POST' :

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
    