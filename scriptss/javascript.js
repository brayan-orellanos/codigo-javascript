//'use strict'

// strings
let nombre = `brayan alexis, orellanos`
let hi = 'hola mundo, de nuevo mundo'

console.groupCollapsed('strings')
/* propiedad = caracteristicas */
console.log(nombre.length) /* da la cantidad de caracteres en valor numerico */
/* metodos = acciones */
console.log(nombre.toUpperCase())/* convierte el texto en mayuscula */
console.log(nombre.includes("brayan"))/* pregunta si el caracter esta incluido, true o false */
console.log(nombre.toLowerCase())/* convierte el texto en minuscula */
console.log(nombre.trim())/* organiza el texto, elimina espacios extra */
console.log(nombre.split(' ')) /* separa segun se especifique, convirtiendo el string en un array */
console.log(nombre.indexOf('brayan'))/* da la posicion en la que se encuentra el caracter especifico, si no se encuentra devuelve -1 */
console.log(nombre.lastIndexOf('brayan'))/* da la ultima posicion en la que se encuentra el caracter especifico, si no se encuentra devuelve -1 */
console.log(nombre.search('brayan'))/* da la posicion en la que se encuentra el caracter especifico, si no se encuentra devuelve -1 */
console.log(nombre.search(/Al/i))/* busca la primera coincidencia con regex, la i evita el case sensitive de letras */
console.log(nombre.substr( 0, 6))/* toma una parte de una cadena el primer valor espicifica la posicion en la que inicia, y la segunda cuantos valores despúes del inicio debe tomar  */
console.log(nombre.slice(7, -11))/* toma una parte de una cadena */
console.log(nombre.endsWith('llanos'))/* indica si el texto termina en una palabra, si es asi retorna true sino retorna false */
console.log(hi.match(/mundo/gi))/* con match se busca y con el regex, encuentra todas las coincidencias */
console.log(nombre.charAt(0))/* toma el caracter que se le especifica */
console.log(nombre.repeat(3))/* repite el texto la cantidad de veces que se especifica */
console.log(hi.replace('de nuevo', 'hola'))
console.groupEnd()



// numbers
let a = 3
let b = 4.56465645
let c = 'xd'
let d = '3.1416'
console.groupCollapsed('numbers')
console.log(b.toFixed(3))/* muestra la cantidad de decimales segun se especifique */
console.log(parseInt(b))/* hace que el valor sea siempre un numero entero */
console.log(parseFloat(a))/* hace que el valor sea siempre un numero flotante */
console.log(typeof a, typeof c) /* typeof muestra el tipo de dato */
console.log(Number(d)) /* convierte texto a numero */
console.log(isNaN(b)) /* pregunta si el valor es un numero y devuelve true o false */
console.log(Number.isInteger(a)) /* pregunta si el numero es entero y devuelve true o false */
console.log(a.toExponential(2)) /* nos devuelve el exponente del numero, o elevado a la cantidad que se especifica */
console.log(a.toString()) /* pasa de numero a texto */
console.groupEnd()


// arreglos
console.groupCollapsed('arrays')
const lista = ['a', 'b', 'c', 1, 2, 3, ['hola', 'mundo']]/*se pueden añadir tambien array, objetos y funciones dentro de un array */
console.log(lista)

const colores = ['ROJO', 'VERDE', 'AZUL']/* length cuenta la cantidad de elementos que contiene el array */
console.log(colores.length)

console.log(Array(10).fill('hola')) /* con el metodo fill se repite un mismo valor segun la cantidad en array */
console.log(Array.from(d)) // from crea un nuevo array apartir de un dato iterable
console.log(lista.concat(colores))/* concat, concatena un array a otro */
console.log(colores.join('-'))/* join convierte un array en un string */
console.log(colores.indexOf('VERDE')) /* indica la posicion en la que se encuentra el elemento en el array */

colores.push('negro')/* push sirve para añadir elementos a una lista, añade al final */
console.log(colores)

colores.pop()/* pop sirve para quitar elementos de una lista, el ultimo */
console.log(colores)

colores.shift()/* shift elimina el primer elemento del array */
console.log(colores)

colores.unshift('blanco')/* unshift añade un elemento al principio del arreglo */
console.log(colores)

colores.reverse()/* reverse pone el array al reves */
console.log(colores)

colores.sort()/* ordena el array */
console.log(colores)

/* 
con foreach se puede recoger el valor del array con el primer parametro en una funcion, 
y con el segundo parametro  ocupa las pocisiones del elemento padre o array
*/
colores.forEach(function(el, xd){  
    console.log(`<li id='${xd}'>${el}</li>`)
})

// operador spread o operador de propagacion
const arr1 = [1, 2, 3, 4, 5],
      arr2 = [6, 7, 8, 9, 0]
// sin el operador spread
console.log(arr1, arr2)
//con el operador spread
const arr3 = [...arr1, ...arr2]// permite que una expresión sea expandida en situaciones donde se esperan múltiples argumentos
console.log(arr3)

// recorrer arrays
const productos = [
    {nombre: 'tv', valor: 2000},
    {nombre: 'cicla', valor: 1000},
    {nombre: 'libro', valor: 300},
    {nombre: 'celular', valor: 800},
    {nombre: 'carro', valor: 8000},
    {nombre: 'vaso', valor: 100} 
]

/* filter sirve para filtrar segun la condicion de la funcion y los devuelve como un nuevo array */
const filtro = productos.filter( producto =>  producto.valor < 500)
console.log(filtro) /* filtra los productos que sean menor o igual a 500 */

/* map hace un recorrido o mapeo del los elementos del array */
const mapeo = productos.map( producto => producto.nombre)
console.log(mapeo)

/* find crea un nuevo array con el o los elementos que se buscan, parecido al includes de string */
const buscar = productos.find( producto => producto.nombre === 'carro')
console.log(buscar)

/* find crea un nuevo array con la posicion de los elementos que se buscan */
const buscar2 = productos.findIndex( producto => producto.nombre === 'libro')
console.log(buscar2)

/* some solo devuelve true o false, como una pregunta si incluye algo */
const pregunta = productos.some( producto => producto.valor <= 700)
console.log(pregunta)
console.groupEnd()



//funciones
// funcion declarada
console.groupCollapsed('functions')
declarada()
function declarada() { /* no usar esta */
    console. log('esta es una funcion declarada, puede retornar en cualquier parte')
}
declarada()

// funcion expresada
const expresada = function() { /* tal vez usar esta */
    console.log('esta funcion es expresada, no se puede retornar antes de declararla')
}
expresada()

// funcion callback
function calcular(datoA, datoB, sumarCB) {
    let sumar = datoA + datoB

    sumarCB(sumar) /* se llama un parametro como una funcion */
}

calcular(3, 7, function(resultado){ /* se evalua la funcion anterior como una nueva y se devuelve el valor */
    console.log('suma: ', resultado)
})


// arrow functions
const sum =  (a, b) => a + b /* en las funciones flecha se ponen los parametros antes y la function como => */
console.log(sum(52,47))

const arr = [1, 2, 3, 4, 5]

arr.forEach((elemento,index) => {
    console.log(`${elemento} esta en la posicion ${index}`)
})

const fun = () => { /* si usar esta */
    console.log('esta es una funcion de flecha')
}

fun()

//parametro rest, se utiliza en funciones
let sumar = function(a, b, ...c) { /* el parametro rest son los tres puntos, lo cual indica que se pueden añadir mas valores */
    let resultado = a + b

    c.forEach(function (numero){
        resultado += numero
    })

    return resultado
}

console.log(sumar(1, 2, 3, 4, 5)) /* ejemplo de que se pueden añadir mas valores gracias al parametro rest */


//funcion constructora, sirve para crear nuevos objetos
function auto (marca, modelo, annio){
    this.marca = marca;
    this.modelo = modelo;
    this.annio = annio;
}
// se crearon dos objetos de la funcion de arriba, constructora
let nuevoAuto = new auto('tesla', 'modelo 1', 2020)
let nuevoAuto2 = new auto('toyota', 'modelo 1', 2019)

console.log(nuevoAuto)
console.log(nuevoAuto2)
console.groupEnd()


// condicionales
// operador ternario
console.groupCollapsed('conditionals')
let op = 'bienvenido' 
let sd = op === 'bienvenido' ? `hola ${op}` : `hola bienvenida`
console.log(sd)


// if
if (5 >= 7) {
    console.log('esta condicion es verdadera')
} else if(5 == 5){
    console.log('esta condicion es verdad')
} else {
    console.log('esta condicion es falsa')
}


// switch
let colorFavorite = 'azul'

switch (colorFavorite) {
    case 'azul':
        console.log('el color favorito es azul')
        break;
    case 'rojo':
        console.log('el color favorito es rojo')
        break
    default:
        console.log('no conosco tu color favorito')
        break;
}
console.groupEnd()

console.groupCollapsed('asincronia')
// intervalos
let segundos = 0

const contar = () => {
    ++segundos
    console.log(segundos)
}

let intervalo = setInterval(contar, 10000)


// retardo o temporizador
let salu = 'hola mundo'

let temporizador = setTimeout(salu, 5000)

console.log(salu)
console.groupEnd()



// math 
console.groupCollapsed('math')
let list = [1,2,3,54,21,36]

let ma = Math.floor(Math.random() * 10)/* floor aproxima el numero hacia abajo, random da un numero al azar entre 0 y 1 */
console.log(ma)

ma = Math.ceil(Math.random() * 10)/* ceil aproxima el numero hacia arriba */
console.log(ma)

ma = Math.round(Math.random() * 10)/* round aproxima el numero al mas cercano */
console.log(ma)

ma = Math.abs(-10) /* abs devuelve el valor del numero absoluto, sin signos */
console.log(ma)

let res = Math.min(...list) /* devuelve el numero mas bajo del array, los tres puntos es para que lo recorra */
console.log(res)

let res2 = Math.max(...list) /* devuelve el numero mas alto del array */
console.log(res2)

let indicador = Math.sign(7) /* devuelve 1 si el numero es positivo, -1 si es negativo y 0 si es cero */
console.log(indicador)
console.groupEnd()


// Date
console.groupCollapsed('Date')
let fecha = new Date() /* obtiene la fecha y hora actual */
console.log(fecha)
console.log(fecha.getDay()) /* obtener dia actual */
console.log(fecha.getFullYear()) /* obtener año actual */
console.log(fecha.toDateString()) /* obtener fecha actual */
console.log(fecha.toTimeString()) /* obtener hora actual */
console.log(fecha.toLocaleString()) /* obtener fecha y hora local */
console.log(fecha.toLocaleDateString())/* obtener fecha en mejor formato */
console.log(fecha.toLocaleTimeString()) /* obtener hora actual en mejor formato */
console.log(fecha.getTime(fecha.toLocaleDateString())) /* pasar a milisegundos */
console.groupEnd()


// ciclos
// for
console.groupCollapsed('ciclos')
for(let i = 0; i <= 5; i++) {
    console.log(i)
}


// forin y forof
const object = {
    nombre: 'brayan',
    apellido: 'orellanos',
    edad: 20
}

for (const propiedad in object) { /* el forin recorre o iterar propiedades de un objeto primitivo */
    console.log(propiedad,':' ,object[propiedad])
}

let array = [10, 20, 30]
for (const iterador of array) { /* el forof recorre elementos de cualquier objeto iterable(que se divida o pueda dividir) */
    console.log(iterador)
}

let s = 'hola mundo'
for (const dividir of s) {
    console.log(dividir)
}


// break y continue
/* 
 break: sirve para detener una condicion en el momento que esta se cumpla
*/
let n = 0
for (let i = 1; i <= 20; i++){
    if(i % 7 === 0){
        console.log(i)
        n++
    }
    if(n >= 5) break
}

/*
  continue: omite la iteracion o declaracion como un if,
  en ese caso da todos los numeros del 1 al 90 excepto los multiplos de 7,
  si i es multiplo de 7 se omite y continua con los demas
*/
for (let i = 1; i <= 10; i++){
    if (i % 7 === 0) continue
    console.log(i)
}

for (let i = 1; i <= 10 ; i++){
    if (i % 2 !== 0) continue
    console.log(` ${i} es un numero par`)
  
}


// while
/* en while se declara la variable afuera, 
   se debe incrementar dentro por que sino el ciclo sera infinito
*/
let i = 1
while (i <= 5) {
    console.log(i)
    i++
}

// do while
let nb = 0

do {
    nb++
    console.log(nb)
} while(nb <= 5) 

console.groupEnd()


// POO
// clases
console.groupCollapsed('clases y objetos')
let texto = new String('soy una clase string')
let number = new Number(5)
let bool = new Boolean(true)


// clases compuestas
let arrr = new Array('brayan', 'sara')
let obj = new Object({color: 'azul', altura: 1.80})


// clases personalizadas
function Persona(nombre, edad) {
    this.nombre = nombre
    this.edad = edad
}

let persona1 = new Persona('pedro', 30)
console.log(persona1)


// objetos
/* el objeto guarda datos, otros metodos, arrays y funciones */
const user = {
    nombre:'brayan',
    apellido: 'gonzalez',
    edad: 20,
    contacto:{
        correo: 'brayanx2015@gmail.com',
        celular: '3002416734'
    },
    saludar: function() {
        console.log('hola')
    }
}

console.log(user.nombre)
console.log(user['saludar'])
user.saludar()

console.log(Object.keys(user))/* guarda las propiedades de un objeto como un array o lista  */
console.log(Object.values(user))/* guarda los valores de las propiedades de un objeto en un array o lista */
console.log(user.hasOwnProperty('edad'))/* hasownproperty pregunta en el objeto si la propiedad existe */
console.groupEnd()

console.groupCollapsed('manejo de errores')
// manejo de errores
try { /* en el try se guarda el codigo el cual se va a verificar */
    console.log('codigo a verificar errores')
    console.log('segundo mensaje')

} catch (error) { /* el catch muestra el lugar o un mensaje de error si lo hay en try */
    console.log('indica el error')
    console.log(error) /* muestra el error */

} finally { /* casi no se utiliza, pero hay esta */
    console.log('siempre se muestra')
}


// mensaje de error personalizados
try {
    let number = 'f'

    if (isNaN(number)) { /* isnan es, si no es un numero */
        throw new Error('el caracter no es un numero') /* error personalizado */
    }

    console.log(number*number)

} catch (error) {
    console.log(`se produjo el ${error}`)/* se llama el mensaje de error en try */
}
console.groupEnd()

// destructuracion

//llamar datos sin destructuracion
console.groupCollapsed('destructuracion y objetos literales')
const num = [1, 2, 3]

let uno = num[0],
    dos = num[1],
    tres = num[2]
console.log(uno,dos,tres)

// con destructuracion 
const [one, two, three] =  num
console.log(one, two, three)

const humano = {
    nomber: 'Sara', 
    apellido: 'ruiz',
    edad: 7
}

let {nomber, apellido, edad} = humano /* se crea un nuevo tipo de dato igual al que se va a consultar y se iguala con el. */
console.log(nomber, apellido, edad)


// objetos literales
/* se puede llamar directamente tipos de datos */
let nom = 'sara'
let age = 7

const  info = {
    nom,
    age,
    cum() { /* se pueden definir funciones sin la palabre function solo con () */
        console.log('cumpleaños')
    }
}
console.log(info)
info.cum()
console.groupEnd()


/*..................................................................................... */
// prototipos

//funcion constructora

console.groupCollapsed('prototipos')
function Animal(nombre, genero) {
    // atributos
    this.nombre = nombre
    this.genero = genero
}

//metodos
// metodos que se le asginan al prototipo con prototype

Animal.prototype.sonar = function() {
    console.log('hago sonidos')
}

Animal.prototype.saludar = function() {
    console.log(`hola soy ${this.nombre}`)
}

const snoopy = new Animal('snoopy', 'macho'),
      lolaBunny = new Animal('lola', 'hembra')

console.log(snoopy)
console.log(lolaBunny)


// herencia prototipica

function Perro(nombre, genero, tamanio) {
    // con prototipos se llama al padre en una varable y sus atributos
    this.super = Animal
    this.super(nombre, genero)
    this.tamanio = tamanio
}

// perro esta heredando de Animal
Perro.prototype = new Animal()
Perro.prototype.constructor = Perro

// sobreescribir metodo del prototipo padre en el hijo
Perro.prototype.sonar = function(){
    console.log('el sonido del perro son ladridos')
}

Perro.prototype.ladrar = function() {
    console.log('guau guau')
}

const coraje = new Perro('coraje', 'macho', 'mediano')

console.log(coraje)
console.groupEnd()

/*........................................................................................................... */
/* orientada a objetos */

/* trabajando con clases */

/* con la palabra extends la clase computador hereda los metodos de la clase productos 
    lo cual diria que la clase computador hace parte de productos, productos seria la clase padre 
    de la clase computador y se debe llamar con la palabra super y la propiedad del padre
*/

console.groupCollapsed('trabajando con clases')
class products {
    /* toda clase debe llevar un constructor */
    constructor(numSerie) {
        this.numSerie = numSerie
        this.tiempoGarantia = 100
    }

    /* static se ejecuta sin necesidad de instanciar la clase */
    static get infoTienda() {
        console.log('productos tienda xd')
    }

    /* set llama una nueva propiedad o modifica uno existente */
    set garantia(value) {
        this.tiempoGarantia -= value
    }

    /* obtiene una propiedad llamada o creada  */
    get garantia(){
        return this.tiempoGarantia
    }
}


class computador extends products { 
    constructor(numSerie, marca, tamaño, capacidad) {
        super(numSerie)
        this.marca = marca
        this.tamaño = tamaño
        this.capacidad = capacidad
    }

    /* metodos, funcionan como las  funciones */
    encendido() {
        this.garantia = 1
        console.log(`el computador ${this.marca}, se ha encendido`)
    }

    volumen() {
        console.log('el volumen se ha modificado')
    }

    info() {
        console.log(`el computador es de marca ${this.marca} de tamaño ${this.tamaño} pulgadas y capacidad de memoria de ${this.capacidad} gigas`)
    }

    set peso(value) {
        this.kgs = value.trim()
    }

    get peso() {
        return this.kgs
    }
}

/* llamando nuevos objetos de la clase productos con la palabra new */
const portatil = new computador('12345','hp', '14', '500')
const mesa = new computador('67890','lenovo', '25', '1024')
console.log(portatil)
console.log(mesa)
console.groupEnd()


/*------------------------------------------------------------------------------------------------- */
/* trabajando con datos remotos o externos */

let contPosts = document.getElementById('contenedor')
let contBanderas = document.getElementById('banderas')
let botonn = document.getElementById('button')
let mensaje = document.getElementById('mensaje')

botonn.addEventListener('click', function() {
    /* permite al navegador web realizar solicitudes HTTP a los servidores web, llama apis */
    getPosts()
        /* son llamadas promesas */
        .then(data => data.json())
        .then(posts => {
            mostrarDatos(posts)
            return getCountries()
        })
        .then(data => data.json())
        .then(countries => {
            mostrarBanderas(countries)
        })
        /* catch se usa para el manejo de errores */
        .catch(error => {
            mensaje.classList.toggle('hide') /* toogle, si la clase existe la quita, si no la añade*/
            mensaje.innerHTML = error
            setTimeout(() => mensaje.classList.toggle('hide'), 6000)
        })

        botonn.style.backgroundColor = 'rgb(31,129,74)'
        botonn.style.color = 'black'
        mensaje.style.backgroundColor = 'red'
})

function getPosts() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
}

function getCountries() {
    return fetch('https://restcountries.eu/rest/v2/all')
}

function mostrarBanderas(countries) {
    contBanderas.innerHTML = '';
    countries.map((country) => {
        let bandera = document.createElement('img')
        bandera.src = country.flag
        bandera.width = '20'
        bandera.height = '20'
        contBanderas.appendChild(bandera)
    })
}

function mostrarDatos(posts) {
    posts.map((post) => {
        let titulo = document.createElement('h1')
        let contenido = document.createElement('p')

        titulo.innerHTML = post.id + '-' + post.title
        contenido.innerHTML = post.body

        contPosts.appendChild(titulo)
        contPosts.appendChild(contenido)
    })
}


/* funcion anonima autoejecutable */
(function(d, w, c){ /* se puede dar un aliaz poniendo todo en una funcion autoejecutable */
    c.log('se reemplazo el console por una c')
})(document, window, console); /* en estos parentesis se ponen los campos a obtener de la funcion */


console.groupCollapsed('promesas y Async await')

// promise
const cuadradoPromise = value => {
    if(typeof value !== 'number') {
        return Promise.reject(`Error, el valor ${value} no es un numero`);
    }

    return new Promise((resolve, reject) => { // con new promise, inicio una promesa
        setTimeout(() => {
            resolve({ // en el resolve se escribe lo que se va a realizar, el reject seria lo que pasa si no se puede hacer
                value,
                resolve: value*value
            });
        }, 0 | Math.random() * 1000);  
    });
}

cuadradoPromise(0) // con el nombre de la funcion y .then llamo la promesa
    .then(obj => {
        console.log(obj);
        return cuadradoPromise(1)
    })
    .then(obj => {
        console.log(obj);
        return cuadradoPromise(2)
    })
    .then(obj => {
        console.log(obj);
        cuadradoPromise(3)
    })
    .catch(err => console.error(err)) // en el catch va lo que se quiere mostrar como error


// Async await
const cuadradoAsincrona = async value => {
    try {
        let obj = await cuadradoPromise(0);
        console.log(obj);

        obj = await cuadradoPromise(1);
        console.log(obj);

        obj = await cuadradoPromise(2);
        console.log(obj);

        obj = await cuadradoPromise(3);
        console.log(obj);

        obj = await cuadradoPromise(4);
        console.log(obj);

        obj = await cuadradoPromise(5);
        console.log(obj);
    } catch (error) {
        console.error(error)
    }
}

cuadradoAsincrona()

console.groupEnd()

console.groupCollapsed('nuevos tipos de datos')

// Symbol
const NAME = Symbol() // Symbol pone en privado la propiedad por ejemplo NAME no aparece como NAME
const EDAD = Symbol()
const SALUDAR = Symbol()

const persona = {
    [NAME]: 'brayan', // con [] y el nombre dentro llamo el Symbol
    [EDAD]: '21',

    [SALUDAR]: () => {
        console.log('Hola')
    }
}

console.log(persona)
console.log(Object.getOwnPropertySymbols(persona)) // lista todos los symbol de un objeto

// set
const set = new Set([1,2,3,1,2,true,false,true,{},{},'hola','HOLA'])
console.log(set)// set es como un areglo pero sin valores primitivos repetidos

set.add(5)// add funciona como push agrega valores al array
console.log(set)

set.delete('HOLA')// elimina el valor especificado
console.log(set)

console.log(set.size)// con size calculo el tamaño de los valores que contiene set
console.log(set.has(2))// has indica si el valor se encuentra en el arreglo o no

set.forEach(item => console.log(item))
let setArr = Array.from(set)// convirtiendo set a array

set.clear()
console.log(set)// reiniciar set

// map
const mapa = new Map() // con map se crea lo que sira como un diccionario

mapa.set('nombre','brayan')
mapa.set('edad','21')
mapa.set('telefono','3394843923')

console.log(mapa)
console.log(mapa.size) // size da el tamaño del map
console.log(mapa.has('correo')) // dice si existe un valor o no
console.log(mapa.get('nombre')) // get obtiene el valor del set

mapa.delete('telefono') // delete elimina el valor indicado
console.log(mapa)

const mapa2 = new Map([
    ['nombre', 'alexis'],
    ['edad','19'],
    ['telefono','3001923839']
])

// weakset
/* funciona parecido al set pero no se pueden poner valores 
directamente, hay que añadirlo a variables primero,
si el weak no tiene valores se elimina y ahorra memoria. 
El weakmap es igual pero con map*/
const ws = new WeakSet()

let valor1 = {"valor1": 1}
let valor2 = {"valor2": 2}
let valor3 = {"valor3": 3}

ws.add(valor1)
ws.add(valor2)
console.log(ws)

console.log(ws.has(valor3))

ws.delete(valor2)
console.log(ws)

// weakmap

const wmap = new WeakMap()
let llave = {}
let llave2 = {}

wmap.set(llave,1)
wmap.set(llave2,2)
console.log(wmap)


// iterador

const iterable = [1,2,3,4,5]

const iterador = iterable[Symbol.iterator]() // symbol.iterador, es una propiedad especial para los valores iterables
console.log(iterador)

let next = iterador.next()// con next llamo al siguiente valor del iterable

while(!next.done) {
    console.log(next)
    next = iterador.next()
}


// generadores

//generadors vuelve a una funcion iterable y asincrona 
function* iter() { // con el * en la funcion lo convierto en un generador
    yield 'hola' // yield funciona como el await en la funcion Async
    console.log('hello')
    yield 'hola2'
    console.log('hello2')
}

let itera = iter()

for(let y of itera) {
    console.log(y)
}


// proxies
// el proxy crea una copia de un objeto para crear validaciones y modificaciones

const ser = {
    nam:"",
    apellido:"",
    edad:0
}

const maneja = { // para manejar el proxy se necesita un manejador
    /*set es como el constructor del manejador, obj es el objeto,prop las propiedades y se iguala al valor para el proxy*/
    set: (obj,prop,valor) => { // set es como el constructor del manejador
        if(Object.keys(obj).indexOf(prop) === -1) {
            return console.error(`La propiedad ${prop} no existe en el objeto ser`)
        }

        if(
            (prop === 'nam' || prop === 'apellido')&&
            !(/^[a-zá-üñ\s]+$/ig.test(valor))
        ) {
            return console.error(`La propiedad ${prop} solo acepta letras y espacios`)
        }

        obj[prop] = valor
    }
}

const oscar = new Proxy(ser, maneja) // con new proxy llamo el proxy especificando el objeto y el manejador
console.log(oscar)


// propiedad dinamica de los objetos

let propDin = Math.round(Math.random()*100 + 5)

const objUsuarios = {
    propiedad:'Valor',
    [`id_${propDin}`]:'Valor Aleatorio' // con [] creo un valor llamado id de forma dinamica
}

console.log(objUsuarios)

const usuariosDin = ['brayan', 'mateo', 'carla', 'sofia']
usuariosDin.forEach((usuario, index) => objUsuarios[`id_${index}`] = usuario)

console.groupEnd()


console.groupCollapsed('json')

// un json siempre lleva todo encerrado en comillas dobles
const hum = {
    "texto": "texto",
    "number": "12",
    "array": ["1","2","3","4"],
    "objeto": {
        "telefono": "3283943924",
        "email": "brayanR@gmail.com"
    },
    "nulo":null
}

// json.parse convierte un json en un formato legible por el lenguaje

console.log(JSON)
console.log(JSON.parse("{}"))
console.log(JSON.parse("[1,2,3]"))
console.log(JSON.parse("true"))
console.log(JSON.parse("19"))
console.log(JSON.parse("null"))


// json.stringify convierte un json a formato texto
console.log(JSON.stringify({}))
console.log(JSON.stringify([]))
console.log(JSON.stringify(true))
console.log(JSON.stringify(19))
console.log(JSON.stringify(null))

console.groupEnd()

/*
let persona = prompt('¿cual es tu nombre?')
let sexo = prompt(
    `dime tu genero
    femenino = f
    masculino = m`)
*/

// let saludo = sexo

// if (sexo === 'm') {
//     saludo = 'bienvenido'
// }else if (sexo === 'f'){
//     saludo = 'bienvenida'
// }else{
//     saludo = prompt('ingrese una de las dos opciones')
// }

/* funcion como se usaba antes */
// function entrada(persona, sexo){
//     let saludo = sexo === 'm'
//                ? 'bienvenido'
//                : 'bienvenida'

//     return `hola ${saludo} de nuevo ${persona}`
// }


/* funcion como se usa ahora */
/*
const entrada = (persona, sexo) => {
    
   let saludo = sexo === 'm'
               ? 'bienvenido'
               : 'bienvenida'
    return `${saludo} de nuevo ${persona}`
}

let password = '1'
let pass

do {
    pass = prompt('ingrese la contraseña')
    if (pass !== password) {
        pass = prompt('!contraseña incorrecta!, ingrese de nuevo la contraseña')
    } 

} while (pass !== password){
    alert(entrada(persona, sexo))
}
*/

