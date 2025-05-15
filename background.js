chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    console.log("URL changed:", changeInfo.url);
    checkDistraction(changeInfo.url, tabId);
  }
});

function checkDistraction(url, tabId) {
  chrome.storage.sync.get(["blockedSites", "enabled"], (data) => {
    const distractions = data.blockedSites || ["facebook.com", "youtube.com"];
    const isEnabled = data.enabled ?? true;

    if (!isEnabled) return;

    for (let site of distractions) {
      if (url.includes(site)) {
        console.log("Detected distraction:", site);

        chrome.tabs.sendMessage(tabId, {
          type: "DISTRACTION_ALERT",
          site
        });

        break;
      }
    }
  });
}
