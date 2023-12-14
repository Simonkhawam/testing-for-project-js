const loaderContainer = document.querySelector('.loader-container');

setTimeout(function () {
  document.querySelector('.loader-container').style.display = 'none';
}, 900);

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // Show the loader when a search is initiated
  loaderContainer.style.display = 'block';

  // Set a timer to hide the loader after 900ms
  setTimeout(function () {
    loaderContainer.style.display = 'none';
  }, 900);
});

