// Capture highlighted text on the page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getHighlightedText") {
    const selectedText = window.getSelection().toString();
    sendResponse({ text: selectedText });
  }
});
