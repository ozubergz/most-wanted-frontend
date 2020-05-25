let parallax = document.querySelector('.parallax');
let mainContainer = document.querySelector('.main-container');
mainContainer.style.display = "none";

parallax.addEventListener('click', () => {
    parallax.classList.add("scrollEffectDown");
    mainContainer.style.display = "block";
});