const d = document,
    n = navigator,
    nu = n.userAgent

export default function deteccion(div) {
    const $contenido = d.querySelector(div)

    console.log(navigator)

    const isMobile = {
        android: () => nu.match(/android/i),
        ios: () => nu.match(/iphon|ipad|ipod/i),
        windows: () => nu.match(/windows.phone/i),
        any:function() {
            return this.android() || this.ios() || this.windows()
        },
    },

    isDesktop = {
        linux: () => nu.match(/linux/i),
        mac: () => nu.match(/mac os/i),
        windows: () => nu.match(/windows nt/i),
        any: function () {
            return this.linux() || this.mac() || this.windows()
        },
    },

    isBrowser = {
        chrome: () => nu.match(/chrome/i),
        safari: () => nu.match(/safari/i),
        firefox: () => nu.match(/firefox/i),
        opera: () => nu.match(/opera|opera mini/i),
        ie: () => nu.match(/msie|iemobile/i),
        edge: () => nu.match(/edge/i),
        any: function () {
            return (
                this.ie() ||
                this.edge() ||
                this.chrome() ||
                this.safari() ||
                this.firefox() ||
                this.opera()
            )
        },
    }

    $contenido.innerHTML =
        `
        <p class="parrafo">User Agent: ${navigator.userAgent}</p>
        <p class="parrafo">Plataforma: ${isMobile.any() ?isMobile.any() :isDesktop.any()}</p>
        <p class="parrafo">Navegador: ${isBrowser.any()}</p>
        `

    if(isBrowser.firefox()) {
        $contenido.innerHTML += 
        `
        <p class="sub"><mark>Este contenido solo se ve en firefox</mark></p>
        <p class="sub"><mark>Este contenido solo se ve en escritorios</mark></p>
        `
    }
}