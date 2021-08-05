export default function reloj(hora, iniciarReloj, detenerReloj, iniciarAlarma, detenerAlarma) {
    const d = document
    const $alarma = d.querySelector(iniciarAlarma)
    const $reloj = d.querySelector(iniciarReloj)
    const $audio = d.querySelector('.audio')
    
    let intervalo 
    
    d.addEventListener('click', e => {
        if(e.target.matches(iniciarReloj) && !$alarma.disabled) {
            const tiempo =  x => {
                let fecha = new Date().toLocaleTimeString()
                d.querySelector(hora).innerHTML = fecha
            }

            intervalo = setInterval(tiempo, 1000)

            e.target.disabled = true
        }

        if(e.target.matches(detenerReloj)) {
            $reloj.disabled = false
            d.querySelector(hora).innerHTML = null
            clearInterval(intervalo)
        }

        if(e.target.matches(iniciarAlarma) && !$reloj.disabled) {
            e.target.disabled = true
            $audio.play()
        }

        if(e.target.matches(detenerAlarma)) {
            $alarma.disabled = false
            $audio.pause()
            $audio.currentTime = 0
        }
    })
}