<<<<<<< HEAD
async function login() {

    const correo = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value.trim();

    const error = document.getElementById("error");

    error.innerText = "";

    if (!correo || !pass) {
        error.innerText = "Completa todos los campos";
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:8080/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo: correo,
                    password: pass
                })
            }
        );

        const data = await response.json();

        if (!data || !data.nombre) {
            error.innerText = "Correo o contraseña incorrectos";
            return;
        }

        localStorage.setItem("usuario", data.nombre);

        window.location.href = "Index.html";

    } catch (e) {

        console.error(e);

        error.innerText = "Error al conectar con el servidor";
    }
=======
function login() {
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario: usuario,
            password: password
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === "ok") {
                localStorage.setItem("user", usuario);
                window.location.href = "index.html";
            } else {
                document.getElementById("error").textContent = "Credenciales incorrectas";
            }
        })
        .catch(() => {
            document.getElementById("error").textContent = "Error en el servidor";
        });
>>>>>>> 15e787398112ef1d80e2d6b95517e71ad3ef23d2
}