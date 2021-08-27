console.groupCollapsed('this y sus derivados')

// this

/* 
this es lo mismo a window, si se usa afuera es una variable global,
en un arrow function toma el contexto global en funciones anonimas o objetos,
toma el contexto local.
*/ 

console.log(window)
console.log(this)
console.log(this === window)

this.nombre = 'contexto global'
console.log(this.nombre)

function imprimir() {
    return console.log(this.nombre)
}

imprimir()

const objEste = {
    nombre:'contexto objeto',
    imprimir:function() { // si se usa this en un bloque toma el valor que esta en el bloque
        console.log(this.nombre)
    }
}

objEste.imprimir()

const objEste2 = {
    nombre:'contexto objeto 2',
    imprimir: imprimir
}

objEste2.imprimir()

const objEste3 = {
    nombre: 'contexto objeto 3',
    imprimir: () => {
        console.log(this.nombre) // las arrow function no tienen scope local asi que toma el this global
    }
}

objEste3.imprimir()

function personaEste(nombre) {
    this.nombre = nombre
    // return console.log(this.persona)
    
    /* 
    cada function crea su propio scope, entonces al meter una function dentro de otra,
    la de adentro no toma los valores del padre, toma valores globales.
    
    return function() { 
        console.log(this.nombre)
    }
    */

    /* 
    si lo pongo una arrow function dentro de una function anonima,
    esta arrow function si tomara los valores de la anonima,
    ya que la arrow no crea un scope y toma los valores del padre mas cercano. 
    */
    return () => console.log(this.nombre)
}

let brayan = new personaEste('brayan')
brayan()



/*  
    call, apply y bind.
    sirven como enlaces para llamar metodos en funciones o objetos con el metodo this.
    son parecidos al extend en las clases.
*/

this.lugar = 'Contexto global'

function salud(saludo, aQuien) {
    console.log(`${saludo} ${aQuien} desde el ${this.lugar}`)
}

salud('hola', 'brayan')

const obj = {
    lugar: 'Contexto objeto'
}

// call y apply se pueden usar para llamar referencias del this, sin errores
salud.call(obj, 'hola', 'pedro')
salud.apply(obj, ['adios', 'carlos'])


const per = {
    nombre: 'brayan',
    sl: function() {
        console.log(`hola ${this.nombre}`)
    }
}

per.sl()


const otraPer = {
    saludar: per.sl.bind(per) // bind enlaza los this de un objeto a otro, como si fuera un extend en clases
}

otraPer.saludar()

console.groupEnd()