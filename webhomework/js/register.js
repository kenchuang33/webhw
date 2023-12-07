$(document).ready(function(e) {
    

    $("#register").click(function() {
        if($("#username").val() != "" && $("#password").val() != ""&&$("#email").val() != ""&&$("#color").val() != "" ){
            $.ajax({
                type: "POST",
                url:"http://localhost/web/register.php",
                data: {
                    username: $("#username").val(),
                    password: $("#password").val(),
                    email: $("#email").val(),
                    color: $("#color").val(),
                    sex: $("input[name='gender']:checked").val()

                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                },
                success: function(output) {
                    console.log(output);
                   
                    if (output === "success") {
                        // 登入成功，顯示 "註冊成功" 訊息框
                        alert("註冊成功");

                        // 重定向到 member.html
                        window.location.href = "member.html";
                    } else if (output === "duplicate") {
                        // ID 已經存在，顯示 "已有相同ID" 訊息框
                        alert("已有相同ID");
                    } 

                    $("#username").val("");
                    $("#password").val("");
                    $("#email").val("");
                    $("#color").val("");
                    $("input[name='gender']:checked").val("");
                }
            });
        }
    });
});

