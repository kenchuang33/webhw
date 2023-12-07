<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

$sql = "SELECT `username`, `password`, `email`, `color`, `sex` FROM `webmember` WHERE `user` = '1'";
$send = mysqli_query($conn, $sql);

if ($row = mysqli_fetch_assoc($send)) {
    // 將資料編碼為 JSON 格式
    echo json_encode($row);
} else {
    echo "No user found with user value 1";
}

mysqli_close($conn);
?>
