'use strict';

var formularioSeleccion = document.querySelector('[data-selection-form]');

if (formularioSeleccion) {
    var selectorFigura = formularioSeleccion.querySelector('#tipoFigura');
    var errorFigura = formularioSeleccion.querySelector('[data-error-for="tipoFigura"]');

    formularioSeleccion.noValidate = true;
    formularioSeleccion.addEventListener('submit', function (evento) {
        if (selectorFigura.value === '') {
            evento.preventDefault();
            errorFigura.textContent = 'Selecciona una figura.';
            selectorFigura.focus();
        }
    });

    selectorFigura.addEventListener('change', function () {
        errorFigura.textContent = '';
    });
}

var formularioMedidas = document.querySelector('[data-measure-form]');

if (formularioMedidas) {
    var camposMedida = formularioMedidas.querySelectorAll('[data-measure]');
    var errorTriangulo = formularioMedidas.querySelector('[data-triangle-error]');

    formularioMedidas.noValidate = true;
    formularioMedidas.addEventListener('submit', function (evento) {
        var primerCampoInvalido = null;
        var valores = [];

        for (var i = 0; i < camposMedida.length; i++) {
            var campo = camposMedida[i];
            var valor = Number(campo.value);
            var campoInvalido = campo.value === '' || !isFinite(valor) || valor <= 0;
            var errorCampo = formularioMedidas.querySelector(
                '[data-error-for="' + campo.name + '"]'
            );

            errorCampo.textContent = campoInvalido
                ? 'Introduce un número mayor que cero.'
                : '';
            valores.push(valor);

            if (campoInvalido && primerCampoInvalido === null) {
                primerCampoInvalido = campo;
            }
        }

        var trianguloInvalido = false;

        if (formularioMedidas.getAttribute('data-shape') === 'Triangulo'
            && primerCampoInvalido === null) {
            trianguloInvalido = valores[0] + valores[1] <= valores[2]
                || valores[0] + valores[2] <= valores[1]
                || valores[1] + valores[2] <= valores[0];
        }

        errorTriangulo.textContent = trianguloInvalido
            ? 'Las medidas no forman un triángulo.'
            : '';

        if (primerCampoInvalido !== null || trianguloInvalido) {
            evento.preventDefault();
            (primerCampoInvalido || camposMedida[0]).focus();
        }
    });
}
