var currentUsername = ''; // 全局變數來存儲當前用戶名
$(document).ready(function(e) {
    refresh();
    fetchUsername();
    
    $("#send").click(function() {
        refresh();
    });
    $("#logout").click(function() {
        logout();
    });
    $("#mem_update").click(function() {
        var action = '前往更新頁面'; // 根据实际行为定义
        logAction(action);
    });
    $("#mem_upload").click(function() {
        var action = '前往上傳頁面'; // 根据实际行为定义
        logAction(action);
    });
    $("#mem_messageboard").click(function() {
        var action = '前往留言板頁面'; // 根据实际行为定义
        logAction(action);
    });
    $("#mem_sub").click(function() {
        var action = '前往訂閱頁面'; // 根据实际行为定义
        logAction(action);
    });
});
function refresh() {
    $.ajax({
        type: "POST",
        url: "http://localhost/web/showmember.php",
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        },
        success: function(output) {
            output = $.parseJSON(output);
            console.log(output);
            var table = "";
            for (var num = 0; num < output.length; num++) {
                table += "<tr><td>" + output[num][0] + "</td>";
                table += "<td>" + output[num][1] + "</td>";
                table += "<td>" + output[num][2] + "</td>";
                table += "<td>" + output[num][3] + "</td>";
                table += "<td>" + output[num][4] + "</td>";
               
            }

            $("#message_table").html(table);
        }
    });
}
function fetchUsername() {
    $.ajax({
        url: 'http://localhost/web/get_username.php', // 確保這是正確的路徑
        type: 'GET',
        success: function(username) {
            // 更新 username-display 元素
            $('#username-display').html('<a href="#">Welcome, ' + username + '</a>');
            currentUsername=username;
        },
        error: function(error) {
            console.log('Error fetching username:', error);
        }
    });
}
function logout() {
    $.ajax({
        url: 'http://localhost/web/logout.php', // 確保這是正確的路徑
        type: 'POST',
        success: function() {
            // 更新 username-display 元素
            window.location.href = "index.html";
        },
        error: function(error) {
            console.log('Error fetching username:', error);
        }
    });
}
function logAction(action) {
    $.ajax({
        url: 'http://localhost/web/log_action.php', // PHP日志处理脚本的路径
        type: 'POST',
        data: { action: action ,username:currentUsername},
        success: function(response) {
            console.log('Action logged successfully');
        },
        error: function(error) {
            console.error('Error logging action:', error);
        }
    });
}
