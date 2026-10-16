<?php
session_start();

require_once 'Triangulo.php';
require_once 'Rectangulo.php';
require_once 'Cuadrado.php';
require_once 'Circulo.php';

if (!isset($_SESSION['tipoFigura']) || !isset($_SESSION['lados'])) {
    header('Location: index.html');
    exit;
}

$tipo = $_SESSION['tipoFigura'];
$lados = $_SESSION['lados'];

if ($tipo === 'Triangulo') {
    $figura = new Triangulo('Triángulo', $lados['lado1'], $lados['lado2'], $lados['lado3']);
    $medidas = array('Lado 1' => $lados['lado1'], 'Lado 2' => $lados['lado2'], 'Lado 3' => $lados['lado3']);
} elseif ($tipo === 'Rectangulo') {
    $figura = new Rectangulo('Rectángulo', $lados['lado1'], $lados['lado2']);
    $medidas = array('Largo' => $lados['lado1'], 'Ancho' => $lados['lado2']);
} elseif ($tipo === 'Cuadrado') {
    $figura = new Cuadrado('Cuadrado', $lados['lado1']);
    $medidas = array('Lado' => $lados['lado1']);
} elseif ($tipo === 'Circulo') {
    $figura = new Circulo('Círculo', $lados['radio']);
    $medidas = array('Radio' => $lados['radio']);
} else {
    header('Location: index.html');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Resultados</title>
    <link rel="stylesheet" href="estilos.css?v=20261016">
</head>
<body>
    <header class="selection-header">Figura seleccionada: <strong><?= htmlspecialchars($figura->getTipoFigura(), ENT_QUOTES, 'UTF-8') ?></strong></header>
    <main class="card">
        <h1>Resultado</h1>
        <p><?= htmlspecialchars($figura->__toString(), ENT_QUOTES, 'UTF-8') ?></p>
        <p>Área: <strong><?= number_format($figura->calcularArea(), 2, ',', '.') ?></strong> cm²</p>
        <p>Perímetro: <strong><?= number_format($figura->calcularPerimetro(), 2, ',', '.') ?></strong> cm</p>
        <nav class="result-actions" aria-label="Acciones del resultado">
            <a class="button-link" href="input.php">Cambiar medidas</a>
            <a class="button-link button-link-secondary" href="index.html">Elegir otra figura</a>
        </nav>
    </main>
</body>
</html>
