export default function hamburgerMenu(menu, btn, itemMenu) {

    const d = document

    d.addEventListener('click', e => {
        if(e.target.matches(btn) || e.target.matches(`${btn} *`)) {
            d.querySelector(menu).classList.toggle('oculto')
            d.querySelector(btn).classList.toggle('is-active')
        }

        if(e.target.matches(itemMenu)) {
            d.querySelector(menu).classList.toggle('oculto')
            d.querySelector(btn).classList.remove('is-active')
        }
    })

}
