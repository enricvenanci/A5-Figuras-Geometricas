<?php
require_once 'FiguraGeometrica.php';
class Cuadrado extends FiguraGeometrica{
    public function __construct($tipoFigura, $lado1){
        parent::__construct($tipoFigura, $lado1);
    }

    public function __destruct(){
    }

    public function calcularArea(){
        return $this->getLado1() * $this->getLado1();
    }

    public function calcularPerimetro(){
        return 4 * $this->getLado1();
    }

    public function __toString(){
        return 'Los lados de este cuadrado miden ' . $this->getLado1() . ' cm.';
    }

}
