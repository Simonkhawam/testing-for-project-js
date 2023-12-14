import { getMovieDetailsFromLocalStorage } from './modal.js';
import { createMovieCard } from './markup.js';
import { getMovieGenres } from './api-genres.js';

document.addEventListener('DOMContentLoaded', async () => {
  const watchedListSection = document.getElementById('watchedListSection');
  const watchedList = document.getElementById('watchedList');
  const showWatchedListBtn = document.getElementById('showWatchedListBtn');
  const clearWatchedListBtn = document.getElementById('clearWatchedListBtn');

  const queueListSection = document.getElementById('queueListSection');
  const queueList = document.getElementById('queueList');
  const showQueueListBtn = document.getElementById('showQueueListBtn');
  const clearQueueListBtn = document.getElementById('clearQueueListBtn');

  // Obține genurile înainte de a le folosi
  const genres = await getMovieGenres();
  // Funcție pentru a afișa filmele într-o listă
  async function displayMoviesInList(movies, listElement) {
    listElement.innerHTML = ''; // Șterge lista existentă

    // Verifică dacă există filme în listă
    if (movies.length === 0) {
      const noMoviesMessage = document.createElement('p');
      noMoviesMessage.textContent = 'No movies in this list.';
      listElement.appendChild(noMoviesMessage);
      return;
    }

    try {
      const genres = await getMovieGenres(); // Obține genurile
      // Iterează prin filme și adaugă carduri la listă
      movies.forEach(async movieId => {
        const movieDetails = await getMovieDetailsFromLocalStorage(movieId);
        if (movieDetails) {
          const movieCard = createMovieCard(movieDetails, genres); // Folosește funcția pentru a crea un card de film
          listElement.appendChild(movieCard);
        }
      });
    } catch (error) {
      console.error('Error getting movie genres:', error);
    }
  }
  // Funcție pentru ștergerea listei de filme
  function clearMovieList(listName) {
    localStorage.removeItem(listName);
    updateListDisplay();
  }

  // Funcție pentru actualizarea afișajului ambelor liste
  function updateListDisplay() {
    const watchedMovies = JSON.parse(localStorage.getItem('watched')) || [];
    const queueMovies = JSON.parse(localStorage.getItem('queue')) || [];

    displayMoviesInList(watchedMovies, watchedList);
    displayMoviesInList(queueMovies, queueList);
  }

  // Funcție pentru gestionarea clicului pe butonul de afișare a filmelor urmărite
  showWatchedListBtn.addEventListener('click', () => {
    watchedListSection.classList.toggle('visible');
    updateListDisplay();
  });

  // Funcție pentru gestionarea clicului pe butonul de ștergere a filmelor urmărite
  clearWatchedListBtn.addEventListener('click', () => {
    clearMovieList('watched');
  });

  // Funcție pentru gestionarea clicului pe butonul de afișare a listei de așteptare
  showQueueListBtn.addEventListener('click', () => {
    queueListSection.classList.toggle('visible');
    updateListDisplay();
  });

  // Funcție pentru gestionarea clicului pe butonul de ștergere a listei de așteptare
  clearQueueListBtn.addEventListener('click', () => {
    clearMovieList('queue');
  });

  // Actualizare inițială a afișajului
  updateListDisplay();
});
