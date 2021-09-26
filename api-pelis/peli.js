(() => {
    const d = document,
        $template = d.getElementById('template_info').content,
        $template2 = d.getElementById('template_gallery').content,
        $templateCast = d.getElementById('template_cast').content,
        $templateEpisodes = d.getElementById('template_episodes').content,
        $templateCrew = d.getElementById('template_crew').content,
        $fragment = d.createDocumentFragment(),
        $fragment2 = d.createDocumentFragment(),
        $fragmentCast = d.createDocumentFragment(),
        $fragmentEpisodes = d.createDocumentFragment(),
        $fragmentCrew = d.createDocumentFragment(),
        $loader = d.querySelector('.contain-loader'),
        $bread = d.querySelector('.bread'),
        $name = d.querySelector('.name'),
        $showContent = d.getElementById('show_content'),
        $gallery = d.getElementById('content_gallery'),
        $cast = d.getElementById('content_cast'),
        $tbody = d.querySelector('.episodes_tbody'),
        $season = d.getElementById('season_select'),
        $crew = d.getElementById('content_crew')

    let muyPequeño = window.matchMedia("(max-width: 660px)"),
        pequeño = window.matchMedia("(max-width: 890px)"),
        mediano = window.matchMedia("(max-width: 1200px)"),
        grande = window.matchMedia("(max-width: 1310px)"),
        muyGrande = window.matchMedia("(min-width: 1321px)")

    let num = localStorage.getItem('num'),
        temporada = new Set(),
        cargado = true,
        pos = null,
        number = null,
        number2 = null,
        valor = false


    const media = (n, v) => {
        if (!muyPequeño.matches && !pequeño.matches && !mediano.matches && !grande.matches && muyGrande && n > 5) {
            d.querySelector(v).style.display = 'block'
            pos = 20
            valor = true
            inter
        } else if (!muyPequeño.matches && !pequeño.matches && !mediano.matches && !grande.matches && muyGrande && n <= 5) {
            valor = false
            d.querySelector(v).style.display = 'none'
        }

        if (!muyPequeño.matches && !pequeño.matches && !mediano.matches && grande.matches && n > 4) {
            d.querySelector(v).style.display = 'block'
            pos = 25
            valor = true
            inter
        } else if (!muyPequeño.matches && !pequeño.matches && !mediano.matches && grande.matches && n <= 4) {
            valor = false
            d.querySelector(v).style.display = 'none'
        }

        if (!muyPequeño.matches && !pequeño.matches && mediano.matches && grande.matches && n > 3) {
            d.querySelector(v).style.display = 'block'
            pos = 33
            valor = true
            inter
        } else if (!muyPequeño.matches && !pequeño.matches && mediano.matches && grande.matches && n <= 3) {
            valor = false
            d.querySelector(v).style.display = 'none'
        }

        if (!muyPequeño.matches && pequeño.matches && mediano.matches && grande.matches && n > 2) {
            d.querySelector(v).style.display = 'block'
            pos = 50
            valor = true
            inter
        } else if (!muyPequeño.matches && pequeño.matches && mediano.matches && grande.matches && n <= 2) {
            valor = false
            d.querySelector(v).style.display = 'none'
        }

        if (muyPequeño.matches && pequeño.matches && mediano.matches && grande.matches && n > 1) {
            d.querySelector(v).style.display = 'block'
            pos = 100
            valor = true
            inter
        } else if (muyPequeño.matches && pequeño.matches && mediano.matches && grande.matches && n <= 1) {
            valor = false
            d.querySelector(v).style.display = 'none'
        }
    }

    const contenido = async () => {
        try {
            let res = await fetch(`https://api.tvmaze.com/shows/${num}`),
                json = await res.json()

            if (!res.ok) throw {
                status: res.status,
                statusText: res.statusText
            }

            $bread.innerHTML += `
                <i>/</i>
                <li>${json.name}</li>
            `

            $name.textContent = json.name
            $template.querySelector('.poster').src = json.image ? json.image.medium : 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'
            $template.querySelector('.poster').alt = json.name
            $template.querySelector('.calif').innerHTML = `⭐ ${json.rating.average}`
            $template.querySelector('.range').innerHTML = `👤 ${json.externals.tvrage}`

            $template.querySelector('.country').innerHTML = `<span class="title_info">Schedule:</span> ${json.network.country ? `${json.network.country.code}, ${json.network.country.name}` : 'Not schedule'}`
            $template.querySelector('.zone').innerHTML = `<span class="title_info">Zone:</span> ${json.network.country ? json.network.country.timezone : 'Not zone'}`
            $template.querySelector('.generos').innerHTML = `<span class="title_info">Genres:</span> ${json.genres.join(', ')}`
            $template.querySelector('.type').innerHTML = `<span class="title_info">Type:</span> ${json.type}`
            $template.querySelector('.schedule').innerHTML = `<span class="title_info">Schedule:</span> ${json.schedule.days.join(', ')} at ${json.schedule.time} (${json.runtime} min)`
            $template.querySelector('.premiered').innerHTML = `<span class="title_info">Premiered:</span> ${json.premiered}`
            $template.querySelector('.status').innerHTML = `<span class="title_info">Status:</span> ${json.status}`

            $template.querySelector('.sumary').innerHTML = json.summary ? json.summary : 'Not summary'

            let clone = d.importNode($template, true)
            $fragment.appendChild(clone)

            $showContent.appendChild($fragment)

        } catch (err) {
            console.log(err)
        }
    }

    const gallery = async () => {
        try {
            let res = await fetch(`https://api.tvmaze.com/shows/${num}/images`),
                json = await res.json()

            if (!res.ok) throw {
                status: res.status,
                statusText: res.statusText
            }

            json.reverse().forEach((el) => {
                if (el.type === 'banner') {
                    $template2.querySelector('figure').className = 'figure banner'
                    $template2.querySelector('img').src = el.resolutions.original ? el.resolutions.original.url : el.resolutions.medium.url
                } else if (el.type === 'background') {
                    $template2.querySelector('figure').className = 'figure background'
                    $template2.querySelector('img').src = el.resolutions.original ? el.resolutions.original.url : el.resolutions.medium.url
                } else {
                    $template2.querySelector('figure').className = 'figure'
                    $template2.querySelector('img').src = el.resolutions.medium ? el.resolutions.medium.url : el.resolutions.original.url
                }

                $template2.querySelector('figure').setAttribute('id', el.id)
                $template2.querySelector('img').setAttribute('alt', el.type)

                let clone2 = d.importNode($template2, true)
                $fragment2.appendChild(clone2)
            })

            $gallery.appendChild($fragment2)

        } catch (err) {
            console.log(err)
        }

    }


    const cast = async e => {
        try {
            let res = await fetch(`https://api.tvmaze.com/shows/${num}/cast`),
                json = await res.json()

            if (!res.ok) throw {
                status: res.status,
                statusText: res.statusText
            }

            json.forEach((el, pos) => {
                let fecha1 = new Date(el.person.birthday),
                    fecha2 = new Date(),
                    edad = fecha2.getTime() - fecha1.getTime()

                $templateCast.querySelector('.people').id = pos
                $templateCast.querySelector('.cast_img').src = el.person.image ? el.person.image.medium : 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'
                $templateCast.querySelector('.cast_img').alt = el.person.name
                $templateCast.querySelector('.cast_name').innerHTML = `<p><a href="${el.person.url}" class="cast_n rel="noopener" target="_blank">${el.person.name}</a><span class="is"> as</span> ${el.character.name}</p>`

                $templateCast.querySelector('.gender').innerHTML = el.person.gender ? `<b>Gender:</b> ${el.person.gender}` : ''
                $templateCast.querySelector('.age').innerHTML = el.person.birthday ? `<b>Age:</b> ${Math.floor(edad / (1000*60*60*24*30*12))}` : ''
                $templateCast.querySelector('.birthday').innerHTML = el.person.birthday ? `<b>Birthday:</b> ${el.person.birthday}` : ''
                $templateCast.querySelector('.born').innerHTML = el.person.country ? `<b>Born In:</b> ${el.person.country.name}` : ''

                let clone = d.importNode($templateCast, true)

                $fragmentCast.appendChild(clone)
            })

            $cast.appendChild($fragmentCast)

            number = json.length

            media(number, '.pasar')
        } catch (err) {
            console.log(err)
        }
    }


    const seasons = async (pos) => {
        try {
            let res = await fetch(`https://api.tvmaze.com/shows/${num}/seasons`),
                json = await res.json()

            if (!res.ok) throw {
                status: res.status,
                statusText: res.statusText
            }

            d.querySelector('.season_img').src = json[pos - 1].image ? json[pos - 1].image.medium : 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'

        } catch (err) {
            console.log(err)
        }
    }


    const episodes = async (pos) => {
        try {
            $tbody.innerHTML = ''
            let res = await fetch(`https://api.tvmaze.com/shows/${num}/episodes`),
                json = await res.json()

            if (!res.ok) throw {
                status: res.status,
                statusText: res.statusText
            }

            json.forEach(el => {
                temporada.add(el.season)

                if (el.season === pos) {
                    $templateEpisodes.querySelector('.episodes_num').textContent = `${el.season}x${el.number}`
                    $templateEpisodes.querySelector('.episodes_name').innerHTML = `<a href="${el.url}" rel="noopener" target="_blank">${el.name}</a>`
                    $templateEpisodes.querySelector('.episodes_summary').innerHTML = el.summary ? el.summary : 'Not summary'
                    $templateEpisodes.querySelector('.episodes_img').src = el.image ? el.image.medium : 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'

                    let clone = d.importNode($templateEpisodes, true)
                    $fragmentEpisodes.appendChild(clone)
                }
            })

            $tbody.appendChild($fragmentEpisodes)

            if (cargado) {
                Array.from(temporada).forEach(el => {
                    const $option = d.createElement('option')

                    $option.value = el
                    $option.innerHTML = `Season ${el}`

                    $season.appendChild($option)
                })
            }

            cargado = false
        } catch (err) {
            console.log(err)
        }
    }


    const crew = async () => {
        try {
            let res = await fetch(`https://api.tvmaze.com/shows/${num}/crew`),
                json = await res.json()

            if (!res.ok) throw {
                status: res.status,
                statusText: res.statusText
            }
console.log(json)
            json.forEach((el, pos) => {
                let fecha1 = new Date(el.person.birthday),
                    fecha2 = new Date(),
                    edad = fecha2.getTime() - fecha1.getTime()

                $templateCrew.querySelector('.people').id = pos
                $templateCrew.querySelector('.crew_img').src = el.person.image ? el.person.image.medium : 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'
                $templateCrew.querySelector('.crew_img').alt = el.person.name
                $templateCrew.querySelector('.crew_name').innerHTML = `<p><a href="${el.person.url}" class="crew_n rel="noopener" target="_blank">${el.person.name}</a><span class="is"> charge</span> ${el.type}</p>`

                $templateCrew.querySelector('.gender').innerHTML = el.person.gender ? `<b>Gender:</b> ${el.person.gender}` : ''
                $templateCrew.querySelector('.age').innerHTML = el.person.birthday ? `<b>Age:</b> ${Math.floor(edad / (1000*60*60*24*30*12))}` : ''
                $templateCrew.querySelector('.birthday').innerHTML = el.person.birthday ? `<b>Birthday:</b> ${el.person.birthday}` : ''
                $templateCrew.querySelector('.born').innerHTML = el.person.country ? `<b>Born In:</b> ${el.person.country.name}` : ''

                let clone = d.importNode($templateCrew, true)

                $fragmentCrew.appendChild(clone)
            })

            $crew.appendChild($fragmentCrew)

            number2 = json.length

            media(number2, '.pasar2')
        } catch(err) {
            console.log(err)
        }
    }


    const izquierda = (element) => {
        if (valor && pos) {
            element.style.transition = 'all 1s ease'
            element.style.left = `-${pos}%`

            setTimeout(e => {
                const $first = element.firstElementChild
                element.insertAdjacentElement('beforeend', $first)

                element.style.transition = 'unset';
                element.style.left = `0`
            }, 1000)
        }
    }

    const derecha = (element) => {
        if (valor) {
            const $first = element.lastElementChild
            element.insertAdjacentElement('afterbegin', $first)

            element.style.transition = 'unset';
            element.style.left = `-${pos}%`

            setTimeout(e => {
                element.style.transition = 'all 1s ease'
                element.style.left = `0`
            }, 100)
        }
    }

    let inter = setInterval(() => {
        izquierda($cast)
        izquierda($crew)
    }, 4000);

    window.addEventListener('load', e => {
        $loader.classList.add('none')
    })

    d.addEventListener('DOMContentLoaded', e => {
        contenido()
        gallery()
        cast()
        seasons(1)
        episodes(1)
        crew()
    })

    d.addEventListener('click', e => {
        if (e.target.matches('.next')) {
            izquierda($cast)
            clearInterval(inter)
            inter = setInterval(() => {
                izquierda($cast)
                izquierda($crew)
            }, 4000);
        }

        if (e.target.matches('.prev')) {
            derecha($cast)
            clearInterval(inter)
            inter = setInterval(() => {
                izquierda($cast)
                izquierda($crew)
            }, 4000);
        }

        if (e.target.matches('.next2')) {
            izquierda($crew)
            clearInterval(inter)
            inter = setInterval(() => {
                izquierda($cast)
                izquierda($crew)
            }, 4000);
        }

        if (e.target.matches('.prev2')) {
            derecha($crew)
            clearInterval(inter)
            inter = setInterval(() => {
                izquierda($cast)
                izquierda($crew)
            }, 4000);
        }
    })

    d.addEventListener('change', e => {
        if (e.target.matches('#season_select')) {
            seasons(Number(e.target.value))
            episodes(Number(e.target.value))
            console.log(e.target.value)
        }
    })

})()


// personas encargadas
//' https://api.tvmaze.com/shows/1/crew'
