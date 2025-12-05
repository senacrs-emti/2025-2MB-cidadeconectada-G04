
let map, directionsService, directionsRenderer, originAutocomplete, destAutocomplete;
const CO2_FACTORS = { DRIVING: 0.120, TRANSIT: 0.060, BICYCLING: 0.000, WALKING: 0.000 }; // kg/km

function initMap() {

  const poa = { lat: -30.0346, lng: -51.2177 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: poa,
    zoom: 13,
    disableDefaultUI: true,
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#0b1220' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#9aa0a6' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#0b1220' }] },
      { featureType: 'road', stylers: [{ color: '#112233' }] },
      { featureType: 'water', stylers: [{ color: '#061523' }] },
      { featureType: 'poi', stylers: [{ visibility: 'off' }] }
    ]
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: false, polylineOptions:{ strokeColor:'#1a73e8', strokeWeight:6 } });
  directionsRenderer.setMap(map);

  // Autocomplete (Places)
  const origemInput = document.getElementById('origem');
  const destinoInput = document.getElementById('destino');
  originAutocomplete = new google.maps.places.Autocomplete(origemInput, { fields: ['place_id','geometry','formatted_address'] });
  destAutocomplete = new google.maps.places.Autocomplete(destinoInput, { fields: ['place_id','geometry','formatted_address'] });

  document.getElementById('btnRoute').addEventListener('click', onCalculate);
  document.getElementById('btnClear').addEventListener('click', clearRoute);
  // allow pressing Enter
  origemInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); onCalculate(); } });
  destinoInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); onCalculate(); } });
}

function onCalculate(){
  const origem = document.getElementById('origem').value;
  const destino = document.getElementById('destino').value;
  const transporte = document.getElementById('transporte').value;
  if(!origem || !destino){ alert('Preencha origem e destino'); return; }

  directionsService.route({
    origin: origem,
    destination: destino,
    travelMode: transporte,
    provideRouteAlternatives: false
  }, (result, status)=>{
    if(status === 'OK'){
      directionsRenderer.setDirections(result);
      const leg = result.routes[0].legs[0];
      const km = leg.distance.value / 1000;
      const tempoTexto = leg.duration.text;
      const distanciaTexto = leg.distance.text;
      const fator = CO2_FACTORS[transporte] ?? 0.12;
      const co2 = (km * fator).toFixed(2);
      const co230 = (km * fator * 30).toFixed(2);

      document.getElementById('dist').innerText = distanciaTexto;
      document.getElementById('time').innerText = tempoTexto;
      document.getElementById('co2').innerText = co2 + ' kg';
      document.getElementById('co2month').innerText = co230 + ' kg';
      document.getElementById('summary').hidden = false;

      // fit bounds
      const bounds = new google.maps.LatLngBounds();
      result.routes[0].overview_path.forEach(p => bounds.extend(p));
      map.fitBounds(bounds);

      // optional: send to backend log (no API key needed)
      // sendLog({ origem, destino, transporte, distancia: km, co2 });
    } else {
      alert('Erro ao calcular rota: ' + status);
    }
  });
}

function clearRoute(){
  directionsRenderer.setDirections({routes: []});
  document.getElementById('origem').value = '';
  document.getElementById('destino').value = '';
  document.getElementById('summary').hidden = true;
}

// optional backend logger (requires api/log.php on server)
function sendLog(data){
  fetch('api/log.php', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  }).catch(()=>{});
}

function updateIcon(){
  // reserved to update UI icons if you want
}
