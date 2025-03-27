document.addEventListener("DOMContentLoaded", function () {
  const images = ["img/slide1.jfif", "img/slide2.jfif"];

  let index = 0;
  const slider = document.querySelector(".background-slider");

  function changeBackground() {
    slider.style.backgroundImage = `url(${images[index]})`;
    index = (index + 1) % images.length;
  }

  changeBackground();
  setInterval(changeBackground, 5000);
});
/* about me */
document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.getAttribute("data-percent");
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  progressBars.forEach((bar) => observer.observe(bar));
});
/* feedback section */
const slides = [
  {
    text: "Exceptional service and creative solutions! The team went above and beyond to meet our needs.",
    photo: "photo1.jpg",
    profession: "Graphic Designer",
    name: "Mau Thomas",
  },
  {
    text: "A fantastic experience from start to finish. Their attention to detail is unmatched!",
    photo: "photo2.jpg",
    profession: "Marketing Manager",
    name: "Alex Carter",
  },
  {
    text: "Highly recommend! They delivered exactly what we envisioned, on time and within budget.",
    photo: "photo3.jpg",
    profession: "Web Developer",
    name: "Sam Rivera",
  },
];

const recommendationText = document.querySelector(".rec-recommendation-text");
const profilePhoto = document.querySelector(".rec-profile-photo");
const profession = document.querySelector(".rec-profession");
const name = document.querySelector(".rec-name");
const buttons = document.querySelectorAll(".rec-slider-btn");

function updateSlide(slideIndex) {
  const slide = slides[slideIndex];
  recommendationText.textContent = slide.text;
  profilePhoto.src = slide.photo;
  profession.textContent = slide.profession;
  name.textContent = slide.name;

  buttons.forEach((btn) => btn.classList.remove("rec-active"));
  buttons[slideIndex].classList.add("rec-active");

  const content = document.querySelector(".rec-slide-content");
  const image = document.querySelector(".rec-profile-photo");

  content.classList.remove("show");
  image.classList.remove("show");

  void content.offsetWidth;

  content.classList.add("fade", "show");
  image.classList.add("fade", "show");
}

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    updateSlide(index);
  });
});

updateSlide(0);
