const d = document,
    $main = d.querySelector('main'),
    $links = d.querySelector('.links')

let pokeApi = 'https://pokeapi.co/api/v2/pokemon/'

const loadPokemons = async (url)=> {
    try {
        $main.innerHTML = `<img src="../../multi/loader.svg" alt="Cargando..." class="loader">`
    
        let res = await fetch(url),
            json = await res.json(),
            $template = '',
            $prevLink,
            $nextLink;

            if(!res.ok) throw {status: res.status, statusText: res.statusText};

            for(let i = 0; i < json.results.length; i++) {
                try {
                    let res = await fetch(json.results[i].url),
                        pokemon = await res.json()

                    if(!res.ok) throw {status: res.status, statusText: res.statusText};

                    $template += `
                        <figure>
                            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></img>
                            <figcaption>${pokemon.name}</figcaption>
                        </figure>
                    `

                } catch(err) {
                    let message = err.statusText || 'Ocurrio un error'
                    $template += `
                    <figure>
                        <figcaption>Error ${err.status}: ${message}</figcaption>
                    </figure>
                `
                }
            }

            $main.innerHTML = $template;

            $prevLink = json.previous ? `<a href="${json.previous}" class="pag">⏮️</a>` :'';
            $nextLink = json.next ? `<a href="${json.next}" class="pag">⏭️</a>` : '';

            $links.innerHTML = $prevLink + $nextLink
    } catch(err) {
        let message = err.statusText || 'Ocurrio un error'
        $main.innerHTML = `Error ${err.status}: ${message}`
    }
};

d.addEventListener('DOMContentLoaded', loadPokemons(pokeApi));

d.addEventListener('click', e => {
    if(e.target.matches('.pag')) {
        e.preventDefault()
        loadPokemons(e.target.getAttribute('href'))
    }
})