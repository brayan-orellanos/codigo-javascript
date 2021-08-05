const d = document,
    n = navigator

export default function camara(cam) {
    const $video = d.querySelector(cam)

    if(n.mediaDevices.getUserMedia) {
        let contrains = { audio: true, 
            video: 
                { 
                facingMode: { exact: "environment" },     
                width: { min: 1024, ideal: 1280, max: 1920 },
                height: { min: 776, ideal: 720, max: 1080 } 
                }
            }

        n.mediaDevices.getUserMedia(contrains)
        .then((stream) => {
            console.log(stream)
            $video.srcObject = stream
            $video.play()
        })
        .catch((err) => console.log(`sucedio el siguiente error: ${err}`))
    }
}