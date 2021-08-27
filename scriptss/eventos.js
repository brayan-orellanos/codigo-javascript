'use strict'

// eventos del mouse

// añadir evento click
// crea un alerta al dar click en el boton crear evento
let button = document.getElementById('button')
let buttons = document.getElementById('button2')

const agregarEvento = () => {
    alert('este es un nuevo evento')
}

button.addEventListener('click', agregarEvento)// agrega el evento


// eliminar evento
// elimina la alerta al oprimir el boton remover evento
const removerEvento = () => {
    button.removeEventListener('click', agregarEvento)
    alert('se ha removido el evento del alert')
}

buttons.addEventListener('click', removerEvento)


// doble click
// crea un nuevo parrafo al dar click en crear parrafo
document.addEventListener('DOMContentLoaded', function(){
    let button3 = document.getElementById('button3')

    button3.addEventListener('dblclick', function(){ // doble click

        let newParrafo = document.createElement('p')
        let newText = document.createTextNode('nuevo parrafo')

        newParrafo.appendChild(newText)

        newParrafo.className = 'texto'

        let container = document.getElementsByClassName('container')[0]

        container.appendChild(newParrafo)
    })
})


// mouseover
// crea un nuevo parrafo al poner el cursor sobre el parrafo text
let parrafoNew = document.getElementsByClassName('text')[0]

const fun = () => {
    
    let newParrafo = document.createElement('p')
    let newText = document.createTextNode('nuevo parrafo')

    newParrafo.appendChild(newText)

    newParrafo.className = 'texto'

    newParrafo.id = 'parrafoAgregado'

    let container = document.getElementsByClassName('container')[0]

    container.appendChild(newParrafo)
}

parrafoNew.addEventListener('mouseover', fun)


// mouseout
// elimina el parrafo anterior al quitar el cursor de text
parrafoNew.addEventListener('mouseout', function() {
    let parrafoAgregado = document.getElementById('parrafoAgregado')
    let container = document.getElementsByClassName('container')[0]

    container.removeChild(parrafoAgregado)
})


// focus
let campoNombre = document.getElementById('nombre')

const foco = () => {
    campoNombre.setAttribute('value', 'tengo el foco') // cambia el valor del campo nombre
}

campoNombre.addEventListener('focus', foco)


// blur
const fuera = () => {
    campoNombre.setAttribute('value', 'ya no tengo el foco')
}

campoNombre.addEventListener('blur', fuera)


// change
const elegirColor = () => {
    let estadoActivador = document.getElementById('colorFavorite').checked
    let inputs = document.getElementById('inputs')
    let titleColor = document.getElementById('titleColor')

    if(estadoActivador == true) {
        document.getElementById('verde').disabled = false
        document.getElementById('azul').disabled = false
        document.getElementById('rojo').disabled = false

        inputs.setAttribute('class', 'input-group radio-buttons enabled')
        titleColor.className = 'enabled'
        
    } else {
        document.getElementById('verde').disabled = true
        document.getElementById('azul').disabled = true
        document.getElementById('rojo').disabled = true

        inputs.setAttribute('class', 'input-group radio-buttons disabled')
        titleColor.className = 'disabled'
    }
}

let inputColorFavorite = document.getElementById('colorFavorite')
inputColorFavorite.addEventListener('change', elegirColor)


// evento de carga

// load
window.addEventListener('load', function() {
    console.log('el load se utiliza para cargar el js despues del html')
})



// eventos del teclado

// keydown: cuando se pulsa una tecla en el teclado
window.addEventListener('keydown', function(event){
    console.log('se a pulsado una tecla')
    /* event.keycode muestra que tecla se esta precionando como un codigo
       string.fromcharcode indica que letra esta indicando el codigo 
    */
    console.log(String.fromCharCode(event.keyCode)) 
})


// keypress: cuando se esta pulsando una tecla pulsa una tecla
window.addEventListener('keypress', function(){
    console.log('pulsando una tecla')
})

// keyup: cuando se deja de pulsar una tecla
window.addEventListener('keyup', function(){
    console.log('se dejo de pulsar la tecla')
})


// eventos multimedia

// play: cuando el video se inicia
const video = document.querySelector(".haloVideo");

video.addEventListener('play', function() {
    console.log('el video ha iniciado')
})


// ended: cuando el video termina
video.addEventListener('ended', function() {
    console.log('el video ha terminado')
})

// seeking: cuando se mueve el cursor en el video
video.addEventListener('seeking', function() {
/* el metodo currentTime con el valor this del video, trae el tiempo en segundos en el que se mueve o esta el cursor del video */
    console.log('se movio el video a: ', this.currentTime) 
})


// ventana de confirmacion

// confirm: si se le da aceptar es true sino es false
video.addEventListener('ended', function() {
    let confirmar = confirm('¿desea reproducir de nuevo el video?')

    if(confirmar) {
        video.play()
    } else {
        window.location = 'http://127.0.0.1:5500/eventos.html'
    }
})
