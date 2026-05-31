async function register() {

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const pass = document.getElementById("pass").value;

    const mensaje = document.getElementById("mensaje");

    if (!nombre || !correo || !pass) {
        mensaje.style.color = "red";
        mensaje.innerText = "Completa todos los campos";
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:8080/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: nombre,
                    correo: correo,
                    contrasena: pass
                })
            }
        );

        const data = await response.json();

        if (data.status === "ok") {

            mensaje.style.color = "green";
            mensaje.innerText = data.mensaje;

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);

        } else {

            mensaje.style.color = "red";
            mensaje.innerText = data.mensaje;
        }

    } catch (error) {

        mensaje.style.color = "red";
        mensaje.innerText = "Error al conectar con el servidor";

        console.error(error);
    }
}