'use strict';

function mostrarError(elemento, mensaje) {
    if (elemento) {
        elemento.textContent = mensaje;
    }
}

var formularioSeleccion = document.querySelector('[data-selection-form]');

if (formularioSeleccion) {
    var selectorFigura = formularioSeleccion.querySelector('#tipoFigura');
    var errorFigura = formularioSeleccion.querySelector('[data-error-for="tipoFigura"]');

    selectorFigura.addEventListener('invalid', function () {
        mostrarError(errorFigura, 'Selecciona una figura para continuar.');
    });

    selectorFigura.addEventListener('change', function () {
        mostrarError(errorFigura, '');
    });
}

function validarCampo(campo) {
    var valor = Number(campo.value);
    var error = document.querySelector('[data-error-for="' + campo.name + '"]');

    if (campo.value.trim() === '' || isNaN(valor) || !isFinite(valor) || valor <= 0) {
        mostrarError(error, 'Introduce un número mayor que cero.');
        return false;
    }

    mostrarError(error, '');
    return true;
}

function validarTriangulo(formulario) {
    var errorTriangulo = formulario.querySelector('[data-triangle-error]');

    if (formulario.getAttribute('data-shape') !== 'Triangulo' || !errorTriangulo) {
        return true;
    }

    var lado1 = Number(document.getElementById('lado1').value);
    var lado2 = Number(document.getElementById('lado2').value);
    var lado3 = Number(document.getElementById('lado3').value);

    if (isNaN(lado1) || !isFinite(lado1) || lado1 <= 0 || isNaN(lado2) || !isFinite(lado2) || lado2 <= 0 || isNaN(lado3) || !isFinite(lado3) || lado3 <= 0) {
        mostrarError(errorTriangulo, '');
        return true;
    }

    if (lado1 + lado2 <= lado3 || lado1 + lado3 <= lado2 || lado2 + lado3 <= lado1) {
        mostrarError(errorTriangulo, 'Las medidas no forman un triángulo.');
        return false;
    }

    mostrarError(errorTriangulo, '');
    return true;
}

var formularioMedidas = document.querySelector('[data-measure-form]');

if (formularioMedidas) {
    var camposMedida = formularioMedidas.querySelectorAll('[data-measure]');

    for (var i = 0; i < camposMedida.length; i++) {
        camposMedida[i].addEventListener('invalid', function () {
            validarCampo(this);
        });

        camposMedida[i].addEventListener('input', function () {
            validarCampo(this);
            validarTriangulo(formularioMedidas);
        });
    }

    formularioMedidas.addEventListener('submit', function (evento) {
        var hayErrores = false;
        var primerCampoConError = null;

        for (var i = 0; i < camposMedida.length; i++) {
            if (!validarCampo(camposMedida[i])) {
                hayErrores = true;
                if (primerCampoConError === null) {
                    primerCampoConError = camposMedida[i];
                }
            }
        }

        if (!validarTriangulo(formularioMedidas)) {
            hayErrores = true;
        }

        if (hayErrores) {
            evento.preventDefault();
            if (primerCampoConError !== null) {
                primerCampoConError.focus();
            } else if (camposMedida.length > 0) {
                camposMedida[0].focus();
            }
        }
    });
}