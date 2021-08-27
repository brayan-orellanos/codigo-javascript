const d = document

export default function cambio() {
    const $sections = d.querySelectorAll('section[data-scroll-spy]')

    const callback = (entries) => {
        // console.log(entries)

        entries.forEach((entry) => {
            const id = entry.target.getAttribute('id')

            if(entry.isIntersecting) {
                d.querySelector(`a[data-scroll-spy][href="#${id}"]`).classList.add('active')
            } else {
                d.querySelector(`a[data-scroll-spy][href="#${id}"]`).classList.remove('active')
            }
        })
    }

    const options = {
        threshold: 0.30
    }

    const observer = new IntersectionObserver(callback, options)

    $sections.forEach( el => observer.observe(el))
}