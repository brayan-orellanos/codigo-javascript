const d = document

export default function conexion(msg) {
    const $msg = d.querySelector(msg)

    window.addEventListener('online', e => {
            $msg.classList.remove('msg-false')
            $msg.classList.add('msg-true')
            $msg.classList.replace('msg-ocultar','msg-mostrar')
            $msg.innerHTML = 'Conexion reestablecida'
    
            setTimeout(e => {
                $msg.classList.replace('msg-mostrar', 'msg-ocultar')
                $msg.innerHTML = ''
            }, 2000)
    })

    window.addEventListener('offline', e => {
        $msg.classList.remove('msg-true')
        $msg.classList.add('msg-false')
        $msg.classList.replace('msg-ocultar','msg-mostrar')
        $msg.innerHTML = 'Se ha perdido la conexion'

        setTimeout(e => {
            $msg.classList.replace('msg-mostrar', 'msg-ocultar')
            $msg.innerHTML = ''
        }, 2000)
    })
}