// Manejo de atributos ----------------------------------------

// document.documentElement es el archivo html completo
console.log(document.documentElement)

// llamo el atributo en el html
console.log(document.documentElement.lang)

// con getAtribute llamo el valor del atributo indicado
console.log(document.querySelector(".link-dom").getAttribute("href"))

// con setAtribute cambio el valor de un atributo
document.documentElement.setAttribute("lang","es")
console.log(document.documentElement.lang)

// es buena practica poner $ en las variables de html
const $linkDom = document.querySelector(".link-dom")

$linkDom.setAttribute("target","_blank")

// rel="noopener sirve para evitar hackeos si la pagina se habre en nueva pestaña"
$linkDom.setAttribute("rel","noopener")

// con has preguntamos si existe el atribute
console.log($linkDom.hasAttribute("rel"))

// con remove puedo quitar el atributo
$linkDom.removeAttribute("rel")
console.log($linkDom.hasAttribute("rel"))

// data-atributes

console.log($linkDom.getAttribute("data-description"))



// style-------------------------------------------------------------------------

// formas de entrar a los estilos en el html

console.log($linkDom.style)
console.log($linkDom.getAttribute("style"))
console.log(getComputedStyle($linkDom).getPropertyValue("background-color"))

// formas de cambiar los estilos en el html

$linkDom.style.setProperty("text-decoration", "none")
$linkDom.style.setProperty("color", "white")
$linkDom.style.display = "block"
$linkDom.style.textAling = "center"

// variables CSS

const $html = document.documentElement,
      $body = document.body 
      
// para acceder a los estilos de css es con getComputedStyle      
let varDarkColor = getComputedStyle($html).getPropertyValue("--darkColor"),
    varYellowColor = getComputedStyle($html).getPropertyValue("--yellow")

console.log(varDarkColor, varYellowColor)

$body.style.color = varDarkColor


// manejando clases----------------------------------------------------

const $card = document.querySelector(".card")

console.log($card)
console.log($card.className)
console.log($card.classList)

// con add se añade una nueva clase
$card.classList.add("rotate-45")
console.log($card.classList.contains("rotate-45"))

// con remove quito una clase
$card.classList.remove("rotate-45")
console.log($card.classList.contains("rotate-45"))

// toggle añade una clase si no esta, si esta la quita
$card.classList.toggle("rotate-45")
console.log($card.classList.contains("rotate-45"))

// reemplazar una clase
$card.classList.replace('rotate-45', 'rotate-135')


// texto-------------------------------------------------------------

const $queDom = document.getElementById("que-es")

let text = `
    <p>
        El Modelo de Objetos del Documento (<b><i>DOM - Document Object Model </i></b>) es un                    
        API para documentos HTML y XML.
    </p>

    <p>
        Éste provée una representación estructural del documento, permitiendo modificar su contenido y presentación visual mediante código JS.
    </p>

    <p>
        <mark> El DOM no es parte de la especificación de JavaScript, es una API para los navegadores.</mark>
    </p>
`

// insertar contenido desde js a html, el mejor es innerHTML
$queDom.innerText = text
$queDom.textContent = text
$queDom.innerHTML = text
$queDom.outerHTML = text


// recorriendo el DOM-------------------------------------------------------------------------------------------------------------------------------------

const $cards = document.querySelector(".cards")
console.log($cards)

// obtener hijo
console.log($cards.children)

// obtener padre
console.log($cards.parentElement)

// obtener primer hijo
console.log($cards.firstElementChild)

// obtener ultimo hijo
console.log($cards.lastElementChild)

// obtener el elemento anterior
console.log($cards.previousElementSibling)

// obtener el elemento siguiente
console.log($cards.nextElementSibling)

// obtener el elemento padre especificado mas cercano

console.log($cards.children[2].closest("section"))


// creando elementos-------------------------------------------------------------------------------------------------------------------------

const $figure = document.createElement("figure"),
      $img = document.createElement("img"),
      $figcaption = document.createElement("figcaption"),
      $figcaptionText = document.createTextNode("Animals")

$img.setAttribute("src", "http://placeimg.com/200/200/animals")
$img.setAttribute("alt", "animals")
$figure.appendChild($img)
$figcaption.appendChild($figcaptionText)
$figure.appendChild($figcaption)
$figure.classList.add("card")
$cards.appendChild($figure)

// fragmentos, sirve para guardar todos los elementos y hacer una sola carga al dom para no consumir tantos recursos

document.write('<h2>De aqui para abajo se creo con js</h2>')
document.write('<h3>Meses del año</h3>')

const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

const $ul = document.createElement('ul'),
      $fragmento = document.createDocumentFragment()

meses.forEach( el => {
    const $li = document.createElement('li')
    $li.textContent = el
    $fragmento.appendChild($li)
})

$ul.appendChild($fragmento)
document.body.appendChild($ul)


// templates hmtl

const $template = document.getElementById('template-card').content,
      $fragment = document.createDocumentFragment(),
    cardConten = [
        {
            title: 'tecnologia',
            img: 'http://placeimg.com/200/200/tech'
        },
        {
            title: 'Arquitectura',
            img: 'http://placeimg.com/200/200/arch'
        },
        {
            title: 'gente',
            img: 'http://placeimg.com/200/200/people'
        },
        {
            title: 'Naturaleza',
            img: 'http://placeimg.com/200/200/nature'
        }
    ]

cardConten.forEach( el => {
    $template.querySelector('img').setAttribute('src', el.img)
    $template.querySelector('img').setAttribute('alt', el.title)
    $template.querySelector('figcaption').textContent = el.title

    // importo el template y clonar el nodo en un fragmento, con true le decimos que traiga lo de adentro tambien
    let $clone = document.importNode($template, true)
    $fragment.appendChild($clone)
})

$cards.appendChild($fragment)


//modificando elementos------------------------------------------------------------------------

const $newCard = document.createElement('figure')

$newCard.innerHTML = `
    <img src="https://placeimg.com/200/200/any" alt="any">
    <figcaption>Any</figcaption>
`
$newCard.classList.add('card')

// reemplazar elemento
$cards.replaceChild($newCard, $cards.children[2])

// insertar antes de
$cards.insertBefore($newCard, $cards.firstElementChild)

// remover elemento indicado
$cards.removeChild($cards.lastElementChild)


// clonar contenido con cloneNode, con true le decimos que clone lo de adentro del contenido tambien
const $cloneCards = $cards.cloneNode(true)

document.body.appendChild($cloneCards)


// nuevas formas

const $newCard2 = document.createElement('figure')

let contentCard = `
    <img src="https://placeimg.com/200/200/any" alt="any">
    <figcaption></figcaption>
`
$newCard2.classList.add('card')

// incluir html al html
$newCard2.insertAdjacentHTML('afterbegin', contentCard)

// añadir texto
$newCard2.querySelector('figcaption').insertAdjacentText('beforeend', 'nuevo')

// insertar antes del elemento con insertadAdjacentElement y beforebegin
$cards.children[3].insertAdjacentElement('beforebegin', $newCard2)
// $cards.before($newCard2)


// insertar al pricipio del elemento con insertadAdjacentElement y afterbegin
$cards.insertAdjacentElement('afterbegin', $newCard2)
// $cards.prepend($newCard2)


// insertar al final del elemento con insertAdjacentElement y beforeend
$cards.insertAdjacentElement('beforeend', $newCard2)
// $cards.append($newCard2)


// insertar despues del elemento con insertAdjacentElement y afterend
$cards.children[3].insertAdjacentElement('afterend', $newCard2)
//$cards.after($newCard2)


// añadir parametros a eventos----------------------------------------------------------------------

const $button = document.getElementById("button")

function saludar(nombre="desconocido") {
    alert(`hola ${nombre}`)
}

// el manejador de eventos, solo puede tener el parametro (event) pero si se llama una nueva funcion esta puede llevar sus propios parametros
$button.addEventListener('click', () => saludar('brayan'))


// propagacion eventos burbuja y captura

const $divsEventos = document.querySelectorAll(".flujo div")
const $linkEventos = document.querySelector(".flujo a")

const flujoEventos = function(e) {
    console.log(`hola te saluda ${this.className}, el click lo hizo ${e.target.className}`)
    e.stopPropagation()
}

// el event tiene un tercer parametro que pueden ser burbuja o captura
$divsEventos.forEach( div => { 
    div.addEventListener('click', flujoEventos, {
    capture: false,
    // once ejecuta el evento una sola vez
    once: false
    })
})

$linkEventos.addEventListener('click', function(e) {
    alert('hello world')
    e.preventDefault()  
    e.stopPropagation()
})


// delegacion de eventos

// poniendo el evento al body este evitara propagacion  y delegara acciones de eventos

document.addEventListener('click', (e) => {
    console.log('click en', e.target)

    // target es el elemento cliqueado
    if(e.target.matches('.flujo div')) {
        flujoEventos(e)
    }

    // matches da true si el elemento cliqueado es el especificado
    if(e.target.matches('.flujo a')) {
        alert('hello world')
        e.preventDefault() 
    }
})


// BOM-----------------------------------------------------------------------------

// resize es el cambio de tamaño de ventana o pestaña
window.addEventListener("resize", e => {
    // el alto de la ventana
    console.log(window.innerHeight)
    // el ancho de la ventana
    console.log(window.innerWidth)
    // el alto del navegador
    console.log(window.outerHeight)
    // el ancho del navegador
    console.log(window.outerWidth)

})

// evento del scroll
window.addEventListener('scroll', e => {

    // muestra la posicion del scroll x en pixeles
    window.scrollX
    // muestra la posicion del scroll y en pixeles
    window.scrollY
})

// evento load
window.addEventListener('load', e => {
    // muestra la posicion de la ventana x en pixeles
    console.log(window.screenX)
    // muestra la posicion de la ventana y en pixeles
    console.log(window.screenY)
})

// evento del load con document, funciona como el load pero es mas rapido
document.addEventListener('DOMContentLoaded', e => {
    // muestra la posicion de la ventana x en pixeles
    console.log(window.screenX)
    // muestra la posicion de la ventana y en pixeles
    console.log(window.screenY)
})



// metodos del BOM

/*
alert('hello world')
prompt('pon algo')
confirm()
*/

const $btnAbrir = document.querySelector('.btnAbrir'),
      $btnCerrar = document.querySelector('.btnCerrar'),
      $btnImprimir = document.querySelector('.btnImprimir')

let ventana

$btnAbrir.addEventListener('click', e => {
    // open es un metodo del window para abrir una pestaña 
    ventana = open('http://www.xaviro.com/')
})

$btnCerrar.addEventListener('click', e => {
    // close cierra la ventana actual o la que se le especifique
    ventana.close()
})

$btnImprimir.addEventListener('click', e => {
    // con print se imprime la ventana
    print()
})



// objetos del BOM

// location da informacion de la url
console.log(location)

// history da informacion del historial
console.log(history)

// navigator da informacion del navegador y sus metodos

console.log(navigator)
console.log(navigator.connection)
console.log(navigator.geolocation)
console.log(navigator.mediaDevices)
console.log(navigator.mimeTypes)
console.log(navigator.onLine)
console.log(navigator.serviceWorker)
console.log(navigator.storage)
console.log(navigator.usb)
console.log(navigator.userAgent)




