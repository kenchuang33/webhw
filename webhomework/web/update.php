<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];
$color = $_POST['color'];
$sex = $_POST['sex'];

// 更新記錄而不是插入新記錄
$sql = "UPDATE `webmember` SET `username`='$username',`password`='$password', `email`='$email', `color`='$color', `sex`='$sex' WHERE `user`='1'";

if (mysqli_query($conn, $sql)) {
    echo "更新成功";
} else {
    echo "Error updating record: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
