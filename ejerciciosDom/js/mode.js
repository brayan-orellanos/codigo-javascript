const d = document,
    ls = localStorage

export default function mode(btn, main) {
    const $main = d.querySelector(main),
        $btn = d.querySelector(btn)  

    const sun = e => {
        $btn.classList.add('moon')
        $btn.classList.remove('sun')
        $main.classList.remove('dark')
        ls.setItem('theme', 'sun')
    }  

    const moon = e => {
        $btn.classList.remove('moon')
        $btn.classList.add('sun')
        $main.classList.add('dark')
        ls.setItem('theme','moon')
    }
        

    d.addEventListener('click', e => {
        if(e.target.matches(btn)) {
            if($btn.classList.contains('moon')) {
                moon()
            } else {
                sun()
            }
        }
    })

    d.addEventListener('DOMContentLoaded', e => {
        if(ls.getItem('theme') === null) ls.setItem('theme', 'sun')
        if(ls.getItem('theme') === 'sun') sun()
        if(ls.getItem('theme') === 'moon') moon()
    })
}