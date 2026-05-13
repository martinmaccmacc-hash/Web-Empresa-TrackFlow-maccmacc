document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    const fields = {
        tipo: document.querySelectorAll('input[name="tipo"]'),
        pais: document.getElementById('pais'),
        asunto: document.getElementById('asunto'),
        nombre: document.getElementById('nombre'),
        telefono: document.getElementById('telefono'),
        correo: document.getElementById('correo'),
        contrasena: document.getElementById('contrasena'),
        confirmarContrasena: document.getElementById('confirmarContrasena'),
        mensaje: document.getElementById('mensaje')
    };

    const errors = {
        tipo: document.getElementById('tipoError'),
        pais: document.getElementById('paisError'),
        asunto: document.getElementById('asuntoError'),
        nombre: document.getElementById('nombreError'),
        telefono: document.getElementById('telefonoError'),
        correo: document.getElementById('correoError'),
        contrasena: document.getElementById('contrasenaError'),
        confirmar: document.getElementById('confirmarError'),
        mensaje: document.getElementById('mensajeError')
    };

    const successMessage = document.getElementById('successMessage');

    // Validación en tiempo real
    fields.asunto.addEventListener('blur', () => validateAsunto());
    fields.asunto.addEventListener('input', () => validateAsunto());

    fields.nombre.addEventListener('blur', () => validateNombre());
    fields.nombre.addEventListener('input', () => validateNombre());

    fields.telefono.addEventListener('blur', () => validateTelefono());
    fields.telefono.addEventListener('input', () => validateTelefono());

    fields.correo.addEventListener('blur', () => validateCorreo());
    fields.correo.addEventListener('input', () => validateCorreo());

    fields.contrasena.addEventListener('blur', () => validateContrasena());
    fields.contrasena.addEventListener('input', () => validateContrasena());

    fields.confirmarContrasena.addEventListener('blur', () => validateConfirmar());
    fields.confirmarContrasena.addEventListener('input', () => validateConfirmar());

    fields.mensaje.addEventListener('blur', () => validateMensaje());
    fields.mensaje.addEventListener('input', () => validateMensaje());

    fields.tipo.forEach(radio => {
        radio.addEventListener('change', () => validateTipo());
    });

    fields.pais.addEventListener('change', () => validatePais());
    fields.pais.addEventListener('blur', () => validatePais());

    // Validación al enviar
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            // Simular envío
            successMessage.classList.remove('hidden');
            form.reset();
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => successMessage.classList.add('hidden'), 5000);
        }
    });

    function validateForm() {
        let isValid = true;
        isValid &= validateTipo();
        isValid &= validatePais();
        isValid &= validateAsunto();
        isValid &= validateNombre();
        isValid &= validateTelefono();
        isValid &= validateCorreo();
        isValid &= validateContrasena();
        isValid &= validateConfirmar();
        isValid &= validateMensaje();
        return isValid;
    }

    function validateTipo() {
        const selected = document.querySelector('input[name="tipo"]:checked');
        if (!selected) {
            errors.tipo.classList.remove('hidden');
            return false;
        } else {
            errors.tipo.classList.add('hidden');
            return true;
        }
    }

    function validateAsunto() {
        if (fields.asunto.value.trim() === '') {
            errors.asunto.classList.remove('hidden');
            return false;
        } else {
            errors.asunto.classList.add('hidden');
            return true;
        }
    }

    function validateNombre() {
        const names = fields.nombre.value.trim().split(' ');
        if (names.length < 2 || names.some(name => name === '')) {
            errors.nombre.classList.remove('hidden');
            return false;
        } else {
            errors.nombre.classList.add('hidden');
            return true;
        }
    }

    function validateTelefono() {
        const phoneRegex = /^\+?[\d\s\-\(\)]{7,}$/;
        if (!phoneRegex.test(fields.telefono.value.trim())) {
            errors.telefono.classList.remove('hidden');
            return false;
        } else {
            errors.telefono.classList.add('hidden');
            return true;
        }
    }

    function validateCorreo() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fields.correo.value.trim())) {
            errors.correo.classList.remove('hidden');
            return false;
        } else {
            errors.correo.classList.add('hidden');
            return true;
        }
    }

    function validateContrasena() {
        const pass = fields.contrasena.value;
        const hasUpper = /[A-Z]/.test(pass);
        const hasLower = /[a-z]/.test(pass);
        const hasNumber = /\d/.test(pass);
        const isLongEnough = pass.length >= 8;
        if (!hasUpper || !hasLower || !hasNumber || !isLongEnough) {
            errors.contrasena.classList.remove('hidden');
            return false;
        } else {
            errors.contrasena.classList.add('hidden');
            return true;
        }
    }

    function validateConfirmar() {
        if (fields.confirmarContrasena.value !== fields.contrasena.value) {
            errors.confirmar.classList.remove('hidden');
            return false;
        } else {
            errors.confirmar.classList.add('hidden');
            return true;
        }
    }

    function validateMensaje() {
        if (fields.mensaje.value.trim() === '') {
            errors.mensaje.classList.remove('hidden');
            return false;
        } else {
            errors.mensaje.classList.add('hidden');
            return true;
        }
    }

    function validatePais() {
        if (fields.pais.value === '') {
            errors.pais.classList.remove('hidden');
            return false;
        } else {
            errors.pais.classList.add('hidden');
            return true;
        }
    }
});

function limpiarFormulario() {
    document.getElementById('applicationForm').reset();
    // Ocultar errores
    document.querySelectorAll('.text-red-500').forEach(el => el.classList.add('hidden'));
    document.getElementById('successMessage').classList.add('hidden');
}