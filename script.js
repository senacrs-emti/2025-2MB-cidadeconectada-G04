let map, directionsService, directionsRenderer;

function initMap() {
    const estiloMapa = [
        { elementType: 'geometry', stylers: [{ color: '#1d232c' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#9aa0a6' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#1d232c' }] },
        { featureType: 'road', stylers: [{ color: '#2c3440' }] },
        { featureType: 'water', stylers: [{ color: '#0b111a' }] },
        { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'simplified' }] }
    ];

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -30.0346, lng: -51.2177 }, 
        zoom: 13,
        disableDefaultUI: true,
        styles: estiloMapa,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: false,
        polylineOptions: {
            strokeColor: '#1a73e8',
            strokeWeight: 5,
        }
    });
    directionsRenderer.setMap(map);
}

function atualizarIcone() {
    const tp = document.getElementById("transporte").value;
    const icon = document.getElementById("iconTransporte");
    const icons = {
        DRIVING: "https://cdn-icons-png.flaticon.com/512/296/296216.png",
        WALKING: "https://cdn-icons-png.flaticon.com/512/860/860752.png",
        BICYCLING: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
        TRANSIT: "https://cdn-icons-png.flaticon.com/512/61/61205.png"
    };
    icon.src = icons[tp];
}

function calcularRota() {
    const origem = document.getElementById("origem").value;
    const destino = document.getElementById("destino").value;
    const transporte = document.getElementById("transporte").value;

    directionsService.route({
        origin: origem,
        destination: destino,
        travelMode: transporte
    }, (res, status) => {
        if (status === "OK") {
            directionsRenderer.setDirections(res);
            const leg = res.routes[0].legs[0];

            // Fatores CO2 oficiais aproximados
            const fatores = {
                DRIVING: 0.120,
                TRANSIT: 0.060,
                BICYCLING: 0.000,
                WALKING: 0.000
            };

            const km = leg.distance.value / 1000;
            const fator = fatores[transporte];
            const co2 = (km * fator).toFixed(2);
            const co2Mensal = (km * fator * 30).toFixed(2);

            document.getElementById("infos").innerHTML = `
                <strong>Distância:</strong> ${leg.distance.text}<br>
                <strong>Duração:</strong> ${leg.duration.text}<br>
                <strong>CO₂ estimado:</strong> ${co2} kg<br>
                <strong>CO₂ mensal:</strong> ${co2Mensal} kg
            `;
        }
    });
}
