(() => {
    const d = document,
        $table = d.getElementById('crud-table'),
        $form = d.querySelector('.crud-form'),
        $title = d.getElementById('crud-title'),
        $template = d.getElementById('crud-template').content,
        $fragment = d.createDocumentFragment()

    const getAll = async () => {
        // Read o GET
        try {
            let res = await fetch("http://localhost:8000/santos"),
                json = await res.json()

            if (!res.ok) throw {
                status: res.status,
                statusText: res.statusText
            };

            json.forEach(e => {
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

        } catch (err) {
            let message = err.statusText || 'Ocurrio un error';
            $table.insertAdjacentHTML('afterend', `<p class="err">Error ${err.status}: ${err.message}</p>`)
        }
    };

    d.addEventListener("DOMContentLoaded", getAll);

    d.addEventListener('submit', async e => {
        
        if (e.target === $form) {
            e.preventDefault()
            
            const data = {
                nombre: e.target.nombre.value,
                constelacion: e.target.constelacion.value
            };

            if (!e.target.id.value) {
                // Create o POST
                try {
                    let options = {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }

                    let res = await fetch("http://localhost:8000/santos", options);

                    if (!res.ok) throw {
                        status: res.status,
                        statusText: res.statusText
                    };

                    location.reload()

                } catch (err) {
                    let message = err.statusText || 'Ocurrio un error';
                    $form.insertAdjacentHTML('afterend', `<p class="err">Error ${err.status}: ${err.message}</p>`)
                }

            } else {
                // Update o PUT
                try {
                    let options = {
                        method: 'PUT',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }

                    let res = await fetch(`http://localhost:8000/santos/${e.target.id.value}`, options);
                    
                    if (!res.ok) throw {
                        status: res.status,
                        statusText: res.statusText
                    };

                    location.reload()
                
                } catch(err) {
                    let message = err.statusText || 'Ocurrio un error';
                    $form.insertAdjacentHTML('afterend', `<p class="err">Error ${err.status}: ${err.message}</p>`)
                }
            }
        }
    });


    d.addEventListener('click', async e => {
        if (e.target.matches('.editar')) {
            $title.textContent = 'Editar santo';
            $form.nombre.value = e.target.dataset.nombre;
            $form.constelacion.value = e.target.dataset.constelacion;
            $form.id.value = e.target.dataset.id
            d.querySelector('.button').value = 'Editar'
        }

        if (e.target.matches('.eliminar')) {
            let confirmar = confirm(`¿Esta seguro que quiere eliminar el id ${e.target.dataset.id}?`)

            if (confirmar) {
                try {
                    let options = {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }

                    let res = await fetch(`http://localhost:8000/santos/${e.target.dataset.id}`, options)

                    if (!res.ok) throw {
                        status: res.status,
                        statusText: res.statusText
                    };
                    
                    location.reload()

                } catch (err) {
                    alert(`Ha ocurrido el siguiente error ${err.status}: ${err.message}`)
                }

            }

        }
    });
})();