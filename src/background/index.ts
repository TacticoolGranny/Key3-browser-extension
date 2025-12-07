// Background service worker for Key3 Browser Extension

console.log('Key3 Background Service Worker loaded');

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed:', details.reason);
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message, 'from:', sender);
  sendResponse({ status: 'received' });
  return true; // Keep the message channel open for async responses
});

export {};
