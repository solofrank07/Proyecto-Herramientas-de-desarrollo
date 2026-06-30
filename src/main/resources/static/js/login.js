async function login() {

    const correo = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value.trim();

    const errorDiv = document.getElementById("error");
    const loginButton = document.querySelector("button"); // Asumiendo que solo hay un botón

    // 1. Limpiar errores y dar feedback al usuario
    errorDiv.innerText = "";
    loginButton.disabled = true;
    loginButton.innerText = "Ingresando...";

    if (!correo || !pass) {
        errorDiv.innerText = "Completa todos los campos";
        loginButton.disabled = false;
        loginButton.innerText = "Ingresar";
        return;
    }

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo: correo, password: pass })
        });

        // 2. Mejor manejo de errores HTTP
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Credenciales incorrectas o error del servidor");
        }

        const data = await response.json();

        // 3. Usar sessionStorage para mayor seguridad
        // Se borra al cerrar la pestaña/navegador
        sessionStorage.setItem("usuario", data.nombre);
        if (data.token) { // Si el backend envía un token, también lo guardamos
            sessionStorage.setItem("authToken", data.token);
        }

        window.location.assign("Index.html"); // Redirige a la página principal

    } catch (e) {
        console.error(e);
        errorDiv.innerText = e.message;
        loginButton.disabled = false;
        loginButton.innerText = "Ingresar";
    }
}