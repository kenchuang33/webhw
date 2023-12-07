var currentUsername = ''; // 全局變數來存儲當前用戶名

$(document).ready(function(e) {
    fetchUsername();
    
    // 綁定 'submit' 事件到表單上而不是按鈕的 'click' 事件
    $("#file-upload-form").submit(function(event) {
        event.preventDefault(); // 阻止表單的默認提交
        upload(); // 調用 upload 函數
        
    });
   
});

function fetchUsername() {
    $.ajax({
        url: 'http://localhost/web/get_username.php', // 確保這是正確的路徑
        type: 'GET',
        success: function(username) {
            // 更新 username-display 元素
            $('#username-display').html('<a href="#">Welcome, ' + username + '</a>');
            currentUsername = username; // 儲存獲取的用戶名到全局變數
            get_file();
        },
        error: function(error) {
            console.log('Error fetching username:', error);
        }
    });
}
function upload(username) {
    var formData = new FormData($('#file-upload-form')[0]); // 獲取表單並創建 FormData
    formData.append('username', currentUsername); // 將用戶名添加到表單數據中

    $.ajax({
        url: 'http://localhost/web/upload.php',
        type: 'POST',
        data: formData,
        contentType: false, // 這告訴 jQuery 不要設置 Content-Type 請求頭
        processData: false, // 這告訴 jQuery 不要處理發送的數據
        success: function(response) {
            alert(response); // 顯示成功信息
            // TODO: 在這裡實現上傳成功後的邏輯，比如更新檔案列表
            get_file();
        },
        error: function(xhr, status, error) {
            console.error('Error uploading file:', error);
        }
    });
}
function get_file() {
    var data = { username: currentUsername };
    $.ajax({
        type: "POST",
        url: "http://localhost/web/get_files.php",
        data: data,
        dataType: "json",
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        },
        success: function(output) {
            var table = "";
            for (var num = 0; num < output.length; num++) {
                table += "<tr><td>" + output[num].username + "</td>";
                table += "<td>" + output[num].filename + "</td>";
                table += "<td>" + output[num].filesize + "</td>";
                table += "<td>" + output[num].time + "</td>";
                table += "<td>";
                table += "<a href='http://localhost/web/downloadFile.php?filename=" + encodeURIComponent(output[num].filename) + "' class='btn btn-primary btn-sm'>下載</a>";
                table += "<button class='btn btn-primary btn-sm' onclick='showRenameModal(\"" + output[num].filename + "\")'>更改檔名</button> ";
                table += "<button class='btn btn-primary btn-sm' onclick='deleteFile(\"" + output[num].filename + "\")'>刪除</button>";
                
                table += "</td></tr>";
            }

            $("#file-table tbody").html(table);
        }
    });
}
function showRenameModal(filename) {
    $('#new-filename').val(filename); // 將當前檔名設為輸入框的值
    $('#new-filename').data('old-filename', filename); // 存储旧文件名
    $('#renameModal').modal('show'); // 顯示模態框
}
function updateFileName() {
    //var oldFilename = $('#new-filename').attr('value'); // 獲取舊檔名
    var oldFilename = $('#new-filename').data('old-filename');
    var newFilename = $('#new-filename').val(); // 獲取新檔名

    console.log("Old Filename: " + oldFilename);
    console.log("New Filename: " + newFilename);
    
    if (newFilename !== null && newFilename !== "" && newFilename !== oldFilename) {
        $.ajax({
            url: 'http://localhost/web/rename_file.php', // PHP 腳本路徑
            type: 'POST',
            data: { oldFilename: oldFilename, newFilename: newFilename },
            success: function(response) {
                alert(response);
                $('#renameModal').modal('hide'); // 關閉模態框
                get_file(); // 重新獲取檔案列表
            },
            error: function(xhr, status, error) {
                console.error('Error renaming file:', error);
            }
        });
    } else {
        alert("檔名沒有變更或為空！");
    }
}
function deleteFile(filename) {
    if (confirm("確定要刪除 " + filename + " 嗎？")) {
        $.ajax({
            url: 'http://localhost/web/deleteFile.php',
            type: 'POST',
            data: { filename: filename },
            success: function(response) {
                alert(response);
                get_file(); // 重新获取文件列表
            },
            error: function(xhr, status, error) {
                console.error('Error deleting file:', error);
            }
        });
    }
}

