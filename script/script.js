document.addEventListener("DOMContentLoaded", function () {
  const images = ["img/picture1.jpg", "img/picture2.jpg", "img/picture3.jpg"];

  let index = 0;
  const slider = document.querySelector(".background-slider");

  function changeBackground() {
    slider.style.backgroundImage = `url(${images[index]})`;
    index = (index + 1) % images.length;
  }

  changeBackground();
  setInterval(changeBackground, 5000);
});
