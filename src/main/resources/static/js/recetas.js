/**
 * Mock Data for Recipes
 */
let recipes = [
    {
        id: 1,
        title: "Tostadas Francesas con Frutos Rojos",
        description: "Clásicas tostadas francesas doradas, servidas con una mezcla fresca de frutos rojos y miel de maple pura.",
        image: "https://images.unsplash.com/photo-1484723091791-c08f0f04eb21?auto=format&fit=crop&q=80&w=800",
        category: "Desayuno",
        time: "15 min",
        difficulty: "Fácil",
        price: 8.50,
        ingredients: [
            "2 rebanadas de pan brioche grueso",
            "2 huevos",
            "1/2 taza de leche",
            "1 cucharadita de extracto de vainilla",
            "Canela al gusto",
            "Frutos rojos frescos (fresas, arándanos)",
            "Miel de maple"
        ],
        steps: [
            "Batir los huevos, la leche, la vainilla y la canela en un tazón profundo.",
            "Sumergir el pan brioche en la mezcla hasta que esté bien empapado.",
            "Calentar una sartén con mantequilla a fuego medio.",
            "Dorar las tostadas por ambos lados (aprox. 3 minutos por lado).",
            "Servir caliente, decorar con frutos rojos y bañar con miel de maple."
        ]
    },
    {
        id: 2,
        title: "Bowl de Salmón Teriyaki",
        description: "Salmón glaseado con salsa teriyaki casera sobre una cama de arroz de sushi, aguacate y edamames.",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
        category: "Almuerzo",
        time: "30 min",
        difficulty: "Media",
        price: 18.90,
        ingredients: [
            "200g de filete de salmón",
            "1 taza de arroz de sushi preparado",
            "1/2 aguacate rebanado",
            "1/4 taza de edamames cocidos",
            "Salsa teriyaki",
            "Semillas de sésamo"
        ],
        steps: [
            "Marinar el salmón en salsa teriyaki durante 15 minutos.",
            "Cocinar el salmón en una sartén a fuego medio-alto o al horno hasta que esté opaco.",
            "Servir el arroz en un tazón.",
            "Acomodar el salmón, el aguacate y los edamames sobre el arroz.",
            "Espolvorear con semillas de sésamo y añadir más salsa al gusto."
        ]
    },
    {
        id: 3,
        title: "Pasta Trufada con Champiñones",
        description: "Fettuccine en una rica y cremosa salsa de trufa negra con champiñones salteados y queso parmesano.",
        image: "https://images.unsplash.com/photo-1645696301019-35adcb18fc41?auto=format&fit=crop&q=80&w=800",
        category: "Cena",
        time: "25 min",
        difficulty: "Fácil",
        price: 22.00,
        ingredients: [
            "200g de pasta fettuccine",
            "150g de champiñones laminados",
            "1 diente de ajo picado",
            "1 taza de crema de leche (nata)",
            "1 cucharada de aceite o pasta de trufa",
            "Queso parmesano rallado",
            "Perejil fresco"
        ],
        steps: [
            "Hervir la pasta en agua salada según las instrucciones del paquete.",
            "Saltear los champiñones y el ajo en aceite de oliva hasta dorar.",
            "Añadir la crema de leche y el aceite/pasta de trufa, reducir a fuego lento.",
            "Incorporar la pasta escurrida a la salsa y mezclar bien.",
            "Servir con abundante queso parmesano y perejil picado."
        ]
    },
    {
        id: 4,
        title: "Cheesecake de Frambuesa",
        description: "Pastel de queso estilo Nueva York con una base crujiente y una sedosa cobertura de coulis de frambuesa.",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800",
        category: "Postres",
        time: "120 min",
        difficulty: "Difícil",
        price: 6.50,
        ingredients: [
            "Galletas graham trituradas",
            "Mantequilla derretida",
            "Queso crema tipo Philadelphia",
            "Azúcar",
            "Huevos",
            "Extracto de vainilla",
            "Frambuesas frescas para el coulis"
        ],
        steps: [
            "Mezclar las galletas con mantequilla y presionar en la base de un molde.",
            "Batir el queso crema con el azúcar, vainilla y añadir los huevos uno a uno.",
            "Verter la mezcla sobre la base y hornear a baño maría por 60 min.",
            "Dejar enfriar completamente y refrigerar.",
            "Cubrir con coulis de frambuesa antes de servir."
        ]
    },
    {
        id: 5,
        title: "Smoothie Bowl Tropical",
        description: "Refrescante batido de mango y piña servido en tazón, decorado con coco rallado, chía y fruta fresca.",
        image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&q=80&w=800",
        category: "Saludable",
        time: "10 min",
        difficulty: "Fácil",
        price: 7.90,
        ingredients: [
            "1 taza de mango congelado",
            "1/2 taza de piña congelada",
            "1/2 plátano",
            "1/2 taza de leche de coco",
            "Toppings: coco rallado, semillas de chía, granola"
        ],
        steps: [
            "Colocar la fruta congelada y la leche de coco en una licuadora potente.",
            "Licuar hasta obtener una textura espesa y cremosa.",
            "Servir inmediatamente en un tazón.",
            "Decorar artísticamente con los toppings elegidos."
        ]
    },
    {
        id: 6,
        title: "Burger Artesanal Doble",
        description: "Doble carne de res 100% Angus, queso cheddar derretido, cebolla caramelizada y salsa secreta en pan brioche.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
        category: "Comida Rápida",
        time: "20 min",
        difficulty: "Media",
        price: 14.50,
        ingredients: [
            "2 medallones de carne molida Angus (100g c/u)",
            "2 rebanadas de queso cheddar",
            "Pan brioche tostado",
            "Cebolla caramelizada",
            "Lechuga fresca y tomate",
            "Salsa especial (mayonesa, kétchup, mostaza, pepinillos picados)"
        ],
        steps: [
            "Sazonar la carne con sal y pimienta. Aplastar ligeramente en la plancha bien caliente (smash burger).",
            "Cocinar 2 minutos, voltear y colocar el queso cheddar encima.",
            "Tostar el pan brioche con un poco de mantequilla.",
            "Armar la hamburguesa: salsa, lechuga, tomate, carne con queso, cebolla caramelizada, pan.",
            "Servir inmediatamente."
        ]
    }
];

const categories = ["Todas", "Desayuno", "Almuerzo", "Cena", "Postres", "Bebidas", "Comida Rápida", "Saludable"];
let currentCategory = "Todas";
let currentSearch = "";
let currentDifficulty = "all";

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    renderCategories();
    renderRecipes();
    renderAdminTable();
    setupEventListeners();
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
        const matchSearch = r.title.toLowerCase().includes(currentSearch) || r.ingredients.some(i => i.toLowerCase().includes(currentSearch));
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

function handleAdminSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById("form-id").value;
    const title = document.getElementById("form-name").value;
    const image = document.getElementById("form-image").value;
    const category = document.getElementById("form-category").value;
    const price = parseFloat(document.getElementById("form-price").value);
    const time = document.getElementById("form-time").value;
    const difficulty = document.getElementById("form-difficulty").value;
    const description = document.getElementById("form-description").value;
    
    // Parse arrays
    const ingredients = document.getElementById("form-ingredients").value.split(",").map(i => i.trim()).filter(i => i);
    const steps = document.getElementById("form-steps").value.split("\n").map(s => s.trim()).filter(s => s);
    
    if (id) {
        // Edit existing
        const index = recipes.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            recipes[index] = { ...recipes[index], title, image, category, price, time, difficulty, description, ingredients, steps };
            showToast("Receta actualizada exitosamente");
        }
    } else {
        // Add new
        const newId = recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1;
        recipes.push({ id: newId, title, image, category, price, time, difficulty, description, ingredients, steps });
        showToast("Receta agregada exitosamente");
    }
    
    closeAdminModal();
    renderAdminTable();
    renderRecipes(); // Update home grid too
}

function editRecipe(id) {
    openAdminModal(id);
}

function deleteRecipe(id) {
    if (confirm("¿Estás seguro de que deseas eliminar esta receta?")) {
        recipes = recipes.filter(r => r.id !== id);
        renderAdminTable();
        renderRecipes();
        showToast("Receta eliminada");
    }
}

// =========================================
// UTILS
// =========================================
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");
    
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
