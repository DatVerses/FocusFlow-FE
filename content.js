chrome.scripting.executeScript({
  target: { tabId },
  files: ["content.js"]
}, () => {
  chrome.tabs.sendMessage(tabId, {
    type: "DISTRACTION_ALERT",
    site: "facebook.com"
  });
});
