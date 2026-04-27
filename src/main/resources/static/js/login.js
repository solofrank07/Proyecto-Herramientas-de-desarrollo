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
}