$(document).ready(function() {
    fetchUsername()
    getLogs();
    $('#search-btn').on('click', function() {
    var searchInput = $('#search-input').val();
    getLogs(searchInput); // 调用getLogs函数并传递搜索条件
});

});
// function fetchUsername() {
//     $.ajax({
//         url: 'http://localhost/web/get_username.php', // 確保這是正確的路徑
//         type: 'GET',
//         success: function(username) {
//             // 更新 username-display 元素
//             $('#username-display').html('<a href="#">Welcome, ' + username + '</a>');
//             currentUsername=username;
//         },
//         error: function(error) {
//             console.log('Error fetching username:', error);
//         }
//     });
// }
function fetchUsername() {
    $.ajax({
        url: 'http://localhost/web/get_username.php', // 确保这是正确的路径
        type: 'GET',
        success: function(username) {
            // 更新 username-display 元素
            $('#username-display').html('<a href="#">Welcome, ' + username + '</a>');
            currentUsername = username;

            // 如果用户名不是"admin"，显示无权限信息
            if(username !== "admin") {
                // 隐藏管理面板
                $('.admin-panel').hide();
                
                // 显示无权限信息
                $('body').append('<p>您無權限閱讀。</p>');
                
                // 或者您也可以重定向到登录页面或其他页面
                // window.location.href = "login.html"; 或者
                // window.location.href = "unauthorized.html";
            }
        },
        error: function(error) {
            console.log('Error fetching username:', error);
        }
    });
}

function getLogs(searchQuery) {
    // 如果没有提供搜索词，则默认为空字符串
    searchQuery = searchQuery || '';
    $.ajax({
        url: 'http://localhost/web/fetch_logs.php',
        type: 'GET',
        data: { search: searchQuery },
        dataType: 'json',
        success: function(logs) {
            // ... 省略填充表格的代码 ...
            var tableBody = $("#logs-table tbody");
                         tableBody.empty(); // 清空现有的日志
                        logs.forEach(function(log) {
                            var row = "<tr>" +
                                      "<td>" + log.username + "</td>" +
                                      "<td>" + log.time + "</td>" +
                                      "<td>" + log.behavior + "</td>" +
                                   "</tr>";
                            tableBody.append(row);
                        });
        },
        error: function(error) {
            console.error('Error fetching logs:', error);
        }
    });
}

