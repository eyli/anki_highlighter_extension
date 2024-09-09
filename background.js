chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveText",
    title: "Save Highlighted Text",
    contexts: ["selection"],
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveText") {
      chrome.tabs.sendMessage(tab.id, { message: "getHighlightedText" }, (response) => {
        if (response && response.text) {
          fetch('https://your-backend-endpoint.com/store-text', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ highlightedText: response.text }),
          });
        }
      });
    }
  });
});
