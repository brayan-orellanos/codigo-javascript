const d = document,
    token = 'c0853330-aa5e-42b4-bf26-8dab788095ca',
    $estados = d.getElementById('estados'),
    $municipios = d.getElementById('municipios'),
    $loader = d.querySelector('.loader')


const estados = async e => {
    try {
        $loader.style.display = 'block'

        let res = await fetch(`https://api.copomex.com/query/get_estados?token=${token}`),
            json = await res.json()

            console.log(json)
        json.response.estado.forEach(estado => {
            let option = d.createElement('option')

            option.innerHTML = estado

            $estados.appendChild(option)
        });

        $loader.style.display = 'none'
    } catch(err) {
        console.log(err)
    }
}

const municipios = async (municipio) => {
    try {
        $loader.style.display = 'block'

        $municipios.innerHTML = ''
        let res = await fetch(`https://api.copomex.com/query/get_municipio_por_estado/${municipio}?token=${token}`),
            json = await res.json()

        json.response.municipios.forEach(municipio => {
            let option = d.createElement('option')

            option.innerHTML = municipio

            $municipios.appendChild(option)
        });

        $loader.style.display = 'none'

    } catch(err) {
        console.log(err)
    }
}


d.addEventListener('DOMContentLoaded', estados)

d.addEventListener('change', e => {
    if(e.target.matches('#estados')) {
        municipios(e.target.value)
    }
})