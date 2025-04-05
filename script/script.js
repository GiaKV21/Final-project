document.addEventListener("DOMContentLoaded", function () {
  const images = ["img/slide1.jfif", "img/slide2.jfif"];
  let index = 0;
  const slider = document.querySelector(".background-slider");

  function changeBackground() {
    slider.classList.add("fade-out");
    setTimeout(() => {
      slider.style.backgroundImage = `url(${images[index]})`;
      slider.classList.remove("fade-out");
      index = (index + 1) % images.length;
    }, 500);
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
    photo: "img/d3.svg",
    profession: "Graphic Designer",
    name: "Irma Sokhadze",
  },
  {
    text: "A fantastic experience from start to finish. Their attention to detail is unmatched!",
    photo: "img/d4.svg",
    profession: "Marketing Manager",
    name: "Gia SuramelaShvili",
  },
  {
    text: "Highly recommend! They delivered exactly what we envisioned, on time and within budget.",
    photo: "img/d5.svg",
    profession: "Web Developer",
    name: "Merab Sephashvili",
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
/* final projects */
const filterButtons = document.querySelectorAll(".categories li");
const projectItems = document.querySelectorAll(
  ".project-item, .project-item-gray"
);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    projectItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      if (filterValue === "all" || itemCategory === filterValue) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});
/* contact form */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const modal = document.getElementById("successModal");
  const closeBtn = document.getElementById("closeModal");

  // Show modal
  const showModal = () => {
    modal.style.display = "flex";
  };

  // Hide modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Submit handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      website: form.website.value.trim(),
      message: form.message.value.trim(),
    };

    const mainURL = "https://borjomi.loremipsum.ge/api/send-message";
    const backupURL = "https://jsonplaceholder.typicode.com/posts";

    try {
      const response = await fetch(mainURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 1) {
        showModal();
      } else {
        throw new Error("Primary failed. Switching to backup...");
      }
    } catch (error) {
      try {
        await fetch(backupURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.name,
            body: formData.message,
            userId: 1,
          }),
        });
        showModal();
      } catch (backupError) {
        console.error("Both endpoints failed", backupError);
        alert("Something went wrong. Please try again later.");
      }
    }
  });
});
