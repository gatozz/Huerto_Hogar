// Funcionalidad para alternar entre login y registro
document.getElementById('showRegister').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});

document.getElementById('backToLogin').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

// Validación básica de formularios
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Aquí iría la lógica de autenticación real
    console.log('Iniciando sesión con:', email, password);
    alert('¡Inicio de sesión exitoso! Serás redirigido a la página principal.');
    // window.location.href = 'index.html'; // Redirigir al homepage después del login
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    // Aquí iría la lógica de registro real
    console.log('Registrando nuevo usuario');
    alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

document.getElementById('forgotPassword').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Funcionalidad de recuperación de contraseña en desarrollo.');
});