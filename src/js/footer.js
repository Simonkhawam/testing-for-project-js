// import { btn1_ctn } from './dark-toggle.js'

document.querySelector('.footer-currentYear').textContent = new Date().getFullYear();

(() => {
    const refs = {
      openModalBtn: document.querySelector(".footer-data-modal-open"),
      closeModalBtn: document.querySelector(".footer-data-modal-close"),
      modal: document.querySelector(".footer-data-modal"),
    };
  
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
  
    function toggleModal() {
      refs.modal.classList.toggle("footer-is-hidden");
    }
  })();

//   const btn1_ctn = document.getElementsByClassName('btn1_container')[0];
// // debugger;
//   btn1_ctn.addEventListener('click', () => {
//     document.div.classList.toggle('footer-dark-mode');
//   });


  