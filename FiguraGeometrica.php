<?php
class FiguraGeometrica{
    private $tipoFigura;
    private $lado1;

    public function __construct($tipoFigura, $lado1){
        $this->setTipoFigura($tipoFigura);
        $this->setLado1($lado1);
    }

    public function __destruct(){
    }

    public function getTipoFigura(){
        return $this->tipoFigura;
    }

    public function setTipoFigura($tipoFigura){
        $this->tipoFigura = $tipoFigura;
    }

    public function getLado1(){
        return $this->lado1;
    }

    public function setLado1($lado1){
        $this->lado1 = $lado1;
    }

    public function calcularArea(){
        return 0;
    }

    public function calcularPerimetro(){
        return 0;
    }

    public function __toString(){
        return $this->getTipoFigura() . ' de medida ' . $this->getLado1() . ' cm.';
    }

}
