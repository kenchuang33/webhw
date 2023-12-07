<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

$messageId = $_POST['messageid'];
$replyContent = $_POST['replycontent'];
$username = $_POST['username'];

$sql = "INSERT INTO replies (message_id, content, username) VALUES (?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "iss", $messageId, $replyContent, $username);
if (mysqli_stmt_execute($stmt)) {
    echo "回复成功";
} else {
    echo "Error: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
