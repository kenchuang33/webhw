<?php
header('Access-Control-Allow-Origin: *');

$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

// 获取从AJAX传过来的用户名
$username = $_GET['username'];

// 检查用户的订阅状态
$sql = "SELECT sub FROM webmember WHERE username = ?";
$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if($row = mysqli_fetch_assoc($result)) {
    if($row['sub'] === '1') {
        echo "subscribed";
    } else {
        echo "not_subscribed";
    }
} else {
    echo "error";
}

mysqli_close($conn);
?>
