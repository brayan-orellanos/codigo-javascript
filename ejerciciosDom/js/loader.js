const d = document

export default function loader(loader) {
    window.addEventListener('load', e => {
        d.querySelector(loader).style.display = 'none'
    })
}