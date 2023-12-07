<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost", "root", "", "example_web");
mysqli_query($conn, "set names utf8");

$username = $_POST['username']; // 這裡假設前端已經將用戶名發送過來
function formatSizeUnits($bytes) {
    if ($bytes >= 1073741824) {
        $bytes = number_format($bytes / 1073741824, 2) . ' GB';
    } elseif ($bytes >= 1048576) {
        $bytes = number_format($bytes / 1048576, 2) . ' MB';
    } elseif ($bytes >= 1024) {
        $bytes = number_format($bytes / 1024, 2) . ' KB';
    } elseif ($bytes > 1) {
        $bytes = $bytes . ' bytes';
    } elseif ($bytes == 1) {
        $bytes = $bytes . ' byte';
    } else {
        $bytes = '0 bytes';
    }

    return $bytes;
}
// 檢查是否有檔案上傳
if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
    $file = $_FILES['file'];
    $filename = $file['name'];
    $filesize = $file['size'];
    $fileTmpName = $file['tmp_name'];
    $destination = "uploads/" . $filename; // 指定上傳目錄和檔案名

    // TODO: 在此執行檔案驗證（例如，檢查檔案類型、大小等）

    // 檢查資料庫中是否已有相同的檔案名
    $sql_check = "SELECT * FROM uploaddata WHERE filename = ?";
    $stmt_check = mysqli_prepare($conn, $sql_check);
    mysqli_stmt_bind_param($stmt_check, "s", $filename);
    mysqli_stmt_execute($stmt_check);
    $result_check = mysqli_stmt_get_result($stmt_check);
    
    if (mysqli_num_rows($result_check) > 0) {
        echo "錯誤：檔案重複，請更改檔案後重試。";
    } else {
        // 如果檔案名稱不重複，繼續執行上傳過程
        if (move_uploaded_file($fileTmpName, $destination)) {
            $time = date('Y-m-d H:i:s'); // 獲取當前時間
            $formattedSize = formatSizeUnits($filesize); // 轉換檔案大小

            // 將檔案信息插入到資料庫
            $sql = "INSERT INTO uploaddata (username, filename, filesize, time) VALUES (?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "ssss", $username, $filename, $formattedSize, $time);
            $result = mysqli_stmt_execute($stmt);

            if ($result) {
                echo "檔案上傳成功並已添加到資料庫。大小: " . $formattedSize;
            } else {
                echo "錯誤：無法將檔案信息添加到資料庫。" . mysqli_error($conn);
            }
        } else {
            echo "錯誤：無法將檔案移動到目標目錄。";
        }
    }
} else {
    echo "錯誤：沒有檔案被上傳，或存在上傳錯誤。";
}

mysqli_close($conn);
?>
