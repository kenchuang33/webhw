<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

$messagetitle = $_POST['messagetitle'];
$messagecontent = $_POST['messagecontent'];
$username = $_POST['username'];



date_default_timezone_set("Asia/Taipei");
$timestamp = date('Y-m-d H:i:s');


 // 插入新的記錄
 $sql = "INSERT INTO `messageboard`(`messagetitle`, `messagecontent`, `username`, `time`) VALUES ('$messagetitle','$messagecontent','$username','$timestamp')";
 if (!$send = mysqli_query($conn, $sql)) {
     echo mysqli_error($conn);
} else {
     // 登入成功，顯示 "註冊成功"
     echo "success";
}



?>
