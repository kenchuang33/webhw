<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

$messageId = $_POST['messageid'];
$newContent = $_POST['messagecontent'];

$sql = "UPDATE `messageboard` SET `messagecontent` = ? WHERE `id` = ?";
$stmt = mysqli_prepare($conn, $sql);

if ($stmt) {
    mysqli_stmt_bind_param($stmt, "si", $newContent, $messageId);
    if (mysqli_stmt_execute($stmt)) {
        echo "留言更新成功";
    } else {
        echo "Error updating message: " . mysqli_error($conn);
    }
    mysqli_stmt_close($stmt);
} else {
    echo "Error preparing statement: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
