// Content script for Key3 Browser Extension

console.log('Key3 Content Script loaded on:', window.location.href);

// Listen for messages from background script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Content script received message:', message, 'from:', sender);
  sendResponse({ status: 'content script received' });
  return true;
});

export {};
