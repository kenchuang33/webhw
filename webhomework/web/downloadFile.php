<?php
$filename = $_GET['filename'];
$filepath = "uploads/" . $filename; // 您存储文件的目录

if (file_exists($filepath)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . basename($filepath) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filepath));
    flush(); // 清空输出缓冲
    readfile($filepath);
    exit;
} else {
    echo "文件不存在。";
}
?>
