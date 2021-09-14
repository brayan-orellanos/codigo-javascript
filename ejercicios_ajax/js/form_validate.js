const d = document

function validation(form) {
    const $form = d.querySelector(form),
        $inputs = d.querySelectorAll(form + ' [data-required]'),
        $response = d.querySelector('.response')

    let pattern = null

    $inputs.forEach(input => {
        const $span = d.createElement('span')
        $span.id = input.name
        $span.className = 'error none'
        $span.textContent = input.title
        input.insertAdjacentElement('afterend', $span)
    })


    d.addEventListener('submit', e => {
        if (e.target.matches(form)) {
            e.preventDefault()
            
            // no le envio nada al fetch
            options = null
            
            $inputs.forEach(input => {
                pattern = input.pattern || input.dataset.pattern
                let regex = new RegExp(pattern)

                if (!input.value) {
                    d.getElementById(input.name).textContent = 'Este campo no puede estar vacio'
                    d.getElementById(input.name).classList.add('active')
                    input.classList.remove('valid')
                    input.classList.add('invalid')
                } else {
                    d.getElementById(input.name).textContent = input.title
                }

                if (regex.exec(input.value) && input.value) {
                    d.querySelector('.form-loader').classList.remove('none')
                    // si los campos no estan vacios y cumplen con la expresion le envio las opciones al fetch
                    options = {
                        method: "POST",
                        body: new FormData(e.target),
                        mode: "cors"
                    }
                } else {
                    d.querySelector('.form-loader').classList.add('none')
                    options = null
                }
            })

            
            fetch("https://formsubmit.co/ajax/xnoverz99@gmail.com", options)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(json => {
                console.log(json)
                d.querySelector('.form-loader').classList.add('none')
                $response.classList.remove('none')
                $response.textContent = json.message
            })
            .catch(err => {
                console.log(err)
                let message = err.statusText || 'Ocurrio un error'
                $response.textContent = `Error ${err.status}: ${message}`
            })
            .finally(() => setTimeout(() => {
                $response.textContent = ''
                $response.classList.add('none')
            }, 3000))
        }

    })


    d.addEventListener('keyup', el => {
        if (el.target.matches(form + ' [data-required]')) {

            pattern = el.target.pattern || el.target.dataset.pattern

            if (pattern && el.target.value !== '') {
                let regex = new RegExp(pattern)

                if (!regex.exec(el.target.value)) {
                    d.getElementById(el.target.name).classList.add('active')
                    d.getElementById(el.target.name).textContent = el.target.title
                    el.target.classList.remove('valid')
                    el.target.classList.add('invalid')
                } else {
                    d.getElementById(el.target.name).classList.remove('active')
                    el.target.classList.remove('invalid')
                    el.target.classList.add('valid')
                }

            } else {
                d.getElementById(el.target.name).classList.remove('active')
                el.target.classList.remove('invalid')
                el.target.classList.remove('valid')
            }

        }

    })

}

d.addEventListener('DOMContentLoaded', validation('#form-validation'))