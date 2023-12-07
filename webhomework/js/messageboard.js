var currentUsername = ''; // 全局變數來存儲當前用戶名

$(document).ready(function(e) {
    fetchUsername();
    getmessage()
    $("#post-message").click(function() {
        postmessage();
    });
    $("#logout").click(function() {
        logout();
    });
});
function fetchUsername() {
    $.ajax({
        url: 'http://localhost/web/get_username.php', // 確保這是正確的路徑
        type: 'GET',
        success: function(username) {
            // 更新 username-display 元素
            $('#username-display').html('<a href="#">Welcome, ' + username + '</a>');
            currentUsername = username;
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
function postmessage() {
    $.ajax({
        url: 'http://localhost/web/postmessage.php', // 確保這是正確的路徑
        type: 'POST',
        data: {
            username: currentUsername,
            messagetitle: $("#message-title").val(),
            messagecontent: $("#message-content").val(),
            

        },
        success: function() {
            // 更新 username-display 元素
            $("#message-title").val("");
            $("#message-content").val("");
            getmessage()
        },
        error: function(error) {
            console.log('Error fetching username:', error);
        }
    });
}

function getmessage() {
    $.ajax({
        url: 'http://localhost/web/getmessage.php',
        type: 'GET',
        dataType: 'json',
        success: function(messages) {
            var messageBoard = $('.message-board');
            messageBoard.empty(); // 清空留言板

            messages.forEach(function(message) {
                var buttons = `<button class="btn btn-primary view-replies" data-message-id="${message.id}">查看回復</button>`;
                
                // 如果当前用户是留言的作者，显示额外的按钮
                if (currentUsername === message.username) {
                    buttons += `
                        <button class="btn btn-secondary edit-message" data-message-id="${message.id}">修改留言</button>
                        <button class="btn btn-danger delete-message" data-message-id="${message.id}">刪除留言</button>
                    `;
                }

                var messageElement = `
                    <div class="message">
                        <h3>${message.messagetitle}</h3>
                        <p>${message.messagecontent}</p>
                        <span>${message.username}</span> <span>${message.time}</span>
                        <div class="message-actions">
                            ${buttons}
                        </div>
                    </div>
                `;
                messageBoard.append(messageElement);
            });

            // 绑定事件到新创建的按钮
            bindMessageActions();
        },
        error: function(error) {
            console.log('Error fetching messages:', error);
        }
    });
}

function bindMessageActions() {
    $('.edit-message').on('click', function() {
        var messageId = $(this).data('message-id'); // 获取留言ID
        var messageContent = $(this).parent().siblings('p').text();
        $('#edit-message-id').val(messageId);
        $('#edit-message-content').val(messageContent);
        $('#editMessageModal').modal('show');
    });

    $('#save-message').on('click', function() {
        var messageId = $('#edit-message-id').val();
        var newContent = $('#edit-message-content').val();
        updateMessage(messageId, newContent);
    });
    $('.delete-message').on('click', function() {
        var messageId = $(this).data('message-id');
        deleteMessage(messageId);
    });

   
    $('.view-replies').on('click', function() {
        var messageId = $(this).data('message-id');
        getReplies(messageId);
    });
}

function updateMessage(messageId, newContent) {
    $.ajax({
        url: 'http://localhost/web/updatemessage.php',
        type: 'POST',
        data: {
            messageid: messageId,
            messagecontent: newContent
        },
        success: function(response) {
            $('#editMessageModal').modal('hide');
            getmessage(); // 重新加载留言
        },
        error: function(error) {
            console.log('Error updating message:', error);
        }
    });
}
function deleteMessage(messageId) {
    if (confirm("确定要删除这条留言吗？")) {
        $.ajax({
            url: 'http://localhost/web/deletemessage.php',
            type: 'POST',
            data: { messageid: messageId },
            success: function(response) {
                getmessage(); // 重新加载留言
            },
            error: function(error) {
                console.log('Error deleting message:', error);
            }
        });
    }
}
// function getReplies(messageId) {
//    // $('#repliesModal').modal('show');
//     $.ajax({
//         url: 'http://localhost/web/getreplies.php',
//         type: 'GET',
//         data: { messageid: messageId },
//         success: function(replies) {
//             // 清空旧回复，然后添加新回复
//             $('#replies-container').empty();
//             replies.forEach(function(reply) {
//                 $('#replies-container').append('<div class="reply">' + reply.content + ' - ' + reply.username + '</div>');
//             });
//             $('#repliesModal').modal('show');
//         },
//         error: function(error) {
//             console.log('Error fetching replies:', error);
//         }
//     });
// }
function getReplies(messageId) {
    $.ajax({
        url: 'http://localhost/web/getreplies.php',
        type: 'GET',
        data: { messageid: messageId },
        success: function(replies) {
            // 清空旧回复，然后添加新回复
            var repliesContainer = $('#replies-container');
            repliesContainer.empty();
            replies.forEach(function(reply) {
                var replyElement = `<div class="reply">${reply.content} By ${reply.username}</div>`;
                repliesContainer.append(replyElement);
            });
            // 显示回复模态框前，设置隐藏域的message-id
            $('#reply-message-id').val(messageId);
            $('#repliesModal').modal('show');
        },
        error: function(error) {
            console.log('Error fetching replies:', error);
        }
    });
}
$('#post-reply').on('click', function() {
    var messageId = $('#reply-message-id').val();
    var replyContent = $('#reply-content').val();
    postReply(messageId, replyContent);
});

function postReply(messageId, replyContent) {
    $.ajax({
        url: 'http://localhost/web/postreply.php',
        type: 'POST',
        data: {
            messageid: messageId,
            replycontent: replyContent,
            username: currentUsername
        },
        success: function(response) {
            $('#reply-content').val(''); // 清空回复框
            getReplies(messageId); // 刷新回复列表
        },
        error: function(error) {
            console.log('Error posting reply:', error);
        }
    });
}


