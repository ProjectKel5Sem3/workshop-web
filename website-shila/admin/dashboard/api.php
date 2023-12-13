<?php

header ('Content-Type: application/json');

include '../../connect.php';

$request_method = $_SERVER['REQUEST_METHOD'];

if (isset($_GET['action'])){
    $action = $_GET['action'];

    switch ($request_method){
        case 'GET' :
            if ($action == 'transaksi') {
                $query = "SELECT * FROM transaksi ORDER BY id_transaksi DESC";
                $result = $koneksi->query($query);
            
                if ($result) {
                    $transactions = $result->fetch_all(MYSQLI_ASSOC);
            
                    // Filter transactions for the last week
                    // $oneWeekAgo = date('Y-m-d', strtotime('-7 days'));
                    // $transactionsLastWeek = array_filter($transactions, function ($transaction) use ($oneWeekAgo) {
                    //     return $transaction['waktu'] >= $oneWeekAgo;
                    // });
            
                    echo json_encode($transactions);
                } else {
                    http_response_code(500);
                    echo json_encode(array("message"=>"error"));
                }
                break;
            }
            

            if ($action == 'pelanggan') {
                $query = "SELECT `id`, `user_email`, `user_fullname`, `telp`, `alamat`, `pict`, `tanggal_gabung`, `id_level` 
                            FROM `user` WHERE id_level = 2 ORDER BY tanggal_gabung DESC";
                $result = $koneksi->query($query);

                if ($result) {
                    $users = $result -> fetch_all(MYSQLI_ASSOC);
                    echo json_encode($users);
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error retrieving data"));
                } 
                break;
            }

            if ($action == 'pendapatan') {
                $query = "SELECT * FROM `transaksi` WHERE status = 'selesai' OR status = 'kue dibuat'";
                $result = $koneksi->query($query);
            
                if ($result) {
                    $transactions = $result->fetch_all(MYSQLI_ASSOC);
            
                    // Filter transactions for the last week
                    // $oneWeekAgo = date('Y-m-d', strtotime('-7 days'));
                    // $transactionsLastWeek = array_filter($transactions, function ($transaction) use ($oneWeekAgo) {
                    //     return $transaction['waktu'] >= $oneWeekAgo;
                    // });
            
                    echo json_encode($transactions);
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error retrieving data"));
                } 
                break;
            }
            
            if ($action == 'tabel_transaksi') {
                $query = "SELECT 
                            user.user_fullname, 
                            user.pict, 
                            transaksi.waktu,
                            transaksi.status 
                            FROM user 
                            JOIN transaksi ON user.id = transaksi.id_user";
                $result = $koneksi->query($query);
            
                if ($result) {
                    $transactions = $result->fetch_all(MYSQLI_ASSOC);
                
                    // Filter transactions for the last week
                    // $oneWeekAgo = date('Y-m-d', strtotime('-7 days'));
                    // $filteredTransactions = array_filter($transactions, function ($transaction) use ($oneWeekAgo) {
                        // return $transaction['waktu'] >= $oneWeekAgo;
                    // });
                
                    echo json_encode(array_values($transactions)); // Mengubah objek menjadi array
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error retrieving data"));
                }
                break;
            }
            

            if ($action == 'note_read') {
                $query = "SELECT * FROM catatan ORDER BY id_catatan DESC";
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

        case 'POST' :
            if ($action == 'akun') {
                // Validate and sanitize input
                $valId = isset($_POST['id']) ? intval($_POST['id']) : null;
        
                if ($valId !== null) {
                    // Use prepared statements to prevent SQL injection
                    $query = "SELECT id, user_email as email, user_fullname as nama, telp, pict FROM user WHERE id = ?";
                    $stmt = $koneksi->prepare($query);
        
                    // Bind the parameter and execute the query
                    $stmt->bind_param("i", $valId);
                    $stmt->execute();
                    
                    // Check for successful execution
                    if ($stmt->errno) {
                        http_response_code(500);
                        echo json_encode(array("message" => "Error executing query: " . $stmt->error));
                    } else if ($valId != 1) {
                        http_response_code(401);
                        echo json_encode(array("message" => "Bukan admin"));
                    } else {
                        // Fetch results and return as JSON
                        $result = $stmt->get_result();
                        $user = $result->fetch_all(MYSQLI_ASSOC);
                        echo json_encode($user);
                    }                 
        
                    // Close the statement
                    $stmt->close();
                } else {
                    http_response_code(400); // Bad Request
                    echo json_encode(array("message" => "Invalid or missing 'id' parameter"));
                }
        
                break;
            }

            if ($action == 'note_write') {
                $valCatatan = isset($_POST['catatan']) ? $_POST['catatan'] : '';
            
                if (empty($valCatatan)) {
                    http_response_code(400); // Bad Request
                    echo json_encode(array("message" => "Catatan cannot be empty"));
                    exit;
                }
            
                try {
                    // Gunakan parameter prepare statement untuk keamanan tambahan
                    $stmt = $koneksi->prepare("INSERT INTO `catatan` (`id_catatan`, `catatan`) VALUES (NULL, ?)");
                    $stmt->bind_param("s", $valCatatan);
            
                    if ($stmt->execute()) {
                        echo json_encode(array("message" => "Note added successfully"));
                    } else {
                        http_response_code(500);
                        echo json_encode(array("message" => "Error adding note"));
                    }
            
                    $stmt->close();
                } catch (Exception $e) {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error: " . $e->getMessage()));
                }
                break;
            }

            if ($action == 'note_delete') {
                // Menerima data dari body permintaan dalam format x-www-form-urlencoded
                $valCatatan = $_POST['catatan'];
        
                if (!empty($valCatatan)) {
                    $query = "DELETE FROM catatan WHERE catatan = '$valCatatan'";
                    
                    if ($koneksi->query($query)) {
                        echo json_encode(array("message" => "Note deleted successfully"));
                    } else {
                        http_response_code(500);
                        echo json_encode(array("message" => "Error deleting note"));
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(array("message" => "Catatan parameter is missing"));
                }
                break;
            }

            if ($action == 'imgProfile') {
                $apiKey = $_POST['apiKey'];

                $query = "SELECT 
                            apiKey, user_fullname as nama, 
                            user_email as email, 
                            pict 
                            FROM `user` WHERE apiKey = '$apiKey'";
                            
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