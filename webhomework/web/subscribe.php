<?php
header('Access-Control-Allow-Origin: *');

$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

// 获取从AJAX传过来的用户名
$username = $_POST['username'];

// 更新用户的订阅状态
$sql = "UPDATE webmember SET sub = '1' WHERE username = ?";
$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);

if(mysqli_stmt_affected_rows($stmt) > 0) {
    echo "subscribed";
} else {
    echo "error";
}

mysqli_close($conn);
?>
