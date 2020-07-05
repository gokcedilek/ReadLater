//get pages
chrome.runtime.sendMessage({ message: 'getAllPages' }, function (response) {
  console.log('in google!');
  console.log(response.message); //can i get back the pages here??
});
