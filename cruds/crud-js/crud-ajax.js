const d = document;

(() => {
    const $table = d.getElementById('crud-table'),
        $form = d.querySelector('.crud-form'),
        $title = d.getElementById('crud-title'),
        $template = d.getElementById('crud-template').content,
        $fragment = d.createDocumentFragment()

    const ajax = (objeto) => {
        let {
            url,
            method,
            success,
            error,
            data
        } = objeto;
        
        const xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", e => {
            if (xhr.readyState !== 4) return;

            if (xhr.status >= 200 && xhr.status < 300) {
                let json = JSON.parse(xhr.responseText);
                success(json);
            } else {
                let message = xhr.statusText || 'Ocurrio un error';
                error(`Error ${xhr.status}: ${message}`)
            }
        });

        xhr.open(method || "GET", url);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send(JSON.stringify(data));
    }

    const getAll = () => {
        // read o GET
        ajax({
            url: 'http://localhost:8000/santos',
            success: (res) => {
                console.log(res)
                res.forEach(e => {
                    $template.querySelector('.name').textContent = e.nombre;
                    $template.querySelector('.constelacion').textContent = e.constelacion;
                    $template.querySelector('.editar').dataset.id = e.id;
                    $template.querySelector('.editar').dataset.nombre = e.nombre;
                    $template.querySelector('.editar').dataset.constelacion = e.constelacion;
                    $template.querySelector('.eliminar').dataset.id = e.id;

                    let $clone = d.importNode($template, true);
                    $fragment.appendChild($clone)
                });

                $table.querySelector('tbody').appendChild($fragment);
            },
            error: (err) => {
                console.log(err);
                $table.insertAdjacentHTML("afterend", `<p class="err">${err}</p>`);
            }
        });
    };

    d.addEventListener('DOMContentLoaded', getAll());

    d.addEventListener('submit', e => {
        if (e.target === $form) {
            e.preventDefault();

            if (!e.target.id.value) {
                // create o POST
                ajax({
                    url: 'http://localhost:8000/santos',
                    method: "post",
                    success: (res) => {
                        location.reload()
                    },
                    error: (err) => {
                        $form.insertAdjacentHTML("afterend", `<p class="err">${err}</p>`)
                    },
                    data: {
                        nombre: e.target.nombre.value,
                        constelacion: e.target.constelacion.value
                    }
                });

            } else {
                // update o PUT
                ajax({
                    url: `http://localhost:8000/santos/${e.target.id.value}`,
                    method: "put",
                    success: (res) => {
                        location.reload()
                    },
                    error: (err) => {
                        $form.insertAdjacentHTML("afterend", `<p class="err">${err}</p>`)
                    },
                    data: {
                        nombre: e.target.nombre.value,
                        constelacion: e.target.constelacion.value
                    }
                })
            }
        }
    });

    d.addEventListener('click', e => {
        if (e.target.matches(".editar")) {
            $title.textContent = 'Editar santo'
            $form.nombre.value = e.target.dataset.nombre
            $form.constelacion.value = e.target.dataset.constelacion
            $form.id.value = e.target.dataset.id
            d.querySelector('.button').value = 'Editar'
        }

        if (e.target.matches(".eliminar")) {
            let isDelete = confirm(`¿Estas seguro de eliminar el id ${e.target.dataset.id}?`)

            if (isDelete) {
                // Delete 
                ajax({
                    url: `http://localhost:8000/santos/${e.target.dataset.id}`,
                    method: "delete",
                    success: (res) => {
                        location.reload()
                    },
                    error: (err) => alert(`ha ocurrido el siguiente error ${err} al eliminar el elemento`),
                })
            }
        }
    })
})();