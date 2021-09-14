(() => {
    const d = document,
        $section = d.querySelector('.pelis'),
        $filtroGen = d.querySelector('#gen'),
        $filtroType = d.querySelector('#type'),
        $filtroCity = d.querySelector('#city'),
        $filtroPais = d.querySelector('#pais'),
        $fragment = d.createDocumentFragment(),
        $template = d.querySelector('.template').content,
        $messageCon = d.createElement('h2'),
        $pag = d.querySelectorAll('.pag'),
        $prev = d.querySelectorAll('#prev'),
        $contPag = d.querySelectorAll('.pagin'),
        $loader = d.querySelector('.contain-loader')

    $messageCon.innerHTML = 'Lo sentimos no hay ninguna conincidencia 😞'
    $messageCon.className = 'message-con'

    let $figures = null

    let clone = null,
        generos = new Set(),
        type = new Set(),
        pais = new Set(),
        city = new Set(),
        num = 0,
        apiPelis = `https://api.tvmaze.com/shows?page=${num}`,
        link = null

    const cont = e => {
        $pag.forEach(el => {
            el.id = Number(el.textContent) - 1
        })
    }

    const datos = async (url) => {
        try {
            $filtroGen.innerHTML = '<option value="0" selected>Selected</option>'
            $filtroType.innerHTML = '<option value="0" selected>Selected</option>'
            $filtroCity.innerHTML = '<option value="0" selected>Selected</option>'
            $filtroPais.innerHTML = '<option value="0" selected>Selected</option>'

            $loader.classList.remove('none')
            $figures = d.querySelectorAll('.pelis figure')
            link = apiPelis

            let res = await fetch(url),
                json = await res.json()

            if (!res.ok) throw {
                status: res.status,
                statusText: res.statusText
            }

            json.forEach((el) => {
                $template.querySelector('figure').setAttribute('data-num', el.id)
                $template.querySelector('img').src = el.image ? el.image.medium : 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'
                $template.querySelector('img').setAttribute('alt', el.name)
                $template.querySelector('figcaption').textContent = el.name

                clone = d.importNode($template, true)
                $fragment.appendChild(clone)

                el.genres.forEach(gen => {
                    generos.add(gen)
                })

                type.add(el.type)
                el.network ? pais.add(el.network.country.name) : ''
                el.network ? city.add(el.network.country.timezone) : ''
            });

            // filtro de generos
            Array.from(generos).forEach((gen, pos) => {
                const $option = d.createElement('option')

                $option.value = gen
                $option.name = gen
                $option.textContent = gen

                $filtroGen.appendChild($option)
            })

            //filtro de tipos
            Array.from(type).forEach((typ, pos) => {
                const $option = d.createElement('option')

                $option.value = typ
                $option.name = typ
                $option.textContent = typ

                $filtroType.appendChild($option)
            })

            //filtro de ciudades
            Array.from(city).forEach((typ, pos) => {
                const $option = d.createElement('option')

                $option.value = typ
                $option.name = typ
                $option.textContent = typ

                $filtroCity.appendChild($option)
            })

            //filtro de paises
            Array.from(pais).forEach((typ, pos) => {
                const $option = d.createElement('option')

                $option.value = typ
                $option.name = typ
                $option.textContent = typ

                $filtroPais.appendChild($option)
            })

            $loader.classList.add('none')
            $section.innerHTML = ''
            $section.appendChild($fragment)

        } catch (err) {
            console.log(err)
            let message = err.statusText || 'Ocurrio un error'
            $section.innerHTML = `Error ${err.status}: ${message}`
        }
    }


    d.addEventListener('DOMContentLoaded', e => {
        datos(apiPelis)
        if ($pag[0].textContent === '1') {
            $prev.forEach(el => {
                el.classList.add('disabled')
            })
        }
        cont()
    })


    d.addEventListener('submit', async (e) => {
        if (e.target.matches('.search')) {
            e.preventDefault()

            if (!e.target.buscar.value) {
                $contPag.forEach(el => el.classList.remove('none'))
                datos(apiPelis)
            } else {

                try {
                    $contPag.forEach(el => el.classList.add('none'))
                    $figures = d.querySelectorAll('.pelis figure')
                    $loader.classList.remove('none')

                    let query = e.target.buscar.value.toLowerCase(),
                        api = `https://api.tvmaze.com/search/shows?q=${query}`,
                        res = await fetch(api),
                        json = await res.json()

                    link = api

                    if (!res.ok) throw {
                        status: res.status,
                        statusText: res.statusText
                    }

                    if (json.length === 0) {
                        $loader.classList.add('none')
                        return $section.innerHTML = `<h2>No existe resultado de shows para el criterio de busqueda <mark>${e.target.buscar.value.toLowerCase()}</mark></h2>`
                    }

                    json.forEach((peli, pos) => {
                        $template.querySelector('img').src = peli.show.image ? peli.show.image.medium : 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'
                        $template.querySelector('figure').setAttribute('data-num', peli.show.id)
                        $template.querySelector('img').setAttribute('alt', peli.show.name)
                        $template.querySelector('figcaption').textContent = peli.show.name

                        clone = d.importNode($template, true)
                        $fragment.appendChild(clone)

                    });

                    $loader.classList.add('none')
                    $section.innerHTML = ''
                    $section.appendChild($fragment)

                } catch (err) {
                    console.log(err)
                    let message = err.statusText || 'Ocurrio un error'
                    $section.innerHTML = `Error ${err.status}: ${message}`
                }
            }

        }
    })


    d.addEventListener('change', async e => {
        if (e.target.matches('.select-css')) {
            const $selectores = d.querySelectorAll('.select-css')

            try {
                $figures = d.querySelectorAll('.pelis figure')
                $loader.classList.remove('none')

                let res = await fetch(link),
                    json = await res.json()


                if (!res.ok) throw {
                    status: res.status,
                    statusText: res.statusText
                }

                json.forEach((el, pos) => {
                    if (el.show) {
                        if (el.show.genres.includes($filtroGen.value) || el.show.type === $filtroType.value || el.show.network && el.show.network.country.name === $filtroPais.value || el.show.network && el.show.network.country.timezone === $filtroCity.value) {
                            $figures[pos].classList.remove('none')
                        } else {
                            $figures[pos].classList.add('none')
                        }
                    } else {
                        if (el.genres.includes($filtroGen.value) || el.type === $filtroType.value || el.network && el.network.country.name === $filtroPais.value || el.network && el.network.country.timezone === $filtroCity.value) {
                            $figures[pos].classList.remove('none')
                        } else {
                            $figures[pos].classList.add('none')
                        }
                    }
                })

                let validar = Array.from($selectores).every(select => select.value === '0'),
                    validarItems = Array.from($figures).every(figure => figure.classList.contains('none'))

                if (validar) {
                    $figures.forEach(figure => {
                        figure.classList.remove('none')
                    })

                    $contPag.forEach(el => el.classList.remove('none'))
                } else {
                    $contPag.forEach(el => el.classList.add('none'))
                }

                const $mess = d.querySelector('.message-con')

                if (validarItems && !validar) {
                    $section.appendChild($messageCon)
                } else {
                    if ($mess) {
                        $section.removeChild($mess)
                    }
                }

                $loader.classList.add('none')

            } catch (err) {
                console.log(err)
                let message = err.statusText || 'Ocurrio un error'
                $section.innerHTML = `Error ${err.status}: ${message}`
            }
        }
    })



    d.addEventListener('click', e => {
        if (e.target.matches('#prev')) {

            if ($pag[0].textContent === '1' && $pag[0].classList.contains('active')) {
                $prev.forEach(el => {
                    el.classList.add('disabled')
                })

            } else if(Number($pag[0].textContent) > 1){
                $pag.forEach(item => {
                    let number = Number(item.textContent)
                    item.textContent = number - 1
                })

                $prev.forEach(el => {
                    el.classList.remove('disabled')
                })

                cont()

                num -= 1

                apiPelis = `https://api.tvmaze.com/shows?page=${num}`
                datos(apiPelis)

            } else if($pag[1].textContent === '2' && $pag[1].classList.contains('active')) {
                $prev.forEach(el => {
                    el.classList.add('disabled')
                })

                cont()

                num -= 1

                $pag.forEach( (el, pos) => Number(el.id) !== num ? el.classList.remove('active') : el.classList.add('active'))

                apiPelis = `https://api.tvmaze.com/shows?page=${num}`
                datos(apiPelis)

            } else {
                num -= 1

                $pag.forEach( (el, pos) => Number(el.id) !== num ? el.classList.remove('active') : el.classList.add('active'))
    
                apiPelis = `https://api.tvmaze.com/shows?page=${num}`
                datos(apiPelis)
            }
        }

        if (e.target.matches('#next')) {

            $pag.forEach(item => {
                let number = Number(item.textContent)
                item.textContent = number + 1
            })

            $prev.forEach(el => {
                if (el.classList.contains('disabled')) {
                    el.classList.remove('disabled')
                }
            })

            cont()

            num += 1

            apiPelis = `https://api.tvmaze.com/shows?page=${num}`
            datos(apiPelis)
        }


        if (e.target.matches('.pag')) {

            if (e.target.textContent !== '1') {
                $prev.forEach(el => {
                    el.classList.remove('disabled')
                })
            } else {
                $prev.forEach(el => {
                    el.classList.add('disabled')
                })
            }

            $pag.forEach((el, pos) => {
                if (e.target.id === el.id) {
                    el.classList.add('active')
                } else {
                    el.classList.remove('active')
                }
            })

            num = Number(e.target.id)

            apiPelis = `https://api.tvmaze.com/shows?page=${num}`
            datos(apiPelis)
        }

        if(e.target.matches('.figure *')) {
            localStorage.setItem('num', e.target.parentElement.getAttribute('data-num'))
            location.href ='http://127.0.0.1:5500/api-pelis/peli.html'
        }
    })
})()