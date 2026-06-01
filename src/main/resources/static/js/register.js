function register() {

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const pass = document.getElementById("pass").value;

    const mensaje = document.getElementById("mensaje");

    if (!nombre || !correo || !pass) {

        mensaje.style.color = "red";
        mensaje.innerText = "Completa todos los campos";

        return;
    }

    fetch("/api/auth/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nombre: nombre,
            correo: correo,
            contrasena: pass
        })

    })
        .then(response => response.json())
        .then(data => {

            if (!data || !data.id) {

                mensaje.style.color = "red";
                mensaje.innerText = "El usuario ya existe";

                return;
            }

            mensaje.style.color = "green";
            mensaje.innerText = "Registro exitoso";

            setTimeout(() => {

                window.location.href = "login.html";

            }, 1000);

        })
        .catch(error => {

            console.error(error);

            mensaje.style.color = "red";
            mensaje.innerText = "Error al registrar usuario";

        });
}