document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle");
  const sites = document.getElementById("sites");
  const saveBtn = document.getElementById("save");

  chrome.storage.sync.get(["enabled", "blockedSites"], (data) => {
    toggle.checked = data.enabled ?? true;
    sites.value = (data.blockedSites || []).join(", ");
  });

  toggle.addEventListener("change", () => {
    chrome.storage.sync.set({ enabled: toggle.checked });
  });

  saveBtn.addEventListener("click", () => {
    const list = sites.value.split(",").map(s => s.trim());
    chrome.storage.sync.set({ blockedSites: list });
    alert("Đã lưu!");
  });
});
