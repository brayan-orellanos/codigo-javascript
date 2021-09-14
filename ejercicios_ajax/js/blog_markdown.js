const d = document,
    $main = d.querySelector('main');

fetch("assets/blog-markdown.md")
    .then(res => res.ok ? res.text() : Promise.reject(res))
    .then(text => {
        console.log(text)
        $main.innerHTML = new showdown.Converter().makeHtml(text)
    })
    .catch(err => {
        let message = err.statusText || "Ocurrio un error"
        $main.innerHTML = `Error ${err.status}: ${message}`
    })

