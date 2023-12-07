<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

$messageId = $_GET['messageid'];

$sql = "SELECT * FROM replies WHERE message_id = ? ORDER BY time DESC";
$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "i", $messageId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

$replies = array();
while ($row = mysqli_fetch_assoc($result)) {
    $replies[] = $row;
}

echo json_encode($replies);

mysqli_close($conn);
?>
