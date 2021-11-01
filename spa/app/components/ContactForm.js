export function ContactForm() {
  const d = document,
    $form = d.createElement("form"),
    $styles = d.getElementById("dynamic-style");

  $form.id = "form-validation";

  $styles.innerHTML = `
  :root {
    --primary-color: rgb(198, 198, 5);
    --secundary-color: rgb(20, 20, 20);
    --background: rgb(230, 230, 230);
    --yellow: yellow;
    --darkColor: #222;
    --form-ok: rgb(2, 94, 2);
    --form-error: rgb(228, 0, 0);
  }

  .container {
    width: 1200px;
    max-width: 90vw;
    margin: 0 auto;
    font-size: 1.5rem;
    font-family: Arial, Helvetica, sans-serif;
    padding: 50px 0;
    text-align: center;
  }

  /* Formulario */
  #form-validation {
    margin-bottom: 20px;
  }

  #form-validation input, #form-validation textarea {
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin-top: 20px;
    border-radius: 5px;
    resize: none;
    border: thin solid black;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
  }

  #form-validation .btn-form {
    display: block;
    margin: 0 auto;
    padding: 5px;
    width: 50%;
    font-size: medium;
    font-weight: 400;
    margin-top: 20px;
    border: 1px solid black;
    cursor: pointer;
  }

  #form-validation .valid {
    border: 2px solid var(--form-ok);
    outline: none;
  }

  #form-validation .invalid {
    border: 2px solid var(--form-error);
    outline: none;
  }

  .error {
    position: relative;
    display: block;
    top: -2px;
    font-size: 60%;
    background-color: var(--form-error);
    color: white;
    transition: all 800ms ease;
    padding: .5rem;
  }


  .error.active {
    display: block;
    animation: message 1s 1 normal 0s ease-out both;
  }

  .none {
    display: none;
  }

  @keyframes message {
    0% {
        visibility: hidden;
        opacity: 0;
    }

    100% {
        visibility: visible;
        opacity: 1;
    }
  }

  `;

  $form.innerHTML = `
      <input type="text" name="name" placeholder="Escribe tu nombre"
      title="Este campo solo recibe letras y espacio en blanco" pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$"
      data-required>

      <input type="email" name="email" placeholder="Escribe tu email" title="Email incorrecto"
      pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" data-required>

      <input type="text" name="asunto" placeholder="Asunto" title="El asunto es requerido">

      <textarea name="comentario" cols="30" rows="10" placeholder="Escribe tu comentario"
       data-pattern="^.{1,250}$" title="Tu comentario no puede exceder los 250 caracteres"
        data-required></textarea>

        <input type="submit" value="Enviar" class="btn-form">

        <img src="../multi/loader.svg" alt="loader" class="form-loader none">
        <p class="response none">Los datos han sido enviado</p>
  `;

  function validation(form) {
    const $form = d.querySelector(form),
      $inputs = d.querySelectorAll(form + " [data-required]"),
      $response = d.querySelector(".response");

    let pattern = null;

    $inputs.forEach((input) => {
      const $span = d.createElement("span");
      $span.id = input.name;
      $span.className = "error none";
      $span.textContent = input.title;
      input.insertAdjacentElement("afterend", $span);
    });

    d.addEventListener("submit", (e) => {
      if (e.target.matches(form)) {
        e.preventDefault();

        // no le envio nada al fetch
        let options = {
          method: "POST",
          body: new FormData(e.target),
        };

        $inputs.forEach((input) => {
          pattern = input.pattern || input.dataset.pattern;
          let regex = new RegExp(pattern);

          if (!input.value) {
            d.getElementById(input.name).textContent =
              "Este campo no puede estar vacio";
            d.getElementById(input.name).classList.add("active");
            input.classList.remove("valid");
            input.classList.add("invalid");
          } else {
            d.getElementById(input.name).textContent = input.title;
          }

          if (regex.exec(input.value) && input.value) {
            d.querySelector(".form-loader").classList.remove("none");
            // si los campos no estan vacios y cumplen con la expresion le envio las opciones al fetch
            options = {
              method: "POST",
              body: new FormData(e.target),
              mode: "cors",
            };
          } else {
            d.querySelector(".form-loader").classList.add("none");
            options = null;
          }
        });

        fetch("https://formsubmit.co/ajax/xnoverz99@gmail.com", options)
          .then((res) => (res.ok ? res.json() : Promise.reject(res)))
          .then((json) => {
            console.log(json);
            d.querySelector(".form-loader").classList.add("none");
            $response.classList.remove("none");
            $response.textContent = json.message;
          })
          .catch((err) => {
            console.log(err);
            let message = err.statusText || "Ocurrio un error";
            $response.textContent = `Error ${err.status}: ${message}`;
          })
          .finally(() =>
            setTimeout(() => {
              $response.textContent = "";
              $response.classList.add("none");
            }, 3000)
          );
      }
    });

    d.addEventListener("keyup", (el) => {
      if (el.target.matches(form + " [data-required]")) {
        pattern = el.target.pattern || el.target.dataset.pattern;

        if (pattern && el.target.value !== "") {
          let regex = new RegExp(pattern);

          if (!regex.exec(el.target.value)) {
            d.getElementById(el.target.name).classList.add("active");
            d.getElementById(el.target.name).textContent = el.target.title;
            el.target.classList.remove("valid");
            el.target.classList.add("invalid");
          } else {
            d.getElementById(el.target.name).classList.remove("active");
            el.target.classList.remove("invalid");
            el.target.classList.add("valid");
          }
        } else {
          d.getElementById(el.target.name).classList.remove("active");
          el.target.classList.remove("invalid");
          el.target.classList.remove("valid");
        }
      }
    });
  }

  setTimeout(() => {
    validation("#form-validation");
  }, 100);

  return $form;
}
