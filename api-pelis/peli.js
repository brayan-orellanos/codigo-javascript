(() => {
    const d = document,
        $showContent = d.getElementById('show_content'),
        $name = d.querySelector('.name'),
        $template = d.getElementById('template_info').content,
        $template2 = d.getElementById('template_gallery').content,
        $fragment2 = d.createDocumentFragment(),
        $fragment = d.createDocumentFragment(),
        $bread = d.querySelector('.bread'),
        $gallery = d.getElementById('content_gallery'),
        $loader = d.querySelector('.contain-loader'),
        $templateCast = d.getElementById('template_cast').content,
        $fragmentCast = d.createDocumentFragment(),
        $cast = d.getElementById('content_cast')
        
    let muyPequeño = window.matchMedia("(max-width: 660px)")


    let num = localStorage.getItem('num'),
        pos = null


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

            console.log(json)

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
                $templateCast.querySelector('.cast_name').innerHTML = `<p>${el.person.name} <span class="is">as</span> ${el.character.name}</p>`

                $templateCast.querySelector('.gender').innerHTML = `<b>Gender:</b> ${el.person.gender}`
                $templateCast.querySelector('.age').innerHTML = el.person.birthday ? `<b>Age:</b> ${Math.floor(edad / (1000*60*60*24*30*12))}` : ''
                $templateCast.querySelector('.birthday').innerHTML = el.person.birthday ? `<b>Birthday:</b> ${el.person.birthday}` : ''
                $templateCast.querySelector('.born').innerHTML = el.person.country ? `<b>Born In:</b> ${el.person.country.name}` : ''

                let clone = d.importNode($templateCast, true)

                $fragmentCast.appendChild(clone)
            })

            $cast.appendChild($fragmentCast)

            let $people = d.querySelector('.people')
            pos = Number(parseInt(getComputedStyle($people).getPropertyValue("width").slice(0, -2)))

        } catch (err) {
            console.log(err)
        }
    }
    
    const izquierda = () => {
        if(muyPequeño.matches){
            $cast.style.transition = 'all 1s ease';
            $cast.style.left = `-${pos+pos+(pos*0.15)}px`
    
            setTimeout(e => {
                const $first = $cast.firstElementChild
                $cast.insertAdjacentElement('beforeend', $first)
    
                $cast.style.transition = 'unset';
                $cast.style.left = `-${pos+(pos*0.07)}px`
            }, 1000)
        } else {
            $cast.style.transition = 'all 1s ease';
            $cast.style.left = `-${pos+pos+(pos*0.23)}px`
    
            setTimeout(e => {
                const $first = $cast.firstElementChild
                $cast.insertAdjacentElement('beforeend', $first)
    
                $cast.style.transition = 'unset';
                $cast.style.left = `-${pos+(pos*0.12)}px`
            }, 1000)
        }
    }

    const derecha = () => {
        if(muyPequeño.matches){
            $cast.style.transition = 'all 1s ease';
            $cast.style.left = `0`
                
            setTimeout(e => {
                const $first = $cast.lastElementChild
                $cast.insertAdjacentElement('afterbegin', $first)

                $cast.style.transition = 'unset';
                $cast.style.left = `-${(pos)+(pos*0.15)}px`
            }, 1000)
        } else {
            $cast.style.transition = 'all 1s ease';
            $cast.style.left = `0`
                
            setTimeout(e => {
                const $first = $cast.lastElementChild
                $cast.insertAdjacentElement('afterbegin', $first)

                $cast.style.transition = 'unset';
                $cast.style.left = `-${pos+(pos*0.15)}px`
            }, 1000)
        }
    }

    let inter = setInterval(izquierda, 5000);
   
    window.addEventListener( 'load', e => {
        $loader.classList.add('none')
    })

    d.addEventListener('DOMContentLoaded', e => {
        contenido()
        gallery()
        cast()
        inter
    })

    d.addEventListener('click', e => {
        if (e.target.matches('.next')) {
            izquierda()
            clearInterval(inter)
            inter = setInterval(izquierda,5000)
        }

        if(e.target.matches('.prev')) {
            derecha()
            clearInterval(inter)
            inter = setInterval(izquierda,5000)
        }
    })
})()


// personas encargadas
//' https://api.tvmaze.com/shows/1/crew'


// elenco
// 'https://api.tvmaze.com/shows/1/cast'

// temporadas
// 'https://api.tvmaze.com/shows/1/seasons'

// episodios
// https://api.tvmaze.com/seasons/1/episodes


// imagenes

// 'https://api.tvmaze.com/shows/1/images'