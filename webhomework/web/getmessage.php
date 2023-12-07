<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

$sql = "SELECT id, messagetitle, messagecontent, username, time FROM messageboard ORDER BY time DESC";
$result = mysqli_query($conn, $sql);

$messages = array();
while ($row = mysqli_fetch_assoc($result)) {
    $messages[] = $row;
}

echo json_encode($messages);

mysqli_close($conn);
?>
