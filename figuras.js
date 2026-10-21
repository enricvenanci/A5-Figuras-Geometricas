var selectorFigura = document.querySelector('#tipoFigura');

if (selectorFigura) {
    selectorFigura.onblur = validarSelectorFigura;
}

function validarSelectorFigura() {
    var mensajeError = document.querySelector('[data-error-de="tipoFigura"]');

    if (this.value === '') {
        mensajeError.textContent = 'Selecciona una figura.';
        this.setCustomValidity('Selecciona una figura.');
    } else {
        mensajeError.textContent = '';
        this.setCustomValidity('');
    }
}

var camposMedida = document.querySelectorAll('[data-medida]');

for (var indice = 0; indice < camposMedida.length; indice++) {
    camposMedida[indice].onblur = validarCampoMedida;
}

function validarCampoMedida() {
    var campoActual = this;
    var formularioMedidas = campoActual.form;
    var mensajeError = formularioMedidas.querySelector('[data-error-de="' + campoActual.name + '"]');
    var valorMedida = Number(campoActual.value);

    if (campoActual.value === '' || !isFinite(valorMedida) || valorMedida <= 0) {
        mensajeError.textContent = 'Introduce un número mayor que cero.';
        campoActual.setCustomValidity('Introduce un número mayor que cero.');
    } else {
        mensajeError.textContent = '';
        campoActual.setCustomValidity('');
    }

    if (formularioMedidas.getAttribute('data-figura') === 'Triangulo') {
        validarLadosTriangulo(formularioMedidas);
    }
}

function validarLadosTriangulo(formularioMedidas) {
    var campoLadoUno = formularioMedidas.querySelector('[name="lado1"]');
    var campoLadoDos = formularioMedidas.querySelector('[name="lado2"]');
    var campoLadoTres = formularioMedidas.querySelector('[name="lado3"]');
    var mensajeErrorTriangulo = formularioMedidas.querySelector('[data-error-triangulo]');
    var ladoUno = Number(campoLadoUno.value);
    var ladoDos = Number(campoLadoDos.value);
    var ladoTres = Number(campoLadoTres.value);

    mensajeErrorTriangulo.textContent = '';

    if (campoLadoUno.value !== '' && isFinite(ladoUno) && ladoUno > 0) {
        campoLadoUno.setCustomValidity('');
    }

    if (ladoUno > 0 && ladoDos > 0 && ladoTres > 0) {
        if (ladoUno + ladoDos <= ladoTres
            || ladoUno + ladoTres <= ladoDos
            || ladoDos + ladoTres <= ladoUno) {
            mensajeErrorTriangulo.textContent = 'Las medidas no forman un triángulo.';
            campoLadoUno.setCustomValidity('Las medidas no forman un triángulo.');
        }
    }
}
