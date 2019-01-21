/*
 * Aquí podéis hacer los ejercicios y
 * practicar Javascript!
 */

const red = document.querySelector("#red");

console.log(red);

function setProperty(duration) {
  red.style.animationDuration = Math.floor(Math.random() * 5 + 1) + "s";
}

function changeAnimationTime() {
  const animationDuration = Math.random();
  setProperty(animationDuration);
}

setInterval(changeAnimationTime, 1000);
