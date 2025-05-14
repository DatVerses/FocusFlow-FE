document.addEventListener('DOMContentLoaded', function() {
    // Xử lý khi người dùng mở popup
    chrome.storage.local.get('tabsData', function(data) {
        document.getElementById('status').textContent = 'Dữ liệu: ' + JSON.stringify(data);
    });
});
