// modal.js

import axios from 'axios';
import apiMovie from './api-movie.js';

export async function openModal(movieId) {
  const modal = document.querySelector('.modal-movie-card');
  const overlay = document.querySelector('.overlay');
  const closeModalMovieCard = document.querySelector('.modal-movie-card-close');
  const openModalMovieCard = document.querySelector('.modal-movie-card-open');

  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  closeModalMovieCard.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Fetch movie details from your API
  try {
    const response = await axios({
      method: apiMovie.method,
      url: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      headers: apiMovie.headers,
    });

    const movieDetails = response.data;

    console.log(movieDetails);

    // Set modal content using the retrieved movie details
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
    <div>
    <img src = "https://image.tmdb.org/t/p/w500/${
      movieDetails.poster_path
    }" alt="${movieDetails.title}" class ="modal-movie-poster">
    </div>
    <div>
      <p class="modal-movie-tille">Title: ${movieDetails.title}</p>
      <p class="modal-movie-averageVote">Vote Average: ${
        movieDetails.vote_average
      }</p>
      <p class="modal-movie-voteCount">Vote count: ${
        movieDetails.vote_count
      }</p>
      <p class="modal-movie-popularity">Popularity: ${
        movieDetails.popularity
      }</p>
      <p class="modal-movie-originalTitle">Original title: ${
        movieDetails.original_title
      }</p>
      <p class="modal-movie-RealeseDate">Release Date: ${
        movieDetails.release_date
      }</p>
      <p class="modal-movie-overview">Overview: ${movieDetails.overview}</p>
      <p class="modal-movie-genders">Genres: ${movieDetails.genres
        .map(genre => genre.name)
        .join(', ')}</p>
       <button class="add-queue-btn">add to queue</button>
       <button class="add-watched-btn">add to Watched</button>
    </div>

    `;

    // Function to toggle a movie ID in local storage
    function toggleLocalStorage(movieId, key) {
      const storedIds = localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : [];

      // Check if the movie ID is in the storage
      const index = storedIds.indexOf(movieId);
      if (index !== -1) {
        // If the movie ID is found, remove it
        storedIds.splice(index, 1);
        console.log(`Movie ID ${movieId} removed from ${key}.`);
      } else {
        // If the movie ID is not found, add it
        storedIds.push(movieId);
        console.log(`Movie ID ${movieId} added to ${key}.`);
      }

      localStorage.setItem(key, JSON.stringify(storedIds));
    }

    // Function to update the button text based on the movie ID presence in local storage
    function updateButtonText(button, movieId, key) {
      const storedIds = localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : [];

      if (storedIds.includes(movieId)) {
        button.textContent = `Remove from ${
          key.charAt(0).toUpperCase() + key.slice(1)
        }`;
      } else {
        button.textContent = `Add to ${
          key.charAt(0).toUpperCase() + key.slice(1)
        }`;
      }
    }

    // Event listener for "Add to Queue" button
    const addToQueueButton = document.querySelector('.add-queue-btn');
    addToQueueButton.addEventListener('click', function () {
      // Assuming you have a way to retrieve the current movie ID
      const currentMovieId = movieId;

      // Toggle the movie ID in the queue
      toggleLocalStorage(currentMovieId, 'queue');

      // Update the button text
      updateButtonText(addToQueueButton, currentMovieId, 'queue');
    });

    // Event listener for "Add to Watched" button
    const addToWatchedButton = document.querySelector('.add-watched-btn');
    addToWatchedButton.addEventListener('click', function () {
      // Assuming you have a way to retrieve the current movie ID
      const currentMovieId = movieId;

      // Toggle the movie ID in the watched list
      toggleLocalStorage(currentMovieId, 'watched');

      // Update the button text
      updateButtonText(addToWatchedButton, currentMovieId, 'watched');
    });

    // Open the modal
    openModal();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    // Handle the error, e.g., show an error message in the modal
  }
}
// modal.js

export async function getMovieDetailsFromLocalStorage(movieId) {
  try {
    // Obține toate detaliile filmelor stocate în local storage pentru a le putea căuta
    const storedMovies = JSON.parse(localStorage.getItem('storedMovies')) || [];

    // Găsește detaliile filmului cu movieId dat în parametru
    const movieDetails = storedMovies.find(movie => movie.id === movieId);

    // Returnează detaliile găsite (sau null dacă nu a fost găsit)
    return movieDetails;
  } catch (error) {
    console.error('Error getting movie details from local storage:', error);
    throw error; // Aruncă eroarea pentru a o gestiona în altă parte, dacă este cazul
  }
}
