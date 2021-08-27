const d = document

export default function ocultar_contenido() {
    const $contenido = d.querySelector('div[data-ocultar]')

    // ocultar y mostrar contenido

    const options = {
        rootMargin: '-50px'
    }

    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $contenido.classList.add('ct')
                $contenido.classList.remove('ct2')
            } else {
                $contenido.classList.add('ct2')
                $contenido.classList.remove('ct')
            }
        });
    }

    const observer = new IntersectionObserver(callback, options)

    observer.observe($contenido)

}