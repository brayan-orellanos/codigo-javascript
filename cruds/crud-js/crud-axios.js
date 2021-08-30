(() => {
    const d = document,
    $table = d.getElementById('crud-table'),
    $form = d.querySelector('.crud-form'),
    $title = d.getElementById('crud-title'),
    $template = d.getElementById('crud-template').content,
    $fragment = d.createDocumentFragment()

    const getAll = async () => {
        try {
            let res = await axios.get("http://localhost:8000/santos");

            res.data.forEach( e => {
                $template.querySelector('.name').textContent = e.nombre
                $template.querySelector('.constelacion').textContent = e.constelacion
                $template.querySelector('.editar').dataset.nombre = e.nombre
                $template.querySelector('.editar').dataset.constelacion = e.constelacion
                $template.querySelector('.editar').dataset.id = e.id
                $template.querySelector('.eliminar').dataset.id = e.id

                let clone = d.importNode($template, true)
                $fragment.appendChild(clone)
            });

            $table.querySelector('tbody').appendChild($fragment)

        } catch(err) {
            let message = err.response.statusText || 'Ocurrio un error'
            $table.insertAdjacentHTML('afterend', `<p class="err">Error ${err.response.status}: ${err.message}</p>`)        }
    };

    d.addEventListener("DOMContentLoaded", getAll);

    d.addEventListener('submit', async e => {
        if(e.target === $form) {
            e.preventDefault()
            if(!e.target.id.value) {
                let options = {
                    method: 'POST',
                    data: JSON.stringify( {
                        nombre: e.target.nombre.value,
                        constelacion: e.target.constelacion.value        
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                try {
                   let res = await axios(`http://localhost:8000/santos`, options)
                   let json = await res.data

                } catch(err) {
                    let message = err.response.statusText || 'Ocurrio un error'
                    $form.insertAdjacentHTML('afterend', `<p class="err">Error ${err.response.status}: ${err.message}</p>`)        }
        
            } else {
                let options = {
                    method: 'PUT',
                    data: JSON.stringify( {
                        nombre: e.target.nombre.value,
                        constelacion: e.target.constelacion.value
                        }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                try {
                    let res = await axios(`http://localhost:8000/santos/${e.target.id.value}`, options)
                    let json = await res.data

                } catch(err) {
                    let message = err.response.statusText || 'Ocurrio un error'
                    $form.insertAdjacentHTML('afterend', `<p class="err">Error ${err.response.status}: ${err.message}</p>`)        
                }
            }
        }
    });

    d.addEventListener('click', async e => {
        if(e.target.matches('.editar')) {
            $title.textContent = 'Editar santo'
            $form.nombre.value = e.target.dataset.nombre
            $form.constelacion.value = e.target.dataset.constelacion
            $form.id.value = e.target.dataset.id
            $form.querySelector('.button').value = 'Editar'
        }

        if(e.target.matches('.eliminar')) {
            let confirmar = confirm(`¿Esta seguro que desea eliminar el id ${e.target.dataset.id}?`)

            if(confirm) {
                try {
                    let res = await axios.delete(`http://localhost:8000/santos/${e.target.dataset.id}`)
                    let json = await res.data
                } catch(err) {
                    let message = err.response.statusText || 'Ocurrio un error'
                    alert(`Ocurrio el siguiente ${err.status}: ${message}`)
                }
            }
        }
    })
})();