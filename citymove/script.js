let map;
let directionsService;
let directionsRenderer;
let autocompleteOrigem;
let autocompleteDestino;

function initMap() {
   
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -30.0346, lng: -51.2177 }, // Porto Alegre
        zoom: 13,
        disableDefaultUI: false,
    });

    
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map
    });

   
    const origemInput = document.getElementById("origem");
    const destinoInput = document.getElementById("destino");

    autocompleteOrigem = new google.maps.places.Autocomplete(origemInput, {
        fields: ["formatted_address", "geometry"]
    });

    autocompleteDestino = new google.maps.places.Autocomplete(destinoInput, {
        fields: ["formatted_address", "geometry"]
    });
}




function calcularRota() {
    const origem = document.getElementById("origem").value;
    const destino = document.getElementById("destino").value;
    const transporte = document.getElementById("transporte").value;

    if (!origem || !destino) {
        alert("Preencha origem e destino!");
        return;
    }

    directionsService.route(
        {
            origin: origem,
            destination: destino,
            travelMode: transporte
        },
        (result, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(result);
                mostrarInfo(result);
            } else {
                alert("Erro ao calcular rota: " + status);
            }
        }
    );
}


function mostrarInfo(result) {
    const leg = result.routes[0].legs[0];
    const distancia = leg.distance.text;
    const duracao = leg.duration.text;

    
    const tipo = document.getElementById("transporte").value;
    const dist_km = leg.distance.value / 1000;

    const emissoes = {
        DRIVING: 0.120,   // carro
        BICYCLING: 0,     // bike
        WALKING: 0,       // pé
        TRANSIT: 0.060    // ônibus
    };

    const co2 = emissoes[tipo] * dist_km;

    document.getElementById("info").innerHTML = `
        <h3>Resultados</h3>
        <p><b>Distância:</b> ${distancia}</p>
        <p><b>Duração:</b> ${duracao}</p>
        <p><b>Emissão estimada de CO₂:</b> ${co2.toFixed(2)} kg</p>
    `;
}
