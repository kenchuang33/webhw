<?php
header('Access-Control-Allow-Origin: *');

$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

$username = $_POST['username'];

$sql = "UPDATE webmember SET sub = '0' WHERE username = ?";
$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);

if(mysqli_stmt_affected_rows($stmt) > 0) {
    echo "unsubscribed";
} else {
    echo "error";
}

mysqli_close($conn);
?>
