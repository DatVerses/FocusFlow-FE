chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    checkDistraction(changeInfo.url);
  }
});

function checkDistraction(url) {
  chrome.storage.sync.get(["blockedSites", "enabled"], (data) => {
    const distractions = data.blockedSites || ["facebook.com", "youtube.com"];
    const isEnabled = data.enabled ?? true;

    if (!isEnabled) return;

    Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Tập trung nào!",
      message: `Bạn đang vào trang gây xao nhãng!`
    });
  }
});
  });
}
