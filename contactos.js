const contactForm = document.querySelector("form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  emailjs.sendForm("kAIuS0AdfjwU0wsp", "template_tj0gcry", contactForm).then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text);
    },
    (error) => {
      console.log("FAILED...", error);
    }
  );
});
