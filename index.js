document.getElementById('resume-link-1').addEventListener("click", () => {
    window.open('https://drive.google.com/file/d/10JrRdhqhGNTuAvklIAGXqTB4usqYRaPu/view?usp=share_link', '_blank', 'noopener, noreferrer');

})

document.getElementById('resume-link-2').addEventListener("click", () => {
    window.open('https://drive.google.com/file/d/10JrRdhqhGNTuAvklIAGXqTB4usqYRaPu/view?usp=share_link', '_blank', 'noopener, noreferrer');
})


/* ----------------------- */

const hamburger = document.querySelector('.hamburger');
const navLink = document.querySelector('.nav__link-container');

hamburger.addEventListener('click', () => {
  navLink.classList.toggle('hide');
});