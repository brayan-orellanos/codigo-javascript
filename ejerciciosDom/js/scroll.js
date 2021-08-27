const d = document

export function scroll(arrow, header, section) {
        const $up = d.querySelector(arrow),
            $header = d.querySelector(header),
            $section = d.getElementById(section),
            $contenido = d.querySelector('.xd'),
                  // ocultar y mostrar boton de scroll
        btnScroll = e => {
            scrollY > 250
                ?$up.classList.remove('hidden')
                :$up.classList.add('hidden')
        }

        let posicionPrincipal = scrollY  

    window.addEventListener('scroll', e => {
        btnScroll()

        // ocultar y mostrar menu
        let desplazamientoActual = scrollY   

        if(posicionPrincipal >= desplazamientoActual) {
            $header.style.top = '0px'
        } else {
            $header.style.top = '-100px'
        }

        posicionPrincipal = desplazamientoActual


        // ocultar y mostrar contenido
        if($section.getBoundingClientRect().top - $section.getBoundingClientRect().height <= -150) {
            $contenido.classList.replace('ct2', 'ct')
        } else {
            $contenido.classList.replace('ct', 'ct2')
        }
    })

    d.addEventListener('click', e => {
        if(e.target.matches(arrow+' *')) {
            window.scrollTo({
                behavior: "smooth",
                top: 0
            })
        }
    })

    btnScroll()
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