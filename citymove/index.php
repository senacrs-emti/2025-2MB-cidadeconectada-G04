<?php ?>
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>CityMove — Navegação Sustentável</title>

  <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="citymove\favicon.png">

</head>

<body>
  <header class="site-header">
    <div class="brand">
      <img src="assets/pin-white-bg.png" alt="CityMove" class="logo">
      <h1>CityMove</h1>
    </div>
  </header>

  <main class="container">
    <section class="controls card">

      <label class="field">
        <span>Origem</span>
        <input id="origem" placeholder="Digite o endereço de origem" autocomplete="off">
      </label>

      <label class="field">
        <span>Destino</span>
        <input id="destino" placeholder="Digite o endereço de destino" autocomplete="off">
      </label>

      <label class="field small">
        <span>Transporte</span>
        <select id="transporte" onchange="updateIcon()">
          <option value="DRIVING">Carro</option>
          <option value="TRANSIT">Transporte público</option>
          <option value="BICYCLING">Bicicleta</option>
          <option value="WALKING">A pé</option>
        </select>
      </label>

      <div class="actions">
        <!-- ⚠ IDs corrigidos para bater com seu script -->
        <button id="btnRoute" class="btn primary">Calcular Rota</button>
        <button id="btnClear" class="btn ghost">Limpar</button>
      </div>

      <!-- ⚠ IDs batendo com seu JS -->
      <div class="summary" id="summary" aria-live="polite" hidden>
        <div><strong>Distância:</strong> <span id="dist">—</span></div>
        <div><strong>Tempo:</strong> <span id="time">—</span></div>
        <div><strong>CO₂ (única viagem):</strong> <span id="co2">—</span></div>
        <div><strong>CO₂ (30 dias):</strong> <span id="co2month">—</span></div>
      </div>

    </section>

    <section class="map card" id="map" aria-label="Mapa"></section>
  </main>

  <footer class="site-footer">CityMove • Projeto de demonstração</footer>

  <!-- Seu script -->
  <script src="script.js"></script>

  <!-- ⚠ Google Maps com callback=initMap obrigatória -->
  <script 
    async 
    defer 
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCZU4Gq5cEDB5aZ6mTmE1rKYe9rVuvk470&libraries=places&callback=initMap">
  </script>

</body>
</html>
