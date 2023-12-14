const btn1_ctn = document.getElementsByClassName('btn1_container')[0];
const one = document.querySelector('.fas');

btn1_ctn.addEventListener('click', () => {
  // Toggle classes for the moon icon, active state, and background change
  one.classList.toggle('fa-circle');
  one.classList.toggle('fa-moon');
  one.classList.toggle('active1');
  btn1_ctn.classList.toggle('changeBg');

  // Check the current mode and toggle accordingly
  if (document.body.classList.contains('dark-mode')) {
    // If in dark mode, switch to light mode
    document.body.classList.replace('dark-mode', 'light-mode');
  } else {
    // If in light mode or no mode, switch to dark mode
    document.body.classList.replace('light-mode', 'dark-mode');
  }
});
