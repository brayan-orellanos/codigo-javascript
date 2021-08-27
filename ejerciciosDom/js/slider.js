const d = document

export default function slider(btnLeft, btnRigth, imgs) {
    let item = 0

    const $imgs = d.querySelectorAll(imgs),
        $btnLeft = d.querySelector(btnLeft),
        $btnRigth = d.querySelector(btnRigth)


    setInterval((el) => {
        item++
        if (item >= $imgs.length) {
            item = 0
        }

        $imgs.forEach((el, xd) => {
            if (item === xd) {
                el.classList.add('slider-ver')
            } else {
                el.classList.remove('slider-ver')
            }
        })

    }, 4000);



    d.addEventListener('click', e => {
        if (e.target === $btnRigth) {
            item++
            if (item >= $imgs.length) {
                item = 0
            }

            $imgs.forEach((el, xd) => {
                if (item === xd) {
                    el.classList.add('slider-ver')
                } else {
                    el.classList.remove('slider-ver')
                }
            })
        }

        if (e.target === $btnLeft) {
            if (item <= 0) {
                item = $imgs.length
            }

            item--

            $imgs.forEach((el, xd) => {
                if (item === xd) {
                    el.classList.add('slider-ver')
                } else {
                    el.classList.remove('slider-ver')
                }
            })
        }
    })
}