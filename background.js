// chrome.browserAction.onClicked.addListener((tab) => {
//   const message = 'hello';
//   chrome.tabs.sendMessage(tab.id, message);
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  console.log(sender);
  if (request.message === 'newTab') {
    sendResponse({ message: 'smth happened?' });
    console.log('DONE');
  }
});
