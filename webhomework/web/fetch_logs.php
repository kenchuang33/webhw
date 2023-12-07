<?php
// fetch_logs.php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// 数据库连接
$conn = new mysqli("localhost", "root", "", "example_web");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 获取可能存在的搜索参数
$search = isset($_GET['search']) ? $_GET['search'] : '';

// 准备SQL语句
if (!empty($search)) {
    // 如果有搜索参数，则使用LIKE子句来过滤
    $sql = "SELECT username, time, behavior FROM log WHERE username LIKE ? ORDER BY time DESC";
    $stmt = $conn->prepare($sql);
    $likeSearch = '%' . $search . '%';
    $stmt->bind_param("s", $likeSearch);
} else {
    // 如果没有搜索参数，选择所有记录
    $sql = "SELECT username, time, behavior FROM log ORDER BY time DESC";
    $stmt = $conn->prepare($sql);
}

// 执行查询
$stmt->execute();
$result = $stmt->get_result();

$logs = array();
while ($row = $result->fetch_assoc()) {
    $logs[] = $row;
}

// 输出结果为JSON格式
echo json_encode($logs);

// 关闭连接
$stmt->close();
$conn->close();
?>
