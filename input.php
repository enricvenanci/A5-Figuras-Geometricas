<?php
session_start();

if (isset($_POST['tipoFigura'])) {
    $_SESSION['tipoFigura'] = $_POST['tipoFigura'];
    unset($_SESSION['lados']);
    header('Location: input.php');
    exit;
}

if (!isset($_SESSION['tipoFigura'])) {
    header('Location: index.html');
    exit;
}

$tipo = $_SESSION['tipoFigura'];
$figuras = array(
    'Triangulo' => array('Triángulo', array('lado1' => 'Lado 1', 'lado2' => 'Lado 2', 'lado3' => 'Lado 3')),
    'Rectangulo' => array('Rectángulo', array('lado1' => 'Largo', 'lado2' => 'Ancho')),
    'Cuadrado' => array('Cuadrado', array('lado1' => 'Lado')),
    'Circulo' => array('Círculo', array('radio' => 'Radio'))
);

if (!isset($figuras[$tipo])) {
    header('Location: index.html');
    exit;
}

$nombre = $figuras[$tipo][0];
$campos = $figuras[$tipo][1];
$lados = isset($_SESSION['lados']) ? $_SESSION['lados'] : array();
$errores = array();
$errorTriangulo = '';

if (isset($_POST['calcular'])) {
    foreach ($campos as $campo => $etiqueta) {
        $valor = isset($_POST[$campo]) ? trim($_POST[$campo]) : '';
        $lados[$campo] = $valor;

        if (!is_numeric($valor) || $valor <= 0) {
            $errores[$campo] = 'Introduce un número mayor que cero.';
        }
    }

    $_SESSION['lados'] = $lados;

    if ($tipo === 'Triangulo' && count($errores) === 0) {
        if (
            $lados['lado1'] + $lados['lado2'] <= $lados['lado3']
            || $lados['lado1'] + $lados['lado3'] <= $lados['lado2']
            || $lados['lado2'] + $lados['lado3'] <= $lados['lado1']
        ) {
            $errorTriangulo = 'Las medidas no forman un triángulo.';
        }
    }

    if (count($errores) === 0 && $errorTriangulo === '') {
        header('Location: resultado.php');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Medidas</title>
    <link rel="stylesheet" href="estilos.css">
    <script src="figuras.js" defer></script>
</head>
<body>
    <header class="selection-header">Figura seleccionada: <strong><?= htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8') ?></strong></header>
    <main class="card">
        <h1>Introduce las medidas</h1>
        <form method="post" action="input.php" data-measure-form data-shape="<?= htmlspecialchars($tipo, ENT_QUOTES, 'UTF-8') ?>">
            <?php foreach ($campos as $campo => $etiqueta): ?>
                <label for="<?= $campo ?>"><?= $etiqueta ?></label>
                <input id="<?= $campo ?>" name="<?= $campo ?>" type="number" min="0" step="any"
                    value="<?= htmlspecialchars(isset($lados[$campo]) ? $lados[$campo] : '', ENT_QUOTES, 'UTF-8') ?>"
                    required data-measure>
                <small class="field-error" data-error-for="<?= $campo ?>"><?= isset($errores[$campo]) ? $errores[$campo] : '' ?></small>
            <?php endforeach; ?>
            <small class="field-error" data-triangle-error><?= $errorTriangulo ?></small>
            <button type="submit" name="calcular">Calcular</button>
        </form>
        <a class="back-link" href="index.html">Volver</a>
    </main>
</body>
</html>
