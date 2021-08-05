export default function ventana(form) {
    const d = document,
        w = window,
        $form = d.querySelector(form)

    let ventana

    d.addEventListener('submit', e => {
        if(e.target === $form) {
            e.preventDefault()
            ventana = open(`${$form.url.value}`, 'ventana', `innerWidth=${$form.ancho.value}, innerHeigth=${$form.alto.value}`)
        }
    })

    d.addEventListener('click', e => {
        if(e.target === $form.cerrar) {
            if(ventana === undefined || ventana === '') {
                alert('debe abrir una ventana primero')
            } else {
                ventana.close()
                $form.url.value = ''
                $form.alto.value = ''
                $form.ancho.value = ''
            }
        }
    })
}
