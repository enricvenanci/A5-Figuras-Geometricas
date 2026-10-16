<?php
require_once 'FiguraGeometrica.php';
class Rectangulo extends FiguraGeometrica{
    private $lado2;

    public function __construct($tipoFigura, $lado1, $lado2){
        parent::__construct($tipoFigura, $lado1);
        $this->setLado2($lado2);
    }

    public function __destruct(){
    }

    public function getLado2(){
        return $this->lado2;
    }

    public function setLado2($lado2){
        $this->lado2 = $lado2;
    }

    public function calcularArea(){
        return $this->getLado1() * $this->getLado2();
    }

    public function calcularPerimetro(){
        return 2 * ($this->getLado1() + $this->getLado2());
    }

    public function __toString(){
        return 'La longitud de los lados de este rectángulo es de  ' . $this->getLado1() . ' y ' . $this->getLado2() . ' cm.';
    }
}
