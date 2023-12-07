<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

$messageId = $_POST['messageid'];

$sql = "DELETE FROM `messageboard` WHERE `id` = ?";
$stmt = mysqli_prepare($conn, $sql);

if ($stmt) {
    mysqli_stmt_bind_param($stmt, "i", $messageId);
    if (mysqli_stmt_execute($stmt)) {
        echo "留言删除成功";
    } else {
        echo "Error deleting message: " . mysqli_error($conn);
    }
    mysqli_stmt_close($stmt);
} else {
    echo "Error preparing statement: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
