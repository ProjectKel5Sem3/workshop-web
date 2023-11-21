<?php

header ('Content-Type: application/json');

include '../koneksi.php';
//db a_vioscake_test

$request_method = $_SERVER['REQUEST_METHOD'];

//periksa 'action' yang diatur pada setiap folder yang terhubung dengan API
if (isset($_GET['action'])){
    $action = $_GET['action'];

    switch ($request_method){
        case 'GET' :
            //untuk login
            /*
                penggunaan postman
                method = GET
                url = http://localhost/a/project/API/api_users.php?
                    action=login
                    &user_email=admin@gmail.com ($valEmail)
                    &user_password=123 ($valPass)
            */
            if ($action == 'login') {
                $valEmail = $_GET['user_email'];
                $valPass = $_GET['user_password'];

                $query = "SELECT * FROM user WHERE user_email = '$valEmail' AND user_password = $valPass";
                $result = $koneksi -> query($query);

                if ($result) {
                    $hasil = $result -> fetch_all(MYSQLI_ASSOC);
                    echo json_encode($hasil);
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error retrieving data"));
                }
                break;
            }

            //menampilkan data dari tabel users (daftar pelanggan users bukan admin)
            /*
                penggunaan postman
                method = GET
                url = http://localhost/a/project/API/api_users.php?action=get_users
            */
            if ($action == 'get_users') {
                $query = "SELECT * FROM user WHERE id_level = 2 ORDER BY id_user desc;";
                $result = $koneksi -> query($query);

                if ($result) {
                    $users = $result -> fetch_all(MYSQLI_ASSOC);
                    echo json_encode($users);
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error retrieving data"));
                }
            } 
            
            break;
                

        case 'POST' :
            //untuk login
            /*
                penggunaan postman
                method = POST
                url = http://localhost/a/project/API/api_users.php?action=login
                body -> form-data
                    user_email = $valEmail
                    user_password = $valPass
            */
            if ($action == 'login') {
                $valEmail = $_POST['user_email'];
                $valPass = $_POST['user_password'];

                $query = "SELECT * FROM user WHERE user_email = '$valEmail' AND user_password = $valPass";
                $result = $koneksi -> query($query);

                if ($result) {
                    $hasil = $result -> fetch_all(MYSQLI_ASSOC);
                    $response = array(
                        'code' => 200,
                        'status' => 'sukses',
                        'data' => $hasil
                    );
                    echo json_encode($response);
                } else {
                    http_response_code(500);
                    $response = array(
                        'code' => 500,
                        'status' => 'gagal',
                        'data' => array()
                    );
                    echo json_encode($response);
                }
                break;
            }

            //menambah data
            //untuk register khusus mobile
            /*
                penggunaan postman
                method = POST
                url = http://localhost/a/project/API/api_users.php?action=add_users
                body -> x-www-form-urlencode
                    user_email = di@gmail.com ($valEmail)
                    user_password = 111 ($valPass)
            */
            if ($action == 'add_users') {
                $valNama = $_POST['user_fullname'];
                $valEmail = $_POST['user_email'];
                $valPass = $_POST['user_password'];

                $query = "INSERT INTO user (user_fullname, user_email, user_password, id_level) VALUES ('$valNama','$valEmail','$valPass', '2');";
                if ($koneksi -> query($query)) {
                    echo json_encode(array("message" => "User added successfully"));
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error adding user"));
                }
            } 
            
            break;

        case 'PUT' :
            //update data user kecuali password
            /*
                penggunaan postman
                method = PUT
                url = http://localhost/a/project/API/api_users.php?action=update_users
                body -> x-www-form-urlencode
                    user_email
                    user_fullname
                    telp
                    alamat
                    pict
                    id_user
            */
            if ($action == 'update_users') {
                parse_str(file_get_contents('php://input'), $value);
                $valId = $value['id_user'];
                $valNama = $value['user_fullname'];
                $valEmail = $value['user_email'];
                $valTelp = $value['telp'];
                $valAlamat = $value['alamat'];
                $valPict = $value['pict'];

                $query = "UPDATE `user` SET 
                                `user_email` = '$valEmail',  
                                `user_fullname` = '$valNama', 
                                `telp` = '$valTelp', 
                                `alamat` = '$valAlamat', 
                                `pict` = '$valPict' 
                            WHERE `user`.`id_user` = '$valId'";
                if ($koneksi -> query($query)) {
                    echo json_encode(array("message" => "User update successfully"));
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error update user"));
                }
            } 
            
            break;

        case 'DELETE' :
            //hapus data user khusus web (fitur admin)
            /*
                penggunaan postman
                method = DELETE
                url = http://localhost/a/project/API/api_users.php?action=delete_users&id_level=2
                body -> x-www-form-urlencode
                    id_user
            */
            if ($action == 'delete_users') {
                if (isset($_GET['id_level'])) {
                    parse_str(file_get_contents('php://input'), $value);
                    $valId = $value['id_user'];

                    $query = "DELETE FROM user WHERE id_user = '$valId'";
                    if ($koneksi -> query($query)) {
                        echo json_encode(array("message" => "User deleted successfully"));
                    } else {
                        http_response_code(500);
                        echo json_encode(array("message" => "Error deleting user"));
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(array("message" => "'id_level' parameter is missing"));
                }
            } break;
        
        default:
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