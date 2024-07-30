import projects from "./projects.js";

const hamburgerIcon = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".nav-mobile");

hamburgerIcon.addEventListener("click", () => {
  if (mobileMenu.classList.contains("no-width")) {
    mobileMenu.classList.replace("no-width", "full-width");
    hamburgerIcon.classList.toggle("open");

    //Avoid scroll when menu is open
    document.body.classList.toggle("overflow-y-hidden");
  } else {
    mobileMenu.classList.replace("full-width", "no-width");
    hamburgerIcon.classList.toggle("open");

    //Avoid scroll when menu is open, set timeour to avoid scrollbar appearing while the transition is running
    setTimeout(() => {
      document.body.classList.toggle("overflow-y-hidden");
    }, 510);
  }
});

const masonryContainer = document.querySelector(".masonry");

//PORTFOLIO PAGE MASONRY
document.addEventListener("DOMContentLoaded", () => {
  masonryContainer.innerHTML = projects
    .map(
      (project, index) =>
        `<div data-project-id="${index}" class="project-card item opacity-intro-effect" style="height: ${project.height}px; background: center no-repeat url(${project.image}); background-size: cover;">
          <div><h3>${project.title}</h3></div>
          <div>
            <p>ano: <span>${project.year}</span></p>
            <p>categoria: <span>${project.tags[1]}</span></p>
          </div>
          </div>`
    )
    .join("");
  createMasonry();
  handleModal();
});

const categoriesFilter = document.querySelectorAll("input[name='category']");

categoriesFilter.forEach((category) => {
  category.addEventListener("change", (event) => {
    masonryContainer.innerHTML = projects
      .map((project, index) => {
        if (project.tags.includes(event.target.value)) {
          return `<div data-project-id="${index}" class="project-card item opacity-intro-effect" style="height: ${project.height}px; background: center no-repeat url(${project.image}); background-size: cover;">
          <div><h3>${project.title}</h3></div>
          <div>
            <p>ano: <span>${project.year}</span></p>
            <p>categoria: <span>${project.tags[1]}</span></p>
          </div>
          </div>`;
        }
      })
      .join("");
    createMasonry();
    handleModal();
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

function handleModal() {
  const projectCards = document.querySelectorAll(".item");

  projectCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Find the corresponding brochure object based on the clicked card's unique identifier
      const projectId = card.dataset.projectId;
      const selectedProject = projects[projectId];

      const videosAndTitles = selectedProject.details
        .map((project) => {
          return `<div class="video-container">${project.url}</div>
        <div class="project-title is-flex justify-center text-white margin-bottom-large">
        <h3>${project.title}</h3></div>`;
        })
        .join("");

      document.querySelector("#modal-project").innerHTML = `${videosAndTitles}
      <div class="project-description margin-top-medium is-flex justify-center text-white">
      <p>${selectedProject.description}</p></div>
      <div class="project-description margin-top-medium is-flex justify-center text-white">
      <p>Ano: ${selectedProject.year}</p></div>`;

      // Show the modal
      const modal = document.getElementById("modal");
      modal.classList.add("visible");
      document.body.classList.toggle("overflow-y-hidden");
    });
  });

  const closeButton = document.getElementById("close-button");

  closeButton.addEventListener("click", function () {
    const modal = document.getElementById("modal");
    modal.classList.remove("visible");
    document.body.classList.toggle("overflow-y-hidden");

    stopVideo();
  });
}

//Close modal when clicking outside of the modal
window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.classList.remove("visible");
    document.body.classList.toggle("overflow-y-hidden");
  }
});

function stopVideo() {
  const iframe = document.querySelector("iframe");
  const iframeSrc = iframe.src;
  iframe.src = iframeSrc;
}
