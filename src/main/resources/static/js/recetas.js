/**
 * Mock Data for Recipes
 */
let recipes = [];

const categories = ["Todas", "Desayuno", "Almuerzo", "Cena", "Postres", "Bebidas", "Comida Rápida", "Saludable"];
let currentCategory = "Todas";
let currentSearch = "";
let currentDifficulty = "all";

async function cargarRecetas() {

    try {

        const response = await fetch("/api/recetas");

        const data = await response.json();

        recipes = data.map(r => ({
            id: r.id,
            title: r.nombre,
            description: r.descripcion,
            category: capitalizar(r.tipoComida),
            price: r.precioEstimado,

            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
            time: "30 min",
            difficulty: "Media",
            ingredients: ["Información no disponible"],
            steps: ["Información no disponible"]
        }));

        renderRecipes();
        renderAdminTable();

        console.log("Recetas cargadas:", recipes);

    } catch (error) {

        console.error("Error cargando recetas:", error);

    }
}

function capitalizar(texto) {
    if (!texto) return "";
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

document.addEventListener("DOMContentLoaded", () => {

    renderCategories();

    setupEventListeners();

    cargarRecetas();

});

function setupEventListeners() {
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", (e) => {
        currentSearch = e.target.value.toLowerCase();
        renderRecipes();
    });

    const filterDiff = document.getElementById("filter-difficulty");
    filterDiff.addEventListener("change", (e) => {
        currentDifficulty = e.target.value;
        renderRecipes();
    });
}

// =========================================
// NAVIGATION
// =========================================
function showView(viewName) {
    // Hide all views
    document.querySelectorAll('.view').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
    });
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    
    if(viewName === 'home') {
        document.getElementById('home-view').style.display = 'block';
        document.querySelector('.nav-link[onclick="showView(\'home\')"]').classList.add('active');
    } else if(viewName === 'admin') {
        document.getElementById('admin-view').style.display = 'block';
        document.querySelector('.nav-link[onclick="showView(\'admin\')"]').classList.add('active');
        renderAdminTable();
    }
}

// =========================================
// MAIN RECIPES VIEW
// =========================================
function renderCategories() {
    const container = document.getElementById("categories-container");
    container.innerHTML = "";
    
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = `category-pill ${cat === currentCategory ? 'active' : ''}`;
        
        // Add icons for categories
        let icon = "";
        switch(cat) {
            case "Todas": icon = '<i class="fa-solid fa-border-all"></i> '; break;
            case "Desayuno": icon = '<i class="fa-solid fa-mug-saucer"></i> '; break;
            case "Almuerzo": icon = '<i class="fa-solid fa-bowl-food"></i> '; break;
            case "Cena": icon = '<i class="fa-solid fa-wine-glass"></i> '; break;
            case "Postres": icon = '<i class="fa-solid fa-ice-cream"></i> '; break;
            case "Bebidas": icon = '<i class="fa-solid fa-martini-glass"></i> '; break;
            case "Comida Rápida": icon = '<i class="fa-solid fa-burger"></i> '; break;
            case "Saludable": icon = '<i class="fa-solid fa-leaf"></i> '; break;
        }
        
        btn.innerHTML = icon + cat;
        btn.onclick = () => {
            currentCategory = cat;
            renderCategories();
            renderRecipes();
        };
        container.appendChild(btn);
    });
}

function renderRecipes() {
    const container = document.getElementById("recipes-grid");
    container.innerHTML = "";
    
    const filteredRecipes = recipes.filter(r => {
        const matchCategory = currentCategory === "Todas" || r.category === currentCategory;
        const matchSearch =
            r.title.toLowerCase().includes(currentSearch) ||
            (r.ingredients || []).some(i =>
                i.toLowerCase().includes(currentSearch)
            );
        const matchDifficulty = currentDifficulty === "all" || r.difficulty === currentDifficulty;
        
        return matchCategory && matchSearch && matchDifficulty;
    });

    if (filteredRecipes.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fa-solid fa-face-frown text-muted" style="font-size: 48px; margin-bottom: 16px;"></i>
                <h3 style="font-size: 20px;">No encontramos recetas</h3>
                <p class="text-muted">Intenta ajustando tus filtros o búsqueda.</p>
            </div>
        `;
        return;
    }

    filteredRecipes.forEach(recipe => {
        const card = document.createElement("article");
        card.className = "recipe-card";
        card.onclick = () => openRecipeDetail(recipe.id);
        
        // Determine difficulty icon color
        let diffColor = recipe.difficulty === 'Fácil' ? '#10B981' : (recipe.difficulty === 'Media' ? '#F59E0B' : '#EF4444');
        
        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${recipe.image}" alt="${recipe.title}" class="card-image" loading="lazy">
                <div class="card-price">$${recipe.price.toFixed(2)}</div>
            </div>
            <div class="card-content">
                <div class="card-meta">
                    <span class="card-category">${recipe.category}</span>
                </div>
                <h3 class="card-title">${recipe.title}</h3>
                <p class="card-desc">${recipe.description}</p>
                <div class="card-footer">
                    <div class="meta-item">
                        <i class="fa-regular fa-clock"></i> ${recipe.time}
                    </div>
                    <div class="meta-item" style="color: ${diffColor}">
                        <i class="fa-solid fa-fire"></i> ${recipe.difficulty}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// =========================================
// RECIPE DETAIL MODAL
// =========================================
function openRecipeDetail(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;
    
    const content = document.getElementById("recipe-detail-content");
    
    content.innerHTML = `
        <div class="detail-image-col">
            <img src="${recipe.image}" alt="${recipe.title}" class="detail-image">
        </div>
        <div class="detail-content-col">
            <span class="detail-category">${recipe.category}</span>
            <h2 class="detail-title">${recipe.title}</h2>
            <p class="text-muted" style="font-size: 16px; margin-bottom: 24px;">${recipe.description}</p>
            
            <div class="detail-meta">
                <div class="detail-meta-item">
                    <i class="fa-regular fa-clock text-muted"></i> ${recipe.time}
                </div>
                <div class="detail-meta-item">
                    <i class="fa-solid fa-fire text-muted"></i> Dificultad: ${recipe.difficulty}
                </div>
                <div class="detail-meta-item" style="color: var(--primary); font-weight: 700;">
                    <i class="fa-solid fa-tag text-muted"></i> $${recipe.price.toFixed(2)}
                </div>
            </div>
            
            <h4 class="detail-section-title">Ingredientes</h4>
            <ul class="ingredients-list">
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            
            <h4 class="detail-section-title">Instrucciones</h4>
            <ol class="steps-list">
                ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
            
            <div style="margin-top: 40px;">
                <button class="btn btn-accent" style="width: 100%;">
                    <i class="fa-solid fa-cart-shopping"></i> Ordenar Ingredientes
                </button>
            </div>
        </div>
    `;
    
    document.getElementById("recipe-modal").classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling
}

function closeRecipeModal() {
    document.getElementById("recipe-modal").classList.remove("active");
    document.body.style.overflow = "";
}

// =========================================
// ADMIN PANEL
// =========================================
function renderAdminTable() {

    const tbody = document.getElementById("admin-table-body");

    if (!tbody) return;

    tbody.innerHTML = "";

    recipes.forEach(recipe => {
        const tr = document.createElement("tr");
        
        let diffBadgeClass = recipe.difficulty === 'Fácil' ? 'badge-facil' : (recipe.difficulty === 'Media' ? 'badge-media' : 'badge-dificil');
        
        tr.innerHTML = `
            <td>
                <div class="td-recipe-info">
                    <img src="${recipe.image}" class="td-img">
                    <div class="td-title">${recipe.title}</div>
                </div>
            </td>
            <td>${recipe.category}</td>
            <td><span class="badge ${diffBadgeClass}">${recipe.difficulty}</span></td>
            <td>${recipe.time}</td>
            <td>$${recipe.price.toFixed(2)}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-edit" onclick="editRecipe(${recipe.id})" title="Editar">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteRecipe(${recipe.id})" title="Eliminar">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openAdminModal(id = null) {
    const modal = document.getElementById("admin-modal");
    const form = document.getElementById("admin-form");
    const title = document.getElementById("admin-modal-title");
    
    form.reset();
    document.getElementById("form-id").value = "";
    title.innerText = "Agregar Nueva Receta";
    
    if (id) {
        const recipe = recipes.find(r => r.id === id);
        if (recipe) {
            title.innerText = "Editar Receta";
            document.getElementById("form-id").value = recipe.id;
            document.getElementById("form-name").value = recipe.title;
            document.getElementById("form-image").value = recipe.image;
            document.getElementById("form-category").value = recipe.category;
            document.getElementById("form-price").value = recipe.price;
            document.getElementById("form-time").value = recipe.time;
            document.getElementById("form-difficulty").value = recipe.difficulty;
            document.getElementById("form-description").value = recipe.description;
            document.getElementById("form-ingredients").value = recipe.ingredients.join(", ");
            document.getElementById("form-steps").value = recipe.steps.join("\n");
        }
    }
    
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeAdminModal() {
    document.getElementById("admin-modal").classList.remove("active");
    document.body.style.overflow = "";
}

async function handleAdminSubmit(e) {
    e.preventDefault();

    const id = document.getElementById("form-id").value || null;
    const esNuevo = !id;

    const recipeData = {
        id: id ? parseInt(id) : null,
        nombre: document.getElementById("form-name").value,
        descripcion: document.getElementById("form-description").value,
        precioEstimado: parseFloat(document.getElementById("form-price").value),
        tipoComida: document.getElementById("form-category").value.toLowerCase(),
        // Campos adicionales que tu modal podría tener
        imagenUrl: document.getElementById("form-image").value,
        tiempoPreparacion: document.getElementById("form-time").value,
        dificultad: document.getElementById("form-difficulty").value,
        ingredientes: document.getElementById("form-ingredients").value.split(",").map(i => i.trim()).filter(i => i),
        pasos: document.getElementById("form-steps").value.split("\n").map(s => s.trim()).filter(s => s)
    };

    const method = esNuevo ? 'POST' : 'PUT';
    const url = esNuevo ? '/api/recetas' : `/api/recetas/${id}`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipeData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error HTTP ${response.status}`);
        }

        await response.json();
        showToast(`Receta ${esNuevo ? 'agregada' : 'actualizada'} exitosamente`);
        closeAdminModal();
        cargarRecetas(); // Recargar todos los datos desde el backend

    } catch (error) {
        console.error(`Error al ${esNuevo ? 'guardar' : 'actualizar'}:`, error);
        showToast(error.message, 'error');
    }
}

function editRecipe(id) {
    openAdminModal(id);
}

async function deleteRecipe(id) {
    if (!confirm("¿Estás seguro de eliminar esta receta?")) {
        return;
    }

    try {
        const response = await fetch(`/api/recetas/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error('No se pudo eliminar la receta');
        showToast("Receta eliminada");
        cargarRecetas();
    } catch (error) {
        console.error("Error al eliminar:", error);
        showToast(error.message, 'error');
    }
}

function showToast(message, type = 'success') {
    const toastContainer = document.getElementById("toast-container") || createToastContainer();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;
    if (type === 'error') toast.style.backgroundColor = '#EF4444';
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
    return container;
}