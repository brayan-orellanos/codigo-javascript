const d = document,
    w = window

export default function view(id, mq, movil, desktop) {
    let salto = w.matchMedia(mq)

    const responsive = e => {
        if(e.matches) {
            d.getElementById(id).innerHTML = desktop
        } else {
            d.getElementById(id).innerHTML = movil
        }

    }

    salto.addListener(responsive)
    responsive(salto)
}