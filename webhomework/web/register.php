<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];
$color = $_POST['color'];
$sex = $_POST['sex'];

date_default_timezone_set("Asia/Taipei");
$timestamp = date('Y-m-d H:i:s');

// 檢查資料庫中是否已經存在相同的username
$check_query = "SELECT * FROM `webmember` WHERE `username` = ?";
if ($stmt = mysqli_prepare($conn, $check_query)) {
    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "s", $username);

    // Execute the query
    mysqli_stmt_execute($stmt);

    // Store result
    mysqli_stmt_store_result($stmt);

    if (mysqli_stmt_num_rows($stmt) > 0) {
        // 已經存在相同的username，顯示 "已有相同ID"
        echo "duplicate";
    } else {
        // 插入新的記錄
        $insert_query = "INSERT INTO `webmember` (`username`, `password`, `email`, `sex`, `color`, `user`, `sub`) VALUES (?, ?, ?, ?, ?, 1, 0)";
        if ($insert_stmt = mysqli_prepare($conn, $insert_query)) {
            mysqli_stmt_bind_param($insert_stmt, "sssss", $username, $password, $email, $sex, $color);
            if (mysqli_stmt_execute($insert_stmt)) {
                // 登入成功，顯示 "註冊成功"
                echo "success";
            } else {
                // Insert failed, handle error
                echo "Error: " . mysqli_error($conn);
            }
            mysqli_stmt_close($insert_stmt);
        } else {
            echo "Error: " . mysqli_error($conn);
        }
    }
    mysqli_stmt_close($stmt);
} else {
    echo "Error: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
