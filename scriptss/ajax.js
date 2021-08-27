// XMLHttpRequest

(() => {
    // paso 1: creo un nuevo objeto XMLHttpRequest
    const xhr = new XMLHttpRequest(),
        $xhr = document.getElementById('xhr'),
        $fragment = document.createDocumentFragment()

    // pso 2: inicio el evento readystatechange que funciona como el intersectingobserver y mira cuando el status cambia
    xhr.addEventListener('readystatechange', e => {
        // readystate, es un parametro de XMLHttpRequest
        if (xhr.readyState !== 4) return

        console.log(xhr)
        if (xhr.status >= 200 && xhr.status < 300) {
            let contenido = JSON.parse(xhr.responseText)

            contenido.forEach(e => {

                const $div = document.createElement('div'),
                    $title = document.createElement('h2'),
                    $body = document.createElement('p')

                $div.setAttribute('class', 'contain')
                $div.setAttribute('id', e.id)

                $title.textContent = e.title

                $body.textContent = e.body

                $div.appendChild($title)
                $div.appendChild($body)
                $fragment.appendChild($div)

            })
            $xhr.appendChild($fragment)

        } else {
            let message = xhr.statusText || 'Ocurrio un error'
            $xhr.innerHTML = `Error ${xhr.status}: ${message}`
        }
    })

    // paso 3: inicio el ajax con el metodo y la url
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts')

    // paso 4: envio el ajax
    xhr.send()

})();

// Fetch api

(() => {
    const $fetch = document.getElementById('fetch'),
        $fragment = document.createDocumentFragment()

    // el fetch es una promesa, se inicia
    fetch('https://jsonplaceholder.typicode.com/comments')
        // el primer then convierte la respuesta, en este caso a json con res.json(), si hay error rachaza la promesa y manda el catch
        .then((res) => res.ok ? res.json() : Promise.reject(res))
        // el segundo then realiza la lo que se va a hacer en caso de respuesta correcta o ok
        .then(json => {
            json.forEach(e => {

                const $div = document.createElement('div'),
                    $name = document.createElement('h2'),
                    $email = document.createElement('span'),
                    $body = document.createElement('p')

                $div.setAttribute('class', 'contain_fetch')
                $div.setAttribute('id', e.id)

                $name.textContent = e.name

                $email.textContent = e.email

                $body.textContent = e.body

                $div.appendChild($name)
                $div.appendChild($body)
                $div.appendChild($email)
                $fragment.appendChild($div)

            })
            $fetch.appendChild($fragment)
        })
        // catch manejo de errores
        .catch((err) => {
            let message = err.statusText || 'Ocurrio un error'
            $fetch.innerHTML = `Error ${err.status}: ${message}`
        })
        // codigo que se ejecuta sin importar la respuesta, por ejemplo terminar un loader
        .finally(() => {
            console.log('xd')
        })

})();


// Api fetch con Async await

(() => {
    const $await = document.getElementById('await'),
        $fragment = document.createDocumentFragment()

    async function getData() {
        try {
            let res = await fetch('https://jsonplaceholder.typicode.com/photos?albumId=1'),
                json = await res.json()

            if (!res.ok) throw {
                status: res.status,
                statusText: res.statusText
            }

            json.forEach(e => {

                const $div = document.createElement('div'),
                    $img = document.createElement('img'),
                    $title = document.createElement('a')

                $div.setAttribute('class', 'contain_await')
                $div.setAttribute('id', e.id)

                $img.setAttribute('src', e.url)
                $title.setAttribute('href', e.url)
                $title.setAttribute('target', '_blank')
                $title.setAttribute('rel', 'noopener')
                $title.textContent = e.title

                $div.appendChild($img)
                $div.appendChild($title)
                $fragment.appendChild($div)

            })

            $await.appendChild($fragment)

        } catch (err) {
            let message = err.statusText || 'Ocurrio un error'
            $await.innerHTML = `Error ${err.status}: ${message}`
        }
    }

    getData()
})();

// axios

(() => {
    const $axios = document.getElementById('axios'),
        $fragment = document.createDocumentFragment()

    axios
        .get('https://jsonplaceholder.typicode.com/comments')
        .then((res) => {
            res.data.forEach(e => {
                const $div = document.createElement('div'),
                    $name = document.createElement('h2'),
                    $email = document.createElement('span'),
                    $body = document.createElement('p')

                $div.setAttribute('class', 'contain_fetch')
                $div.setAttribute('id', e.id)

                $name.textContent = e.name

                $email.textContent = e.email

                $body.textContent = e.body

                $div.appendChild($name)
                $div.appendChild($body)
                $div.appendChild($email)
                $fragment.appendChild($div)

            })

            $axios.appendChild($fragment)
        })
        .catch((err) => {
            console.log(err.response)
            let message = err.response.statusText || 'Ocurrio un error'
            $axios.innerHTML = `Error ${err.response.status}: ${message}`
        })
        .finally(() => {
            console.log('Este es finali de axios y se ejecuta siempre')
        })
})();

(() => {
    const getData = async () => {
        const $axiosAwait = document.getElementById('axiosAwait'),
            $fragment = document.createDocumentFragment()

        try {
            let res = await axios.get('https://jsonplaceholder.typicode.com/posts')

            res.data.forEach(e => {
                const $div = document.createElement('div'),
                    $title = document.createElement('h2'),
                    $body = document.createElement('p')

                $div.setAttribute('class', 'contain')
                $div.setAttribute('id', e.id)

                $title.textContent = e.title

                $body.textContent = e.body

                $div.appendChild($title)
                $div.appendChild($body)
                $fragment.appendChild($div)

            })

            $axiosAwait.appendChild($fragment)

        } catch (err) {
            let message = err.response.statusText || 'Ocurrio un error'
            $axiosAwait.innerHTML = `Error ${err.response.status}: ${message}`
        } finally {
            console.log('finally con async en axios')
        }
    }

    getData()
})()