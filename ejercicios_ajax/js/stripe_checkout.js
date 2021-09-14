import STRIPES_KEYS from "./stripe_keys.js"

const d = document,
    $electronico = d.getElementById('electronicos'),
    $template = d.getElementById('template').content,
    $fragment = d.createDocumentFragment(),
    options = {
        headers: {
            Authorization: `Bearer ${STRIPES_KEYS.secret}`,
        },
        limit: 20
    };

let products, prices

const moneyFormat = num => {
    let val = `${num.slice(0,-2)}`,
        arr = val.split(''),
        arr2 = []
    arr.reverse().forEach((el, pos) => {
        if (pos % 3 === 0) {
            if (pos === 0) {
                arr2.push(el)
            } else {
                arr2.push('.')
                arr2.push(el)
            }
        } else {
            arr2.push(el)
        }
    })
    return '$' + arr2.reverse().join('')
};

Promise.all([
        fetch("https://api.stripe.com/v1/products", options),
        fetch("https://api.stripe.com/v1/prices", options)
    ])
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(json => {
        products = json[0].data;
        prices = json[1].data
        console.log(products, prices)

        prices.forEach(el => {
            let productData = products.filter(product => product.id === el.product);
            console.log(productData)

            if (el.type === "one_time") {
                $template.querySelector(".electronico").setAttribute('data-price', el.id);
                $template.querySelector("img").src = productData[0].images[0]
                $template.querySelector("img").alt = productData[0].name
                $template.querySelector("figcaption").innerHTML = `
                ${productData[0].name}
                </br>
                ${moneyFormat(el.unit_amount_decimal)} ${el.currency}
                `


                let $clone = d.importNode($template, true);
                $fragment.appendChild($clone);
            }
        });

        $electronico.appendChild($fragment);
    })
    .catch(err => {
        console.log(err)
        let message = err.statusText || 'Ocurrio un error al conectar con la API de stripe'
        $electronico.innerHTML = `<p>Error ${err.status}: ${message}</p>`
    })

d.addEventListener('click', e => {
    if (e.target.matches('.electronico *')) {
        let price = e.target.parentElement.getAttribute('data-price')

        Stripe(STRIPES_KEYS.public)
            .redirectToCheckout({
                lineItems: [{price: price, quantity: 1}],
                mode: 'payment',
                successUrl: 'http://127.0.0.1:5500/ejercicios_ajax/assets/success-stripe.html',
                cancelUrl: 'http://127.0.0.1:5500/ejercicios_ajax/assets/error-stripe.html'
            })
            .then((res) => {
                console.log(res)
                if (res.error) {
                    $electronico.insertAdjacentElement('afterend', res.error.message)
                }
            })
    }
})