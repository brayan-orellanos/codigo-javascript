// posicionamiento
let contenedorParrafos = document.getElementsByClassName('flex')[0],
    izquierda = document.getElementsByClassName('izquierda')[0],
    derecha = document.getElementsByClassName('derecha')[0],
    centro = document.getElementsByClassName('centro')[0];

izquierda.addEventListener('click', function() {
    contenedorParrafos.style.justifyContent = 'flex-start'
})

centro.addEventListener('click', function() {
    contenedorParrafos.style.justifyContent = 'center'
})

derecha.addEventListener('click', function() {
    contenedorParrafos.style.justifyContent = 'flex-end'
})


// texto

let pequeño = document.getElementsByClassName('pequeño')[0],
    mediano = document.getElementsByClassName('mediano')[0],
    grande = document.getElementsByClassName('grande')[0],
    mayuscula = document.getElementsByClassName('mayuscula')[0],
    minuscula = document.getElementsByClassName('minuscula')[0]

pequeño.addEventListener('click', function() {
    contenedorParrafos.style.fontSize = 'small'
})

mediano.addEventListener('click', function() {
    contenedorParrafos.style.fontSize = 'medium'
})


grande.addEventListener('click', function() {
    contenedorParrafos.style.fontSize = 'large'
})

mayuscula.addEventListener('click', function() {
    contenedorParrafos.style.textTransform = 'uppercase'
})

minuscula.addEventListener('click', function() {
    contenedorParrafos.style.textTransform = 'lowercase'
})



