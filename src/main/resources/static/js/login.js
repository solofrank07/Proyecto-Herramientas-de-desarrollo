function login() {
<<<<<<< HEAD
    const correo = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value.trim();

    fetch("/api/auth/login", {
=======
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:8080/api/login", {
>>>>>>> f7ead132db0219c71c8f5d55056183e2c6c913c4
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
<<<<<<< HEAD
            correo: correo,
            password: pass
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Credenciales incorrectas");
        return res.json();
    })
    .then(data => {
        // 🔥 GUARDADO SEGURO
        localStorage.setItem("usuario", data.nombre);

        // 🔥 REDIRECCIÓN SEGURA (NO RELOAD)
        window.location.assign("/index.html");
    })
    .catch(err => {
        document.getElementById("error").innerText = err.message;
    });
=======
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
>>>>>>> f7ead132db0219c71c8f5d55056183e2c6c913c4
}