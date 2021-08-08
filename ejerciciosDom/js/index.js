import hamburgerMenu from "./hamburguesa_menu.js"
import reloj from "./reloj.js"
import {teclado} from "./eventos_teclado.js"
import {movimiento} from "./eventos_teclado.js"
import decremento from "./decremento.js"
import {scroll, progress} from "./scroll.js"
import mode from "./mode.js"
import view from "./view.js"
import ventana from "./ventana.js"
import deteccion from "./deteccion_dispositivo.js"
import loader from "./loader.js"
import conexion from "./conexion.js"
import camara from "./dteccion_camara.js"
import getLocation from "./geolocation.js"
import filtro from "./filtro.js"
import sorteo from "./sorteo.js"



const d = document

d.addEventListener('DOMContentLoaded', e => {
    hamburgerMenu('.menu', '.btn', '.menu a')
    reloj('.hora','.iniciar-reloj', '.detener-reloj', '.iniciar-alarma', '.detener-alarma')
    decremento('.dec', 'november 01, 2021 00:26:00', 'se acabo el tiempo xd')
    scroll('.arrow-up', '.header', 'section6')
    progress('.progreso')
    view(
        'youtube', 
        '(min-width: 1024px)', 
        `<a rel='noopener' target='_blank' href='https://www.youtube.com/watch?v=6IwUl-4pAzc&list=PLvq-jIkSeTUZ6QgYYO3MwG9EMqC-KoLXA&index=92'>Ver video</a>`, 
        `<iframe width="560" height="315" src="https://www.youtube.com/embed/6IwUl-4pAzc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    )
    view(
        'gMapa', 
        '(min-width: 1024px)', 
        `<a rel='noopener' target='_blank' href='https://goo.gl/maps/3GE3QaAuPbdL9RfHA'>Ver mapa</a>`, 
        `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31674.67081165906!2d-73.13651645000002!3d7.087242550000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e683f9501983051%3A0x816d5ea64809e1b0!2sCacique%20El%20Centro%20Comercial!5e0!3m2!1ses!2sco!4v1627854006765!5m2!1ses!2sco" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" data-aos="fade-right"></iframe>`
    )
    ventana('#form-tester')
    deteccion('.contenido')
    AOS.init()
    camara('cam')
    getLocation('location')
    filtro('#buscar', '.card', '.reset')
    sorteo('.list-sorteo', '.btn-sorteo')
})


d.addEventListener('keydown', e => {
    teclado(e)
    movimiento(e, '.circulo', '.cuadro')
})

mode('.mode', 'html')
loader('.loader')
conexion('#msg')