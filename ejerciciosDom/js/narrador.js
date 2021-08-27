const d = document,
    synth = speechSynthesis

export default function narrador() {
    const $form = d.querySelector('#narrador'),
        $options = d.querySelectorAll('.option'),
        speech = new SpeechSynthesisUtterance()

    console.log(speechSynthesis)

    if (!synth) {
        alert('esta ordenador no acepta el narrador')
    }

    d.addEventListener('DOMContentLoaded', e => {
        synth.addEventListener('voiceschanged', e => {
            const voces = synth.getVoices()
            voces.forEach((voz) => {
                const $option = d.createElement('option')
                $option.value = voz.name
                $option.textContent = `${voz.name} - ${voz.lang}`
                $option.setAttribute('class', 'option')
                $form.voces.appendChild($option)
            });
        })
    })

    d.addEventListener('change', e => {
        if(e.target === $form.voces) {
            speech.voice = synth.getVoices().find( voice => voice.name === e.target.value)
        }
    })

    d.addEventListener('click', e => {
        if (e.target === $form.button) {
            speech.text = $form.texto.value

            $form.voces.value === ''
                ? alert('Debe seleccionar una voz')
                : synth.speak(speech)
        }
    })
}