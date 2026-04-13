chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translate",
    title: "Translate to Darija",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "translate") {
    chrome.storage.local.set({ selectedText: info.selectionText }, () => {
      chrome.sidePanel.open({ tabId: tab.id });
    });
  }
});