const d = document

export function scroll(arrow, header) {
    const $up = d.querySelector(arrow),
        $header = d.querySelector(header)

    let posicionPrincipal = window.pageYOffset

    window.addEventListener('scroll', e => {
        // ocultar y mostrar boton de scroll
        if (scrollY > 250) {
            $up.classList.remove('hidden')
        } else {
            $up.classList.add('hidden')
        }

        // ocultar y mostrar header
        let desplazamientoActual = window.pageYOffset

        if (posicionPrincipal >= desplazamientoActual) {
            $header.style.top = '0px'
        } else {
            $header.style.top = '-100px'
        }

        posicionPrincipal = desplazamientoActual
    })

    d.addEventListener('click', e => {
        if (e.target.matches(arrow + ' *')) {
            window.scrollTo({
                behavior: "smooth",
                top: 0
            })
        }
    })
}

// barra de progreso
export function progress(progress) {
    const $body = d.querySelector('.body'),
        $progress = d.querySelector(progress)

    let porcentaje = $body.getBoundingClientRect()
    $progress.max = `${d.documentElement.scrollHeight - d.documentElement.clientHeight}`

    window.addEventListener('scroll', e => {
        $progress.value = `${scrollY}`
    })
}