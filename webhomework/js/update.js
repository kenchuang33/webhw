$(document).ready(function() {
    fetchUserdetail();
    
    $("#update").click(function() {
        update();
    });
});

function fetchUserdetail() {
    $.ajax({
        url: 'http://localhost/web/showdetail.php',
        type: 'GET',
        dataType: 'json', // 確保接收 JSON 格式
        success: function(data) {
            // 填充表單
            $('#username').val(data.username);
            $('#password').val(data.password);
            $('#email').val(data.email);
            $('#color').val(data.color);
            $("input[name=gender][value=" + data.sex + "]").prop('checked', true);
        },
        error: function(error) {
            console.log('Error fetching user details:', error);
        }
    });
}

function update() {
    $.ajax({
        url: 'http://localhost/web/update.php',
        type: 'POST',
        data: {
            username: $('#username').val(),
            password: $('#password').val(),
            email: $('#email').val(),
            color: $('#color').val(),
            sex: $('input[name="gender"]:checked').val()
        },
        success: function(response) {
            alert(response); // 或其他更友好的成功訊息處理
            window.location.href = "member.html";
        },
        error: function(error) {
            console.log('Error updating user:', error);
        }
    });
}
