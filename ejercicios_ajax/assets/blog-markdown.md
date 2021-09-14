# Intorduccion a markdown

### Markdowm

**Markdown** es un [lenguaje de marcado ligero](https://es.wikipedia.org/wiki/Lenguajes_de_marcas_ligeros) creado por John Gruber que trata de conseguir la máxima legibilidad y facilidad de publicación tanto en su forma de entrada como de salida inspirándose en muchas convenciones existentes para marcar mensajes de correo electrónico usando texto llano. Se distribuye bajo licencia BSD y se distribuye como plugin *(o al menos está disponible)* en diferentes sistemas de gestión de contenidos (CMS).  


### Citas

Esto es una línea normal

> Esto es parte de un bloque de cita.
> Esto es parte del mismo bloque de cita.


### Listas

Lista numerada (ordenada)

1. Este es el primer elemento
2. Este es el segundo elemento
3. Este es el tercer elemento



### Listas definidas

Se pueden aplicar más de una definición a un termino

 Primer termino
    : Primera definición

 Segundo termino
    : Segunda definición



### Imagenes

![img1](../../multi/img1.jpg)

### Tablas

| Elemento | Cantidad | Precio |
| -- | -- | -- |
| Item 1   | 15       | 150€   |
| Item 2   | 3250     | 23,65€ |


### Codigo

    const d = document,
        $main = d.querySelector('.cont');

    const getHTML = (options) => {
        let {
            url,
            success,
            error
        } = options;

        const xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', e => {
            if (xhr.readyState !== 4) return

            if (xhr.status >= 200 && xhr.status < 300) {
                let html = xhr.responseText;
                success(html);
            } else {
                let message = xhr.statusText || 'Ocurrio un error';
                error(`Error ${xhr.status}: ${xhr.statusText}`);
            }

        });

        xhr.open('GET', url);
        xhr.setRequestHeader("Content-type", "text/html; charset=utf-8");
        xhr.send()
    };


    d.addEventListener('DOMContentLoaded', e => {
        getHTML({
            url: "assets/home.html",
            success: (html) => $main.innerHTML = html,
            error: (err) => $main.innerHTML = `<h1>${err}</h1>`
        });
    })


    d.addEventListener('click', e => {
        if (e.target.matches('.item-menu')) {
            e.preventDefault()
            getHTML({
                url: e.target.href,
                success: (html) => $main.innerHTML = html,
                error: (err) => $main.innerHTML = `<h1>${err}</h1>`
            });
        }
    })

---                                  

### Abreviaturas

La especificación HTML es mantenida por el W3C.


*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium

 
### Identificar cabecera

### Esto es una cabecera con un Id {#cabecera1}

[Enlace a esa cabecera](#cabecera1)



