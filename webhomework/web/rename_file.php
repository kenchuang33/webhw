<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

$oldfilename = $_POST['oldFilename'];
$newfilename = $_POST['newFilename'];
//$oldfilename = "index.php";
//$newfilename = "ix.php";
// 使用預處理語句來更新記錄
$sql = "UPDATE `uploaddata` SET `filename`=? WHERE `filename`=?";
$stmt = mysqli_prepare($conn, $sql);

if ($stmt) {
    mysqli_stmt_bind_param($stmt, "ss", $newfilename, $oldfilename);
    if (mysqli_stmt_execute($stmt)) {
        echo "更新成功";
    } else {
        echo "Error updating record: " . mysqli_error($conn);
    }
    mysqli_stmt_close($stmt);
} else {
    echo "Error preparing statement: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
