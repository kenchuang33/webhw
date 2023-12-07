$(document).ready(function(e) {
    

    $("#send").click(function() {
        if($("#username").val() != "" && $("#password").val() != ""){
            $.ajax({
                type: "POST",
                url:"http://localhost/web/login.php",
                data: {
                    username: $("#username").val(),
                    password: $("#password").val()
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                },
                success: function(output) {
                    console.log(output);
                   
                    if (output === "login_success") {
                        // 登入成功，顯示 "註冊成功" 訊息框
                        alert("登入成功");

                        // 重定向到 member.html
                        window.location.href = "member.html";
                    } else if (output === "password_incorrect") {
                        // ID 已經存在，顯示 "已有相同ID" 訊息框
                        alert("密碼錯誤");
                    }  
                     else if (output === "account_not_exist") {
                        // ID 已經存在，顯示 "已有相同ID" 訊息框
                        alert("帳號不存在");
                    } 
                    
                    

                    $("#username").val("");
                    $("#password").val("");
                }
            });
        }
    });
});

