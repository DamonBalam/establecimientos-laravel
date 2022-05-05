document.addEventListener('DOMContentLoaded', ()=>{


    if(document.querySelector('#dropzone')){
        Dropzone.autoDiscover = false;

        const dropzone = new Dropzone('div#dropzone',{
            url: '/imagenes/store',
            dictDefaultMessage: 'Sube hasta 10 imagenes',
            maxFiles:10,
            required: true,
            acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]').content
            }
        });
    }

})