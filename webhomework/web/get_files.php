<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

$username = $_POST['username']; // 從 POST 數據中獲取用戶名

$sql = "SELECT username, filename, filesize, time FROM uploaddata WHERE username = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

$files = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($files); // 將檔案列表編碼為 JSON 格式並返回

mysqli_close($conn);
?>
