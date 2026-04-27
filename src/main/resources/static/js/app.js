const data = [
    { nombre: "Arroz con Pollo", descripcion: "Económico y fácil" },
    { nombre: "Lomo Saltado", descripcion: "Clásico peruano" },
    { nombre: "Ceviche", descripcion: "Fresco y delicioso" },
    { nombre: "Arroz Chaufa", descripcion: "Rápido y barato" },
    { nombre: "Ají de Gallina", descripcion: "Cremoso y sabroso" },
    { nombre: "Tallarines Verdes", descripcion: "Ligero y casero" }
];

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
    const query = document.getElementById("inputBusqueda").value.toLowerCase();

    mostrarLoader();

    setTimeout(() => {
        const resultados = data.filter(item =>
            item.nombre.toLowerCase().includes(query)
        );

        ocultarLoader();

        if (resultados.length === 0) {
            document.getElementById("resultados").innerHTML = "<p>No se encontraron resultados</p>";
            return;
        }

        renderizar(resultados);
    }, 800);
}

function sorprendeme() {
    mostrarLoader();

    setTimeout(() => {
        const random = data[Math.floor(Math.random() * data.length)];
        ocultarLoader();
        renderizar([random]);
    }, 800);
}

function mostrarAleatorios() {
    const mezclados = data.sort(() => 0.5 - Math.random());
    renderizar(mezclados.slice(0, 3));
}

window.onload = mostrarAleatorios;