const contactForm = document.querySelector("form");

const formMessage = document.querySelector(".submit-message");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  emailjs.sendForm("service_o6cuczd", "template_tj0gcry", "#contact-form").then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text);

      if (formMessage.classList.contains("error-color")) {
        formMessage.classList.replace("error-color", "success-color");
      } else {
        formMessage.classList.add("success-color");
      }

      if (formMessage.classList.contains("hidden")) {
        formMessage.classList.toggle("hidden");
      }
      formMessage.innerHTML = `<p>Obrigado pela sua mensagem! Iremos entrar em contacto assim que possível</p>`;
    },
    (error) => {
      console.log("FAILED...", error);

      if (formMessage.classList.contains("success-color")) {
        formMessage.classList.replace("success-color", "error-color");
      } else {
        formMessage.classList.add("error-color");
      }

      if (formMessage.classList.contains("hidden")) {
        formMessage.classList.toggle("hidden");
      }
      formMessage.innerHTML = `<p>A sua mensagem não foi enviada: ${error}</p>`;
    }
  );
});
