// selectores individuales

let boton = document.getElementById('boton') // selecciona el elemento con el id boton
let segundoParrafo = document.querySelector('#segundoParrafo') // selecciona el elemento con un selector css, el primero que coincida


// selectores multiples

let parrafos = document.getElementsByClassName('texto') // selecciona todas las clases llamadas texto, los pone en un array
let textos = document.getElementsByTagName('p') // selecciona todas las etiquetas llamadas p
let querys = document.querySelectorAll('.texto') // selecciona todos los elementos con el css especificado


boton.addEventListener('click', function() {
    // crear nuevo elemento o nodo

    let newParrafo = document.createElement('p')
    
    // crear un texto para el nuevo parrafo
    
    let textNuevo = document.createTextNode('soy un nuevo parrafo')
    
    // agregar nuevo texto en el nuevo parrafo

    newParrafo.appendChild(textNuevo) // añade el hijo texto nuevo, a parrafo nuevo

    // agregar atributo a parrafo nuevo

    newParrafo.setAttribute('class', 'texto') // agrega un nuevo atributo, (atributo, nameDelAtributo)
    newParrafo.className = ' texto redColor' 

    // seleccionar contenedor

    let contenedor = document.getElementsByClassName('contenedor')[0]

    // agreagr el nuevo parrafo al contenedor

    contenedor.appendChild(newParrafo) 

    // seleccionar el padre del elemento

    let ultimoParrafo = document.getElementsByClassName('texto')[2]
    let parentParrafo = ultimoParrafo.parentNode // parentNode selecciona el padre del elemento 


    // ubicar el elemento antes del seleccionado

    parentParrafo.insertBefore(newParrafo, ultimoParrafo) // insertBefore, indica la posicion antes de quien debe posicionar




    // modificar o agregar id o clases a un elemento
    // modificar clase de un elemento
    let secondParrafo = document.getElementById('second')
    secondParrafo.className = 'texto second'

    // modificar id de un elemento

    let primerParrafo = document.getElementsByClassName('texto')[0]
    primerParrafo.id = 'primero' 



    // reemplazar y eliminar elementos

    let parrafoNew = document.createElement('p')

    let newText = document.createTextNode('este texto reemplazo el primero con js')

    parrafoNew.appendChild(newText)

    parrafoNew.className = 'texto'

    // reemplazar el parrafo en el padre

    parentParrafo.replaceChild(parrafoNew, parrafos[0]) 


    // eliminar elemento

    parentParrafo.removeChild(parrafos[3])




    let alert = document.getElementById('mensaje')

    let parrafoConfirm = document.createElement('p')

    let textParrafoConfirm = document.createTextNode('el parrafo 3 se a eliminado satisfactoriamente')

    parrafoConfirm.appendChild(textParrafoConfirm)

    parrafoConfirm.className = 'confirm'

    alert.appendChild(parrafoConfirm)

    alert.setAttribute('class', '')

    setTimeout(function() {
        alert.removeChild(parrafoConfirm)
    },3000)

    
})



