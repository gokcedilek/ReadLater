console.log('injected file!');

//display a popup in the content page

//document.addEventListener('yourCustomEvent', function (e) {});

// document.getElementById('page').innerHTML = 'lalala'; //must be the url of the page

// document.getElementById('later').addEventListener('click', function (e) {
//   //hide this div
//   document.getElementById('chooseOne').style.display = 'none';
// });

// document.getElementById('now').addEventListener('click', function (e) {
//   console.log('hi!');
// });

//listen for a customEvent from the content script
document.addEventListener('createRecommendation', function (e) {
  console.log(e);
  //we need e.detail --> url of the page!
  //how to create a "Recommendation box"??
});
