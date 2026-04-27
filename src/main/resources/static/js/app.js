//:p

function mostrarLoader() {
    document.getElementById("loader").classList.remove("hidden");
}

function ocultarLoader() {
    document.getElementById("loader").classList.add("hidden");
}

function renderizar(lista) {
    const contenedor = document.getElementById("resultados");
    contenedor.innerHTML = "";

    lista.forEach(item => {
        contenedor.innerHTML += `
            <div class="card">
                <img src="https://source.unsplash.com/400x300/?food">
                <div class="card-content">
                    <h3>${item.nombre}</h3>
                    <p>${item.descripcion}</p>
                </div>
            </div>
        `;
    });
}

function buscar() {
    const query = document.getElementById("inputBusqueda").value;
    const presupuesto = document.getElementById("inputPresupuesto").value || 0;
    const momento = document.getElementById("inputMomento").value;

    mostrarLoader();

    fetch("http://localhost:8080/api/recomendar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: query,
            presupuesto: presupuesto,
            momento: momento
        })
    })
        .then(res => res.json())
        .then(data => {
            ocultarLoader();

            if (data.length === 0) {
                document.getElementById("resultados").innerHTML = "<p>No se encontraron resultados</p>";
                return;
            }

            renderizar(data);
        })
        .catch(() => {
            ocultarLoader();
            document.getElementById("resultados").innerHTML = "<p>Error al conectar con el servidor</p>";
        });
}

function sorprendeme() {
    mostrarLoader();

    fetch("http://localhost:8080/api/recomendar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: "",
            presupuesto: 0,
            momento: ""
        })
    })
        .then(res => res.json())
        .then(data => {
            ocultarLoader();

            if (data.length === 0) {
                document.getElementById("resultados").innerHTML = "<p>No hay datos</p>";
                return;
            }

            const random = data[Math.floor(Math.random() * data.length)];
            renderizar([random]);
        })
        .catch(() => {
            ocultarLoader();
            document.getElementById("resultados").innerHTML = "<p>Error al conectar con el servidor</p>";
        });
}

function mostrarAleatorios() {
    fetch("http://localhost:8080/api/recomendar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: "",
            presupuesto: 0,
            momento: ""
        })
    })
        .then(res => res.json())
        .then(data => {
            const mezclados = data.sort(() => 0.5 - Math.random());
            renderizar(mezclados.slice(0, 3));
        })
        .catch(() => {
            document.getElementById("resultados").innerHTML = "<p>Error al cargar datos</p>";
        });
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

window.onload = mostrarAleatorios;