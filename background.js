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

    for (let site of distractions) {
      if (url.includes(site)) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon.png",
          title: "Tập trung nào!",
          message: `Bạn đang vào ${site} - Hãy quay lại công việc nhé!`
        });
        break;
      }
    }
  });
}
