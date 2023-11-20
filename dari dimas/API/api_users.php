<?php

header ('Content-Type: application/json');

include '../koneksi.php';

$request_method = $_SERVER['REQUEST_METHOD'];

//periksa 'action' yang diatur pada setiap folder yang terhubung dengan API
if (isset($_GET['action'])){
    $action = $_GET['action'];

    switch ($request_method){
        case 'GET' :
            //mengambil data
            //untuk login web dengan id_level = 1 mobile dengan id_level = 2
            if ($action == 'get_users') {
                if (isset($_GET['id_level'])){
                    $valLevel = $_GET['id_level'];

                    $query = "SELECT * FROM user WHERE id_level = $valLevel ORDER BY id_user desc;";
                    $result = $koneksi -> query($query);

                    if ($result) {
                        $users = $result -> fetch_all(MYSQLI_ASSOC);
                        echo json_encode($users);
                    } else {
                        http_response_code(500);
                        echo json_encode(array("message" => "Error retrieving data"));
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(array("message" => "'id_level' parameter is missing"));
                }
            } break;

        case 'POST' :
            //menambah data
            //untuk register khusus mobile
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
            } break;

        case 'PUT' :
            //update data user kecuali password
            if ($action == 'update_users') {
                if (isset($_GET['id_user'])) {
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
                }  else {
            http_response_code(400);
            echo json_encode(array("message" => "Missing 'id_user' parameter"));
        }
            } break;

        case 'DELETE' :
            //hapus data user khusus web
            if ($action == 'delete_users') {
                if (isset($_GET['id_user'])) {
                    parse_str(file_get_contents('php://input'), $value);
                    $valId = $value['id_user'];

                    $query = "DELETE FROM user WHERE id_user = '$valId'";
                    if ($koneksi -> query($query)) {
                        echo json_encode(array("message" => "User deleted successfully"));
                    } else {
                        http_response_code(500);
                        echo json_encode(array("message" => "Error deleting user"));
                    }
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