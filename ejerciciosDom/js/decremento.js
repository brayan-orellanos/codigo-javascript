export default function decremento(dec,fechaLimite, mensaje) {
    const d = document,
          $conteo = d.querySelector(dec) 
    let fecha, dia = Date.parse(fechaLimite), day, hours, min, sec, intervalo

    
    intervalo = setInterval(function() {
        fecha = new Date()
        day = Math.floor((dia - fecha)/(1000*60*60*24))
        hours = ('0'+ Math.floor((dia - fecha)%(1000*60*60*24)/(1000*60*60))).slice(-2)
        min = ('0'+ Math.floor((dia - fecha)%(1000*60*60)/(1000*60))).slice(-2)
        sec = ('0'+ Math.floor((dia - fecha)%(1000*60)/(1000))).slice(-2)

        if(day === 1) {
            $conteo.textContent = `${day} dia ${hours} horas ${min} minutos ${sec} segundos`
        } else if(hours === '01') {
            $conteo.textContent = `${day} dias ${hours} hora ${min} minutos ${sec} segundos`
        } else if(min === '01') {
            $conteo.textContent = `${day} dias ${hours} horas ${min} minuto ${sec} segundos`
        } else if(day === 0 && hours === '00' && min === '00' && sec === '00') {
            clearInterval(intervalo)
            $conteo.textContent = null
            alert(mensaje)
        } else if(dia < fecha) {
            clearInterval(intervalo)
            $conteo.textContent = null
        } else {
            $conteo.textContent = `Faltan: ${day} dias ${hours} horas ${min} minutos ${sec} segundos`
        }

    },1000)
}