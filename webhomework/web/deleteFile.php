<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

$filename = $_POST['filename'];

$sql = "DELETE FROM `uploaddata` WHERE `filename`=?";
$stmt = mysqli_prepare($conn, $sql);

if ($stmt) {
    mysqli_stmt_bind_param($stmt, "s", $filename);
    if (mysqli_stmt_execute($stmt)) {
        echo "檔案 " . $filename . " 已成功刪除。";
    } else {
        echo "Error deleting file: " . mysqli_error($conn);
    }
    mysqli_stmt_close($stmt);
} else {
    echo "Error preparing statement: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
