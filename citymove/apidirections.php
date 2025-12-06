<?php
header('Content-Type: application/json');

$origem = $_GET['origem'] ?? '';
$destino = $_GET['destino'] ?? '';
$modo = $_GET['modo'] ?? 'DRIVING';

echo json_encode([
    "status" => "OK",
    "origem" => $origem,
    "destino" => $destino,
    "modo" => $modo
]);
?>