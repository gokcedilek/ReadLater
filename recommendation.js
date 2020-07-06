//make a request to get pages
chrome.runtime.sendMessage({ message: 'getAllPages' }, function (response) {
  //we dont expect a response here
});

//receive the pages
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message.pages) {
    console.log('received pages!');
    const pages = request.message.pages;
    console.log(pages);
    const page = pages[Math.floor(Math.random() * pages.length)];
    console.log(page.url);
    //once the page is ready, make the recommendation!
    showRecommendation(page.url);
  } else {
    console.log('nope!');
  }
});

//make a recommendation with the recommended page URL
function showRecommendation(pageURL) {
  injectScript(pageURL);
}

function injectScript(pageURL) {
  //wire up the inject script
  const s = document.createElement('script');
  s.src = chrome.runtime.getURL('readlater.js');
  (document.head || document.documentElement).appendChild(s);

  //execute after the inject script is loaded
  s.onload = function () {
    const recommendedURL = pageURL;
    const myEvent = document.createEvent('CustomEvent');
    myEvent.initCustomEvent('createRecommendation', true, true, recommendedURL); //event.detail will have "url"
    document.dispatchEvent(myEvent); //publish the event
    console.log(`dispatched for url: ${recommendedURL}`);
  };
}

// const h = document.createElement('iframe');
// h.src = chrome.runtime.getURL('readlater.html');
// document.body.appendChild(h);
