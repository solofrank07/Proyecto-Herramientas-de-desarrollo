function login() {
    const correo = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value.trim();

    fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
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
}