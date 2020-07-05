//make a request to get pages
chrome.runtime.sendMessage({ message: 'getAllPages' }, function (response) {
  //we dont expect a response here
});

//receive the pages
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message.pages) {
    console.log('received pages!');
    console.log(request.message.pages);
  } else {
    console.log('nope!');
  }
});
