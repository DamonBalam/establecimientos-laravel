import { OpenStreetMapProvider } from 'leaflet-geosearch';
const provider = new OpenStreetMapProvider();


document.addEventListener('DOMContentLoaded', () => {


    if(document.querySelector('#mapa')) {

        const lat = document.querySelector('#lat').value === '' ? 20.666332695977 : document.querySelector('#lat').value;
        const lng = document.querySelector('#lng').value === '' ? -103.392177745699 : document.querySelector('#lng').value;

        const mapa = L.map('mapa').setView([lat, lng], 16);

        // Eliminar pines previos
        let markers = new L.FeatureGroup().addTo(mapa);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapa);

        let marker;

        // agregar el pin
        marker = new L.marker([lat, lng], {
            draggable: true,
            autoPan: true
        }).addTo(mapa);

        // Agregar el pin a las capas
        markers.addLayer(marker);


       // Geocode Service
       const geocodeService = L.esri.Geocoding.geocodeService();

       // Buscador de direcciones
       const buscador = document.querySelector('#formbuscador');
       buscador.addEventListener('blur', buscarDireccion);

        reubicarPin(marker);

        function reubicarPin(marker) {
            // Detectar movimiento del marker
            marker.on('moveend', function(e) {
                marker = e.target;

                const posicion = marker.getLatLng();

                // console.log(posicion);

                // Centrar automaticamente
                mapa.panTo( new L.LatLng( posicion.lat, posicion.lng ) );

                // Reverse Geocoding, cuando el usuario reubica el pin
                geocodeService.reverse().latlng(posicion, 16).run(function(error, resultado) {
                    // console.log(error);

                    // console.log(resultado.address);

                    marker.bindPopup(resultado.address.LongLabel);
                    marker.openPopup();

                    // Llenar los campos
                    llenarInputs(resultado);

                })
            });
        }

        function buscarDireccion(e) {


            if(e.target.value.length > 1) {
                provider.search({query: e.target.value + 'Ciudad de M??xico MX' })
                    .then( resultado => {
                        if( resultado  ){

                            // Limpiar los pines previos
                            markers.clearLayers();

                            // Reverse Geocoding, cuando el usuario reubica el pin
                            geocodeService.reverse().latlng(resultado[0].bounds[0], 16).run(function(error, resultado) {

                                // Llenar los inputs
                                llenarInputs(resultado);

                                // Centrar el mapa
                                mapa.setView(resultado.latlng)


                                // Agregar el Pin
                                marker = new L.marker(resultado.latlng, {
                                    draggable: true,
                                    autoPan: true
                                }).addTo(mapa);

                                // asignar el contenedor de markers el nuevo pin
                                markers.addLayer(marker);


                                // Mover el pin
                                 reubicarPin(marker);

                            })
                        }
                    })
                    .catch( error => {
                        // console.log(error)
                    })
            }
        }


        function llenarInputs(resultado) {
            // console.log(resultado)
            document.querySelector('#direccion').value = resultado.address.Address || '';
            document.querySelector('#colonia').value = resultado.address.Neighborhood || '';
            document.querySelector('#lat').value = resultado.latlng.lat || '';
            document.querySelector('#lng').value = resultado.latlng.lng || '';
        }

    }

});