// gallery.js

import axios from 'axios';
import apiMovie from './api-movie.js';
import { getMovieGenres } from './api-genres.js';
import { createMovieCard } from './markup.js';
import { openModal } from './modal.js';

let currentPage = 1;
const TOTAL_PAGES = 500; // Numărul total maxim de pagini disponibile.
const ITEMS_PER_PAGE = 20; // Numărul de elemente pe pagină.
const MAX_PAGES_DISPLAYED = 5; // Numărul maxim de pagini afișate în paginare

// Funcția pentru atașarea event listener-ului la un card de film:
function attachCardClickListener(movieCard, movieId) {
  movieCard.addEventListener('click', () => {
    openModal(movieId); // Deschide fereastra modală când este apăsat un card de film.
  });
}

// Funcția pentru eliminarea event listener-ului de pe un card de film:
function removeCardClickListener(movieCard) {
  movieCard.removeEventListener('click', openModal);
}

// Când reconstruim cardurile pentru o altă pagină, eliminam event listenerii vechi înainte de a atașa noi ascultători.
// Funcția pentru afișarea cardurilor de filme:
async function displayMoviesByPage(page) {
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = ''; // Curăță cardurile de filme existente.

  try {
    const movies = await getMoviesFromApi(page);
    const genres = await getMovieGenres(); // Obține genurile

    // Eliminarea event listener-ilor de pe cardurile vechi înainte de adăugarea noilor carduri:
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(movieCard => {
      removeCardClickListener(movieCard);
      movieCard.remove();
    });

    movies.forEach(movie => {
      const movieCard = createMovieCard(movie, genres);
      movieContainer.appendChild(movieCard);
      attachCardClickListener(movieCard, movie.id);
    });
  } catch (error) {
    console.error(
      'There was a problem displaying movies for page:',
      page,
      error
    );
  }
}

// Actualizează funcția getMoviesFromApi pentru a primi pagina ca argument:
async function getMoviesFromApi(page) {
  try {
    const apiMoviePage = {
      ...apiMovie,
      url: `${apiMovie.url}&page=${page}`, // Adaugă pagina la URL-ul cererii.
    };

    const response = await axios.request(apiMoviePage);

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data.results;
  } catch (error) {
    console.error('There was a problem fetching movies for page:', page, error);
    return [];
  }
}

// Funcția pentru actualizarea paginării și afișarea cardurilor pentru pagina curentă:
async function updatePaginationAndDisplay(page) {
  try {
    currentPage = page;
    await displayMoviesByPage(currentPage);

    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.textContent = '«';
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        updatePaginationAndDisplay(1); // Du-te la prima pagină când este apăsată săgeata spre stânga
      }
    });
    pagination.appendChild(prevButton);

    const maxPages = Math.min(currentPage + 2, TOTAL_PAGES);
    const minPages = Math.max(1, maxPages - 4);

    for (let i = minPages; i <= maxPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      if (i === currentPage) {
        pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', () => {
        updatePaginationAndDisplay(i);
      });
      pagination.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = '»';
    nextButton.addEventListener('click', () => {
      if (currentPage < TOTAL_PAGES) {
        updatePaginationAndDisplay(TOTAL_PAGES); // Du-te la ultima pagină când este apăsată săgeata spre dreapta
      }
    });
    pagination.appendChild(nextButton);
  } catch (error) {
    console.error('There was a problem updating pagination:', error);
  }
}

// Apelul inițial pentru afișarea cardurilor pentru prima pagină:
updatePaginationAndDisplay(currentPage);
