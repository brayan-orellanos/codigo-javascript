const d = document,
    n = navigator

export default function getLocation(div) {
    const $div = d.getElementById(div),
        options = {
            enableHighAccuracy: true,
            timeout: 8000,
            maximunmAge: 0
        }

    if(!navigator.geolocation) {
        $div.innerHTML = 'su dispositivo no acepta la geolocacion'
        return
    }

    const success = (position) => {
        let latitude = position.coords.latitude,
            longitude = position.coords.longitude,
            presicion = position.coords.accuracy
        $div.innerHTML = 
        `
        <p>latitud: ${latitude}</p>
        <p>longitud: ${longitude}</p>
        <p>presicion: ${presicion} metros</p>
        </br>
        <a href="https://www.google.com/maps/@${latitude},${longitude},15z" target="_blank" rel="noopener" class="e-mapa">Ver en Google maps --></a>
        `
        console.log(position)
    }

    const error = (err) => {
        $div.innerHTML = `<p>Error ${err.code}:<mark>${err.message}</mark></p>`
        console.log(err)
    }

    n.geolocation.getCurrentPosition(success, error, options)
}