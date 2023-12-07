var currentUsername = ''; // 全局變數來存儲當前用戶名
$(document).ready(function() {
    // 在页面加载时检查订阅状态
    fetchUsername();
    checkSubscription();

    $('#subscribe-btn').click(function() {
        var buttonText = $(this).text();
        if(buttonText === '訂閱') {
            // 订阅逻辑
            subscribe();
        } else {
            // 取消订阅逻辑
            unsubscribe();
        }
    });
});

function checkSubscription() {
    $.ajax({
        url: 'http://localhost/web/check_subscription.php', // 您的PHP文件路径
        type: 'GET',
        data: { username: currentUsername }, // 使用实际的用户名
        success: function(response) {
            if(response === "subscribed") {
                $('#content').show();
                $('#subscribe-btn').text('取消訂閱');
            } else {
                $('#subscribe-btn').text('訂閱');
            }
        },
        error: function(error) {
            console.log('Error:', error);
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
            currentUsername = username; // 儲存獲取的用戶名到全局變數
        },
        error: function(error) {
            console.log('Error fetching username:', error);
        }
    });
}
function subscribe() {
    $.ajax({
        url: 'http://localhost/web/subscribe.php',
        type: 'POST',
        data: { username: currentUsername },
        success: function(response) {
            if(response === "subscribed") {
                $('#content').show();
                $('#subscribe-btn').text('取消訂閱');
            }
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
}
function unsubscribe() {
    $.ajax({
        url: 'http://localhost/web/unsubscribe.php', // 您需要创建这个PHP文件
        type: 'POST',
        data: { username: currentUsername },
        success: function(response) {
            if(response === "unsubscribed") {
                $('#content').hide();
                $('#subscribe-btn').text('訂閱');
            }
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
}
