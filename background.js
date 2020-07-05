// chrome.browserAction.onClicked.addListener((tab) => {
//   const message = 'hello';
//   chrome.tabs.sendMessage(tab.id, message);
// });

let folder_id;

//create the folder when the extension is first installed
chrome.runtime.onInstalled.addListener(function () {
  chrome.bookmarks.create({ title: 'ReadLater' }, function (newFolder) {
    console.log(`added extension folder with id ${newFolder.id}`);
    folder_id = newFolder.id;
  });
});

//listener 1: listen for events from popup.js, an event can be triggered at any tab, thus need to get the current tab, add tab's url to the extension's bookmarks folder
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'addNewPage') {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (tabs) {
        console.log(tabs[0]);
        addPage(folder_id, tabs[0].title, tabs[0].url);
      }
    );
    sendResponse({ message: 'page added to bookmarks' });
  }
});

function addPage(parentId, title, url) {
  chrome.bookmarks.create({ parentId, title, url });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'getAllPages') {
    chrome.bookmarks.getChildren(folder_id, function (pages) {
      console.log('getting all pages!');
      console.log(pages);
      const senderTab = sender.tab;
      chrome.tabs.sendMessage(senderTab.id, { message: pages }, function (
        response
      ) {});
    });
  }
});
