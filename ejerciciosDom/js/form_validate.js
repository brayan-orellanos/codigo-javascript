const d = document

export default function validation(form) {
    const $form = d.querySelector(form),
        $inputs = d.querySelectorAll(form + ' [data-required]')

    let pattern = null

    $inputs.forEach(input => {
        const $span = d.createElement('span')
        $span.id = input.name
        $span.className = 'error none'
        $span.textContent = input.title
        input.insertAdjacentElement('afterend', $span)
    })


    d.addEventListener('submit', e => {
        if(e.target.matches(form)) {

            $inputs.forEach(input => {
                pattern = input.pattern || input.dataset.pattern
                
                if(input.value === '') {
                    d.getElementById(input.name).textContent = 'Este campo no puede estar vacio'
                    d.getElementById(input.name).classList.add('active')
                    input.classList.remove('valid')
                    input.classList.add('invalid')
                    e.preventDefault()
                } else {
                    d.getElementById(input.name).textContent = input.title
                }
                
                if (pattern && input.value !== '') {
                    let regex = new RegExp(pattern)
                    d.querySelector('.form-loader').classList.remove('none')
    
                    if (!regex.exec(input.value)) {
                        e.preventDefault()
                    }
                }
            })

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