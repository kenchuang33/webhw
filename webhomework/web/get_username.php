<?php
       
    header('Access-Control-Allow-Origin: *');

    // 連接數據庫
    $conn = mysqli_connect("localhost", "root", "", "example_web");
    mysqli_query($conn, "set names utf8");

    // 修改 SQL 查詢，只選擇 user 為 1 的行
    $sql = "SELECT username FROM `webmember` WHERE user = '1'";
    $send = mysqli_query($conn, $sql);

    // 檢查是否有結果
    if ($row = mysqli_fetch_assoc($send)) {
        // 如果有結果，輸出 username
        echo $row['username'];
    } else {
        // 如果沒有結果，輸出提示信息
        echo "No user found with user value 1";
    }

    // 關閉數據庫連接
    mysqli_close($conn);
?>
