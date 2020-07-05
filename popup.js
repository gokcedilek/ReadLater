document.getElementById('currentPage').addEventListener('change', function () {
  if (this.checked) {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        //notify content.js
        // chrome.tabs.sendMessage(tabs[0].id, {
        //   todo: 'newTab',
        //   tab: tabs[0],
        // });

        //notify bg.js
        chrome.runtime.sendMessage({ message: 'addNewPage' }, function (
          response
        ) {
          console.log(response.message);
        });
      }
    );
  }
});
