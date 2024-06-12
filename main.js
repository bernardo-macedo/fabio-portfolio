import projects from "./projects.js";

const hamburgerIcon = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".nav-mobile");

hamburgerIcon.addEventListener("click", () => {
  if (mobileMenu.classList.contains("translate-full-x")) {
    mobileMenu.classList.replace("translate-full-x", "translate-0-x");
    hamburgerIcon.classList.toggle("open");

    //Avoid scroll when menu is open
    document.body.classList.toggle("overflow-y-hidden");
  } else {
    mobileMenu.classList.replace("translate-0-x", "translate-full-x");
    hamburgerIcon.classList.toggle("open");

    //Avoid scroll when menu is open
    document.body.classList.toggle("overflow-y-hidden");
  }
});

const masonryContainer = document.querySelector(".masonry");

//PORTFOLIO PAGE MASONRY
document.addEventListener("DOMContentLoaded", () => {
  masonryContainer.innerHTML = projects
    .map(
      (project, index) =>
        `<div class="item" style="height: ${project.height}px; background: center no-repeat url(${project.image}); background-size: cover;">${project.title}</div>`
    )
    .join("");
  createMasonry();
});

const categoriesFilter = document.querySelectorAll("input[name='category']");

categoriesFilter.forEach((category) => {
  category.addEventListener("change", (event) => {
    masonryContainer.innerHTML = projects
      .map((project, index) => {
        if (project.tags.includes(event.target.value)) {
          return `<div class="item" style="height: ${project.height}px; background: no-repeat url(${project.image})">${project.title}</div>`;
        }
      })
      .join("");
    createMasonry();
  });
});

function createMasonry() {
  if (window.screen.width < 765) {
    let masonry = new MiniMasonry({
      container: document.querySelector(".masonry"),
      baseWidth: 150,
      surroundingGutter: false,
      gutterX: 30,
      gutterY: 30,
    });
  } else {
    let masonry = new MiniMasonry({
      container: document.querySelector(".masonry"),
      baseWidth: 250,
      surroundingGutter: false,
      gutterX: 30,
      gutterY: 30,
    });
  }
}
