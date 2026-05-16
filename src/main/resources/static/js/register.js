function register() {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const pass = document.getElementById("pass").value;

    if (!nombre || !correo || !pass) {
        document.getElementById("mensaje").innerText = "Completa todos los campos";
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find(u => u.correo === correo);

    if (existe) {
        document.getElementById("mensaje").innerText = "El usuario ya existe";
        return;
    }

    usuarios.push({ nombre, correo, pass });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    document.getElementById("mensaje").style.color = "green";
    document.getElementById("mensaje").innerText = "Registro exitoso";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
}