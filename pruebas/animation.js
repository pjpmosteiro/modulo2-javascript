/*
 * Animación del logo de la home
 */
const red = document.querySelector("#red");

function setProperty(duration) {
  red.style.animationDuration = Math.floor(Math.random() * 5 + 1) + "s";
}

function changeAnimationTime() {
  const animationDuration = Math.random();
  setProperty(animationDuration);
}

setInterval(changeAnimationTime, 1000);
