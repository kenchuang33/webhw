<?php


header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

 $username = $_POST['username'];
 $password = $_POST['password'];

date_default_timezone_set("Asia/Taipei");
$timestamp = date('Y-m-d H:i:s');

// 檢查資料庫中是否已經存在相同的id
$check_query = "SELECT * FROM `webmember` WHERE `username` = '$username'";
$check_result = mysqli_query($conn, $check_query);

if (mysqli_num_rows($check_result) > 0) {
    $row = mysqli_fetch_assoc($check_result);

    // 驗證密碼是否正確
    if ($password === $row['password']) {
        // 密碼正確，登入成功
        $update_query = "UPDATE `webmember` SET `user` = '1' WHERE `username` = '$username'";
        if (mysqli_query($conn, $update_query)) {
            echo "login_success";
        } else {
            // 如果更新操作失敗，輸出錯誤信息
            echo "update_failed";
        }
     
    } else {
        // 密碼錯誤
        echo "password_incorrect";
       
   
    }
} else {
    // 帳號不存在
    echo "account_not_exist";
  
    
}
?>
