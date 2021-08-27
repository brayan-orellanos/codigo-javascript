const d = document

export default function filtro(buscar, contenedores, btnReset) {
    const $reset = d.querySelector(btnReset)

    const press = e => {
        d.querySelector(buscar).value.length > 0
            ? $reset.classList.remove('filter')
            : $reset.classList.add('filter')
    }

    d.addEventListener('keyup', e => {

        if(e.target.matches(buscar)) {

            if(e.key === 'Escape') e.target.value = ''

            let re = new RegExp(e.target.value, 'gi')

            d.querySelectorAll(contenedores).forEach(ev => {
                ev.textContent.match(re) 
                    ? ev.classList.remove('filter')
                    : ev.classList.add('filter')
            })
        }

        press()
    })

    press()

    d.addEventListener('click', e => {
        if (e.target.matches(btnReset)) {
            d.querySelector(buscar).value = ''
            $reset.classList.add('filter')

            d.querySelectorAll(contenedores).forEach(ev => {
                ev.classList.remove('filter')
            })
        }
    })
}