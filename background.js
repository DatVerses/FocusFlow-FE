chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    console.log("URL changed:", changeInfo.url);
    checkDistraction(changeInfo.url);
  }
});

function checkDistraction(url) {
  chrome.storage.sync.get(["blockedSites", "enabled"], (data) => {
    const distractions = data.blockedSites || ["facebook.com", "youtube.com"];
    const isEnabled = data.enabled ?? true;

    if (!isEnabled) return;

    for (let site of distractions) {
      if (url.includes(site)) {
        console.log("Detected distraction:", site);

        // Tạo thông báo không cần requestPermission
       chrome.notifications.create({
  type: "basic",
  iconUrl: "https://www.google.com/favicon.ico",
  title: "Tập trung nào!",
  message: `Bạn đang vào ${site} - quay lại công việc nha!`
}, () => {
  if (chrome.runtime.lastError) {
    console.error("Lỗi thông báo:", chrome.runtime.lastError);
  } else {
    console.log("Đã hiển thị thông báo");
  }
});


        break;
      }
    }
  });
}
