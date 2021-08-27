const d = document

export default function sorteo(lista,btn) {

    d.addEventListener('click', e => {
        if(e.target.matches(btn)) {
            const $hijos = d.querySelector(lista).children
            let aleatoreo = Math.floor(Math.random()*$hijos.length)
            console.log('EL ganador es: ' + $hijos[aleatoreo].textContent)
            alert('El ganador es: ' + $hijos[aleatoreo].textContent)
        }
    })
}