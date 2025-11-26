<?php
if (!empty($_GET["origem"]) && !empty($_GET["destino"])) {
echo json_encode([
"status" => "ok",
"origem" => $_GET["origem"],
"destino" => $_GET["destino"],
]);
}
?>