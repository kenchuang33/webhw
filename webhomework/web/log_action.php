<?php
// log_action.php
header('Access-Control-Allow-Origin: *');
$conn = new mysqli("localhost", "root", "", "example_web"); // 替换为您的数据库连接信息

// 检查数据库连接
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 假设您已经有了一种方法来获取当前登录的用户名

$username = $_POST['username'] ; // 如果没有登录用户则使用'unknown'

// 检查是否收到了行为参数
if (isset($_POST['action'])) {
    $behavior = $_POST['action'];
    insertLog($username, $behavior, $conn);
    echo "Action logged";
} else {
    echo "No behavior provided";
}

// 插入日志到数据库的函数
function insertLog($username, $behavior, $mysqli) {
    $stmt = $mysqli->prepare("INSERT INTO log (username, time, behavior) VALUES (?, NOW(), ?)");
    $stmt->bind_param("ss", $username, $behavior);
    if (!$stmt->execute()) {
        // 如果执行失败，返回错误信息
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}

// 关闭数据库连接
$conn->close();
?>
