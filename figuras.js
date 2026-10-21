var selectorFigura = document.querySelector('#tipoFigura');

if (selectorFigura) {
    selectorFigura.onblur = function () {
        if (this.value === '') {
            this.setCustomValidity('Selecciona una figura.');
        } else {
            this.setCustomValidity('');
        }
    };
}

var campos = document.querySelectorAll('[data-medida]');

for (var i = 0; i < campos.length; i++) {
    campos[i].onblur = function () {
        var campo = this;
        var formulario = campo.form;
        var valor = Number(campo.value);

        if (campo.value === '' || valor <= 0) {
            campo.setCustomValidity('Introduce un número mayor que cero.');
        } else {
            campo.setCustomValidity('');
        }

        if (formulario.getAttribute('data-figura') === 'Triangulo') {
            var lado1 = formulario.querySelector('[name="lado1"]');
            var lado2 = formulario.querySelector('[name="lado2"]');
            var lado3 = formulario.querySelector('[name="lado3"]');
            var numero1 = Number(lado1.value);
            var numero2 = Number(lado2.value);
            var numero3 = Number(lado3.value);

            if (lado1.value !== '' && numero1 > 0) {
                lado1.setCustomValidity('');
            }

            if (numero1 > 0 && numero2 > 0 && numero3 > 0) {
                if (numero1 + numero2 <= numero3 || numero1 + numero3 <= numero2
                    || numero2 + numero3 <= numero1) {
                    lado1.setCustomValidity('Las medidas no forman un triángulo.');
                } else {
                    lado1.setCustomValidity('');
                }
            }
        }
    };
}
