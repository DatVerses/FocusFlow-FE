chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        console.log("Tab đang mở: ", tab.title);
        // Bạn có thể lưu dữ liệu này vào Firebase hoặc Session Storage
    });
});
