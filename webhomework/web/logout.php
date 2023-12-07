<?php
       
    header('Access-Control-Allow-Origin: *');

    // 連接數據庫
    $conn = mysqli_connect("localhost", "root", "", "example_web");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    mysqli_query($conn, "set names utf8");

    // 修改 SQL 查詢，將所有 user 欄位值更新為 0
    $sql = "UPDATE `webmember` SET `user` = '0'";

    // 執行 SQL 查詢
    if (mysqli_query($conn, $sql)) {
        // 檢查影響的行數
        $affectedRows = mysqli_affected_rows($conn);
        echo "Number of users updated: " . $affectedRows;
    } else {
        // 如果查詢失敗，輸出錯誤信息
        echo "Error updating users: " . mysqli_error($conn);
    }

    // 關閉數據庫連接
    mysqli_close($conn);
?>
