const d = document,
    n = navigator

export default function camara(cam) {
    const $video = d.getElementById(cam) 
    console.log(navigator.geolocation)

    if(n.mediaDevices.getUserMedia) {
        let contrains = { audio: true, video: true}

        n.mediaDevices.getUserMedia(contrains)
        .then((stream) => {
            console.log(stream)
            $video.srcObject = stream
            $video.play()
        })
        .catch((err) => console.log(`sucedio el siguiente error: ${err}`))
    }

}