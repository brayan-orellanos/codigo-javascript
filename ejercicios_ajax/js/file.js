(() => {
    const d = document,
        $container = d.querySelector('.container-file'),
        $files = d.getElementById('files'),
        $dropZone = d.querySelector('.drop-zone');

    const uploader = (file) => {
        const xhr = new XMLHttpRequest(),
            formData = new FormData()

        formData.append("file", file);

        xhr.addEventListener('readystatechange', e => {
            if(xhr.readyState !== 4) return;

            if(xhr.status >= 200 && xhr.status < 300) {
                let json = JSON.parse(xhr.responseText)
                console.log(json)
            } else {
                let message = xhr.statusText || "Ocurrio un error";
                console.error(`Error ${xhr.status}: ${message}`);
            }
        });

        xhr.open("POST", "assets/uploader.php");
        xhr.setRequestHeader("enc-type", "multipart/form-data");
        xhr.send(formData);
    };

    const progressUpload = (file) => {
        const $upload = d.createElement('progress'),
            $div = d.createElement('div'),
            $span = d.createElement('span'),
            $span2 = d.createElement('span');

        $upload.className = 'progreso';
        $upload.setAttribute('value', 0);
        $upload.setAttribute('max', 100);

        $div.className = 'contain-files';

        $div.appendChild($span);
        $div.appendChild($upload);
        $div.appendChild($span2);
        $container.appendChild($div)

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.addEventListener('progress', e => {
            let progress = parseInt((e.loaded * 100)/e.total);
            $span.innerHTML = `<b>${file.name}</b>`
            $upload.value = progress;
            $span2.innerHTML = `<b>${progress}%</b>`            
        });

        fileReader.addEventListener('loadend', e => {
            uploader(file);
            setTimeout(() => {
                $container.removeChild($div);
                $files.value = '';
            }, 3000);
        });
    };

    d.addEventListener('change', e => {
        if (e.target === $files) {

            const files = Array.from(e.target.files);

            files.forEach(el => {
                progressUpload(el)
            })

        }
    });

    //evento de drag and drop para cuando se esta arrastrando algo sobre el item
    $files.addEventListener('dragover', e => {
        e.preventDefault();
        e.stopPropagation();
        $dropZone.classList.add('is-active');
    })
    //evento de drag and drop para cuando se arrastra algo fuera del item
    $files.addEventListener('dragleave', e => {
        e.preventDefault();
        e.stopPropagation();
        $dropZone.classList.remove('is-active');
    })

    //evento de drag and drop para cuando se suelta al en el item
    $files.addEventListener('drop', e => {
        e.preventDefault();
        e.stopPropagation();
        $dropZone.classList.remove('is-active');

        const files = Array.from(e.dataTransfer.files);
        files.forEach(el => {progressUpload(el)});
    })

})();