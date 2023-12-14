// modal.js

import axios from 'axios';
import apiMovie from './api-movie.js';
import { getMovieGenres } from './api-genres.js';
import apiDetails from './api-details.js';

export function openModal(movieId) {
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
  // Setează conținutul modalului aici în funcție de movieId
  const modalContent = document.querySelector('.modal-content');
  modalContent.innerHTML = `<p>Afișezi detalii pentru filmul cu ID-ul: ${movieId}</p>`;

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}
