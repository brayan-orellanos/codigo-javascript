const d = document

export default function video() {
    const $video = d.querySelectorAll('video[data-video]')

    let options = {
        threshold: 0.80
    }

    let callback = (entries) => {
        entries.forEach((entry, num) => {
            entry.isIntersecting ? entry.target.play() : entry.target.pause()

            entry.target.addEventListener('ended', e => {
                setTimeout(e => {
                    entry.target.currentTime = '0'
                    entry.target.currentTime = 0
                    entry.target.play()
                }, 2000)
            })

            d.addEventListener('visibilitychange', e => {
                if (d.visibilityState === 'visible' && entry.isIntersecting) {
                    entry.target.play()
                } else {
                    entry.target.pause()
                }
            })

            d.addEventListener('click', e => {
                if (entry.target === e.target) { 
                    e.target.paused
                        ? e.target.pause()
                        : e.target.play()
                } 
            })
        })
    }

    let observer = new IntersectionObserver(callback, options)

    $video.forEach(el => {
        observer.observe(el)
    })
}