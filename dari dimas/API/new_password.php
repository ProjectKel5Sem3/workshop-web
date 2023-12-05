<?php
require "vendor/autoload.php";

if (!empty($_POST['user_email']) && !empty($_POST['otp']) && !empty($_POST['new_password'])) {
    $email = $_POST['user_email'];
    $otp = $_POST['otp'];
    $new_password = password_hash($_POST['new_password'], PASSWORD_DEFAULT);
    $con = mysqli_connect("localhost", "id21452276_vioscake1", "Slaoapwan211#@", "id21452276_vioscakedb");
    if ($con) {
        $sql = "UPDATE user SET user_password = '" . $new_password . "', reset_password_otp = '', reset_password_created_at = NULL WHERE user_email = '"
            . $email . "' AND reset_password_otp = '" . $otp . "'";
        if (mysqli_query($con, $sql)) {
            if (mysqli_affected_rows($con)) {
                echo "success";
            } else {
                echo "Kode OTP Salah";
            }
        } else {
            echo "Kode OTP Salah";
        }
    } else {
        echo "Database connection failed";
    }
} else {
    echo "All fields are required";
}
?>