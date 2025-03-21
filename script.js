let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  let header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 100);

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 50,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let darkModeIcon = document.querySelector("#darkMode-icon");

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle("bx-sun");
  document.body.classList.toggle("dark-mode");
};

ScrollReveal({
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form", { origin: "bottom" });
ScrollReveal().reveal(".home-content h1, .about-img img", { origin: "left" });
ScrollReveal().reveal(".home-content h3, .home-content p, .about-content", { origin: "right" });

fetch("https://manas1376.github.io/blogs.json")
  .then((response) => response.json())
  .then((data) => {
    let blogContainer = document.getElementById("blog-section");
    data.forEach((blog) => {
      let blogDiv = document.createElement("div");
      blogDiv.innerHTML = 
        <h3>${blog.title}</h3>
        <p>${blog.description}</p>
        <a href="${blog.link}">Read More</a>
      ;
      blogContainer.appendChild(blogDiv);
    });
  })
  .catch((error) => console.error("Error fetching blogs:", error));

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  let form = this;
  let formStatus = document.getElementById("form-status");

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
  })
    .then((response) => {
      formStatus.style.display = "block";
      if (response.ok) {
        formStatus.style.color = "green";
        formStatus.innerText = "✅ Message sent successfully!";
        form.reset();
      } else {
        formStatus.style.color = "red";
        formStatus.innerText = "❌ Error sending message.";
      }
    })
    .catch((error) => {
      formStatus.style.display = "block";
      formStatus.style.color = "red";
      formStatus.innerText = "❌ Network error. Please try again.";
    });
});
