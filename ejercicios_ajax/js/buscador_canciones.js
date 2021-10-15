const d = document,
    $loader = d.querySelector('.loader'),
    $form = d.getElementById('buscar_cancion'),
    $error = d.querySelector('.error'),
    $main = d.querySelector('main'),
    $artista = d.querySelector('.artista'),
    $cancion = d.querySelector('.cancion')

$form.addEventListener('submit', async e => {
    e.preventDefault()

    try {
        $loader.style.display = 'block'
        let artist = e.target.artista.value.toLowerCase(),
            cancion = e.target.cancion.value.toLowerCase(),
            $artistaTemplate = '',
            $cancionTemplate = '',
            artistaApi = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`,
            cancionApi = `https://api.lyrics.ovh/v1/${artist}/${cancion}`,
            artistaFetch = fetch(artistaApi),
            cancionFetch = fetch(cancionApi),
            [artistaRes, cancionRes] = await Promise.all([artistaFetch,cancionFetch]),
            artistData = await artistaRes.json(),
            cancionData = await cancionRes.json()

            console.log(artistData,cancionData)

            if(artistData.artists === null) {
                $artistaTemplate = `<h2>No existe el interprete <mark>${artist}</mark></h2>`
            } else {
                let artista = artistData.artists[0]
                $artistaTemplate = `
                    <h2 class="title">${artista.strArtist.toUpperCase()}</h2>
                    <img src="${artista.strArtistThumb}" alt="${artista.strArtist}">
                    <p class="fecha">${artista.intBornYear} - ${artista.intDiedYear || 'presente'}</p>
                    <p class="city">${artista.strCountry}</p>
                    <p class="gender">${artista.strGenre} - ${artista.strStyle}</p>
                    <a class="sitio" href="http://${artista.strWebsite}" target="_blank">Sitio web</a>
                    <p class="biografic">${artista.strBiographyEN}</p>
                 `
            }

            if(cancionData.error) {
                $cancionTemplate = `<h2>No existe la cancion <mark>${cancion}</mark></h2>`
            } else {
                $cancionTemplate = 
                `
                    <h2 class="title">${cancion.toUpperCase()}</h2>
                    <blockquote>${cancionData.lyrics}</blockquote>
                `
            }

            $loader.style.display = 'none'
            $artista.innerHTML = $artistaTemplate
            $cancion.innerHTML = $cancionTemplate

    } catch(err) {
        console.log(err)
        let message = err.statusText || 'Ocurrio un error'
        $error.innerHTML = `<p>Error ${err.status}: ${message}</p>`
        $loader.style.display = 'none'
    }
})