const d = document
let x = 0
let y = 0

export function teclado(e) {

    console.log(e.keyCode)
    console.log(e)
    if(e.ctrlKey && e.keyCode === 67) {
        confirm('comandos xd')
    }

    if(e.ctrlKey && e.keyCode === 65) {
        alert('se a precionado el comando')
    }

    if(e.ctrlKey && e.keyCode === 80) {
        prompt('comando iniciado')
    }
}


export function movimiento(e, ball, cuadro) {
    const $ball = d.querySelector(ball),
          $cuadro = d.querySelector(cuadro),
          limitBall = $ball.getBoundingClientRect(),
          limitCuadro = $cuadro.getBoundingClientRect()

    console.log(limitBall, limitCuadro)

    switch(e.keyCode) {
        case 37:
            if(limitBall.left>limitCuadro.left) x--
            e.preventDefault()
            break;

        case 38:
            if(limitBall.top>limitCuadro.top) y--
            e.preventDefault()
            break;

        case 39:
            if(limitBall.right<limitCuadro.right) x++
            e.preventDefault()
            break;

        case 40:
            if(limitBall.bottom<limitCuadro.bottom) y++
            e.preventDefault()
            break;    
    }

    $ball.style.transform = `translate(${x*10}px,${y*10}px)`
}