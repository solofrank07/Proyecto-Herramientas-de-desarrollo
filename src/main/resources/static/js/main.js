const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
];

const SESSION_KEY = "sabor_user";

function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw && raw !== "undefined" && raw !== "null" ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    id: user.id,
    nombre: user.nombre,
    correo: user.correo
  }));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function updateNavbar() {
  const section = document.getElementById("authSection");
  if (!section) return;
  const user = getSession();
  if (user) {
    section.innerHTML = `
      <a href="perfil.html" class="btn btn-sm btn-outline">${user.nombre}</a>
      <button onclick="handleLogout()" class="btn btn-sm btn-secondary">Salir</button>
    `;
  } else {
    section.innerHTML = `
      <a href="login.html" class="btn btn-sm btn-outline">Ingresar</a>
      <a href="register.html" class="btn btn-sm btn-primary">Registrarse</a>
    `;
  }
}

function handleLogout() {
  clearSession();
  showToast("Sesión cerrada", "info");
  window.location.href = "Index.html";
}

function initTheme() {
  const saved = localStorage.getItem("sabor_theme");
  if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  updateThemeButton();
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("sabor_theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("sabor_theme", "dark");
  }
  updateThemeButton();
}

function updateThemeButton() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  btn.textContent = isDark ? "☀️" : "🌙";
}

function showToast(message, type) {
  type = type || "success";
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("toast-out");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function formatPrice(n) {
  const num = parseFloat(n);
  return isNaN(num) ? "0.00" : num.toFixed(2);
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getFoodImage(id) {
  return FOOD_IMAGES[((id || 0) * 7) % FOOD_IMAGES.length];
}

function createSkeletons(count) {
  let html = "";
  for (let i = 0; i < (count || 6); i++) {
    html += `
      <div class="card-skeleton">
        <div class="card-skeleton-img"></div>
        <div class="card-skeleton-body">
          <div class="card-skeleton-title skeleton"></div>
          <div class="card-skeleton-text skeleton"></div>
          <div class="card-skeleton-text skeleton"></div>
        </div>
      </div>
    `;
  }
  return html;
}

function renderRecipeCard(recipe, index) {
  return `
    <div class="recipe-card" onclick="openDetail(${recipe.id})">
      <img class="recipe-card-image" src="${getFoodImage(index)}" alt="${recipe.nombre}" loading="lazy">
      <div class="recipe-card-body">
        <div class="recipe-card-meta">
          <span class="recipe-card-type">${recipe.tipoComida || "General"}</span>
          <span class="recipe-card-price">S/ ${formatPrice(recipe.precioEstimado)}</span>
        </div>
        <h3 class="recipe-card-title">${recipe.nombre}</h3>
        <p class="recipe-card-desc">${recipe.descripcion || "Sin descripción"}</p>
      </div>
    </div>
  `;
}

function openDetail(id) {
  const recipe = typeof window.recetasCache !== "undefined"
    ? window.recetasCache.find(r => r.id === id)
    : null;
  if (!recipe) return;
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay active";
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  overlay.innerHTML = `
    <div class="modal recipe-detail-modal">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
      <div class="recipe-detail-grid">
        <img class="detail-image" src="${getFoodImage(recipe.id || 0)}" alt="${recipe.nombre}">
        <div class="detail-content">
          <span class="detail-type">${recipe.tipoComida || "General"}</span>
          <h2 class="detail-title">${recipe.nombre}</h2>
          <p class="detail-desc">${recipe.descripcion || "Sin descripción disponible"}</p>
          <div class="detail-price">S/ ${formatPrice(recipe.precioEstimado)}</div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function apiFetch(url, options) {
  options = options || {};
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  }).then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });
}

function initHamburger() {
  const btn = document.getElementById("hamburger");
  const nav = document.getElementById("navLinks");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!btn.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove("open");
      }
    });
  }
}

function initIndex() {
  const loader = document.getElementById("loader");
  const resultados = document.getElementById("resultados");
  const btnBuscar = document.getElementById("btnBuscar");
  const btnSorprendeme = document.getElementById("btnSorprendeme");

  function renderRecetas(lista) {
    if (!lista || lista.length === 0) {
      resultados.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🍽️</div>
          <h3 class="empty-state-title">No encontramos recetas</h3>
          <p class="empty-state-text">Intenta con otros ingredientes o presupuesto</p>
        </div>
      `;
      return;
    }
    resultados.innerHTML = lista.map((r, i) => renderRecipeCard(r, r.id || i)).join("");
    window.recetasCache = lista;
  }

  function mostrarSkeletons() {
    resultados.innerHTML = createSkeletons(6);
  }

  function buscar() {
    const nombre = document.getElementById("inputBusqueda").value.trim();
    const presupuesto = document.getElementById("inputPresupuesto").value || "0";
    const momento = document.getElementById("inputMomento").value;
    mostrarSkeletons();
    apiFetch("/api/recomendar", {
      method: "POST",
      body: JSON.stringify({ nombre, presupuesto, momento })
    }).then(data => {
      renderRecetas(data);
    }).catch(() => {
      resultados.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <h3 class="empty-state-title">Error de conexión</h3>
          <p class="empty-state-text">No se pudo conectar con el servidor</p>
        </div>
      `;
    });
  }

  function sorprendeme() {
    mostrarSkeletons();
    apiFetch("/api/recomendar", {
      method: "POST",
      body: JSON.stringify({ nombre: "", presupuesto: "0", momento: "" })
    }).then(data => {
      if (data.length === 0) {
        renderRecetas([]);
        return;
      }
      const random = data[Math.floor(Math.random() * data.length)];
      renderRecetas([random]);
    }).catch(() => {
      resultados.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <h3 class="empty-state-title">Error de conexión</h3>
          <p class="empty-state-text">No se pudo conectar con el servidor</p>
        </div>
      `;
    });
  }

  function mostrarAleatorios() {
    mostrarSkeletons();
    apiFetch("/api/recomendar", {
      method: "POST",
      body: JSON.stringify({ nombre: "", presupuesto: "0", momento: "" })
    }).then(data => {
      if (data.length === 0) {
        renderRecetas([]);
        return;
      }
      const shuffled = data.sort(() => 0.5 - Math.random());
      renderRecetas(shuffled.slice(0, 3));
    }).catch(() => {
      resultados.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <h3 class="empty-state-title">Error de conexión</h3>
          <p class="empty-state-text">No se pudo cargar el servidor</p>
        </div>
      `;
    });
  }

  if (btnBuscar) btnBuscar.addEventListener("click", buscar);
  if (btnSorprendeme) btnSorprendeme.addEventListener("click", sorprendeme);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && document.activeElement && ["inputBusqueda", "inputPresupuesto", "inputMomento"].includes(document.activeElement.id)) {
      buscar();
    }
  });

  mostrarAleatorios();
}

function initLogin() {
  const form = document.getElementById("loginForm");
  const errorEl = document.getElementById("loginError");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const correo = document.getElementById("loginCorreo").value.trim();
    const password = document.getElementById("loginPass").value;
    if (!correo || !password) {
      errorEl.style.display = "block";
      errorEl.textContent = "Completa todos los campos";
      return;
    }
    errorEl.style.display = "none";
    apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ correo, password })
    }).then(data => {
      if (!data.success) {
        errorEl.style.display = "block";
        errorEl.textContent = data.message || "Credenciales incorrectas";
        return;
      }
      setSession(data.data);
      showToast("Inicio de sesión exitoso", "success");
      setTimeout(() => { window.location.href = "Index.html"; }, 500);
    }).catch(() => {
      errorEl.style.display = "block";
      errorEl.textContent = "Error al conectar con el servidor";
    });
  });
}

function initRegister() {
  const form = document.getElementById("registerForm");
  const errorEl = document.getElementById("registerError");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("regNombre").value.trim();
    const correo = document.getElementById("regCorreo").value.trim();
    const contrasena = document.getElementById("regPass").value;
    if (!nombre || !correo || !contrasena) {
      errorEl.style.display = "block";
      errorEl.className = "auth-error";
      errorEl.textContent = "Completa todos los campos";
      return;
    }
    errorEl.style.display = "none";
    apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ nombre, correo, contrasena })
    }).then(data => {
      if (!data.success) {
        errorEl.style.display = "block";
        errorEl.className = "auth-error";
        errorEl.textContent = data.message || "Error al registrarse";
        return;
      }
      errorEl.style.display = "block";
      errorEl.className = "auth-success";
      errorEl.textContent = "Registro exitoso. Redirigiendo...";
      setTimeout(() => { window.location.href = "login.html"; }, 1200);
    }).catch(() => {
      errorEl.style.display = "block";
      errorEl.className = "auth-error";
      errorEl.textContent = "Error al conectar con el servidor";
    });
  });
}

function initRecetas() {
  let recetas = [];
  const grid = document.getElementById("recipesGrid");
  const adminBody = document.getElementById("adminBody");
  const searchInput = document.getElementById("recetasSearch");
  const categPills = document.getElementById("categPills");

  let currentCateg = "Todas";
  const CATEGORIES = ["Todas", "Desayuno", "Almuerzo", "Cena", "Postres", "Bebidas", "Comida Rápida", "Saludable"];

  function renderCategPills() {
    if (!categPills) return;
    categPills.innerHTML = CATEGORIES.map(c =>
      `<button class="pill ${c === currentCateg ? 'active' : ''}" data-cat="${c}">${c}</button>`
    ).join("");
    categPills.querySelectorAll(".pill").forEach(btn => {
      btn.addEventListener("click", () => {
        currentCateg = btn.dataset.cat;
        renderCategPills();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    if (!grid) return;
    const search = (searchInput ? searchInput.value : "").toLowerCase();
    const filtradas = recetas.filter(r => {
      const tipo = (r.tipoComida || "").toLowerCase();
      const nombre = (r.nombre || "").toLowerCase();
      const matchCateg = currentCateg === "Todas" || tipo === currentCateg.toLowerCase();
      const matchSearch = !search || nombre.includes(search) || (r.descripcion || "").toLowerCase().includes(search);
      return matchCateg && matchSearch;
    });
    if (filtradas.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <h3 class="empty-state-title">No hay recetas</h3>
          <p class="empty-state-text">Intenta con otros filtros</p>
        </div>
      `;
      return;
    }
    grid.innerHTML = filtradas.map((r, i) => renderRecipeCard(r, r.id || i)).join("");
    window.recetasCache = recetas;
  }

  function renderAdmin() {
    if (!adminBody) return;
    if (recetas.length === 0) {
      adminBody.innerHTML = `
        <tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-muted)">No hay recetas registradas</td></tr>
      `;
      return;
    }
    adminBody.innerHTML = recetas.map(r => `
      <tr>
        <td>
          <div class="td-recipe">
            <img class="td-recipe-img" src="${getFoodImage(r.id || 0)}" alt="${r.nombre}">
            <span>${r.nombre}</span>
          </div>
        </td>
        <td>${capitalize(r.tipoComida || "")}</td>
        <td>S/ ${formatPrice(r.precioEstimado)}</td>
        <td>
          <div class="td-actions">
            <button class="btn-icon btn-icon-edit" onclick="editReceta(${r.id})" title="Editar">✏️</button>
            <button class="btn-icon btn-icon-delete" onclick="deleteReceta(${r.id})" title="Eliminar">🗑️</button>
          </div>
        </td>
      </tr>
    `).join("");
  }

  function cargar() {
    if (grid) grid.innerHTML = createSkeletons(6);
    apiFetch("/api/recetas").then(data => {
      recetas = data;
      if (grid) renderGrid();
      if (adminBody) renderAdmin();
    }).catch(() => {
      if (grid) {
        grid.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">⚠️</div>
            <h3 class="empty-state-title">Error al cargar</h3>
            <p class="empty-state-text">No se pudo conectar con el servidor</p>
          </div>
        `;
      }
    });
  }

  renderCategPills();
  if (searchInput) {
    searchInput.addEventListener("input", renderGrid);
  }

  window.editReceta = function(id) {
    const r = recetas.find(x => x.id === id);
    if (!r) return;
    document.getElementById("formId").value = r.id;
    document.getElementById("formName").value = r.nombre;
    document.getElementById("formDesc").value = r.descripcion || "";
    document.getElementById("formPrice").value = r.precioEstimado || "";
    document.getElementById("formType").value = r.tipoComida || "";
    document.getElementById("modalTitle").textContent = "Editar Receta";
    document.getElementById("adminModal").classList.add("active");
  };

  window.deleteReceta = function(id) {
    if (!confirm("¿Eliminar esta receta?")) return;
    apiFetch(`/api/recetas/${id}`, { method: "DELETE" }).then(() => {
      showToast("Receta eliminada", "success");
      cargar();
    }).catch(() => showToast("Error al eliminar", "error"));
  };

  window.openAdminModal = function(id) {
    if (id) {
      window.editReceta(id);
      return;
    }
    document.getElementById("adminForm").reset();
    document.getElementById("formId").value = "";
    document.getElementById("modalTitle").textContent = "Nueva Receta";
    document.getElementById("adminModal").classList.add("active");
  };

  window.closeAdminModal = function() {
    document.getElementById("adminModal").classList.remove("active");
  };

  const adminForm = document.getElementById("adminForm");
  if (adminForm) {
    adminForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("formId").value;
      const nombre = document.getElementById("formName").value.trim();
      const descripcion = document.getElementById("formDesc").value.trim();
      const precioEstimado = parseFloat(document.getElementById("formPrice").value);
      const tipoComida = document.getElementById("formType").value;
      if (!nombre || !precioEstimado || !tipoComida) {
        showToast("Completa los campos obligatorios", "error");
        return;
      }
      const body = { nombre, descripcion, precioEstimado, tipoComida };
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/recetas/${id}` : "/api/recetas";
      apiFetch(url, { method, body: JSON.stringify(body) }).then(() => {
        showToast(id ? "Receta actualizada" : "Receta creada", "success");
        window.closeAdminModal();
        cargar();
      }).catch(() => showToast("Error al guardar", "error"));
    });
  }

  const adminModal = document.getElementById("adminModal");
  if (adminModal) {
    adminModal.addEventListener("click", (e) => {
      if (e.target === adminModal) window.closeAdminModal();
    });
  }

  cargar();
}

function initPerfil() {
  const user = getSession();
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  const avatarEl = document.getElementById("perfilAvatar");
  const nombreEl = document.getElementById("perfilNombre");
  const emailEl = document.getElementById("perfilEmail");
  const inputNombre = document.getElementById("perfilInputNombre");
  const inputCorreo = document.getElementById("perfilInputCorreo");
  const formPerfil = document.getElementById("formPerfil");
  const formPass = document.getElementById("formPass");

  function cargarPerfil() {
    apiFetch(`/api/usuarios/perfil/${user.id}`).then(data => {
      if (!data.success) {
        showToast("Error al cargar perfil", "error");
        return;
      }
      const u = data.data;
      if (avatarEl) avatarEl.textContent = (u.nombre || "U").charAt(0).toUpperCase();
      if (nombreEl) nombreEl.textContent = u.nombre;
      if (emailEl) emailEl.textContent = u.correo;
      if (inputNombre) inputNombre.value = u.nombre;
      if (inputCorreo) inputCorreo.value = u.correo;
    }).catch(() => showToast("Error al cargar perfil", "error"));
  }

  if (formPerfil) {
    formPerfil.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = inputNombre.value.trim();
      const correo = inputCorreo.value.trim();
      if (!nombre || !correo) {
        showToast("Completa todos los campos", "error");
        return;
      }
      apiFetch(`/api/usuarios/perfil/${user.id}`, {
        method: "PUT",
        body: JSON.stringify({ nombre, correo })
      }).then(data => {
        if (!data.success) throw new Error(data.message);
        setSession({ id: user.id, nombre, correo });
        showToast("Perfil actualizado", "success");
        cargarPerfil();
        updateNavbar();
      }).catch(() => showToast("Error al actualizar perfil", "error"));
    });
  }

  if (formPass) {
    formPass.addEventListener("submit", (e) => {
      e.preventDefault();
      const actual = document.getElementById("passActual").value;
      const nueva = document.getElementById("passNueva").value;
      if (!actual || !nueva) {
        showToast("Completa todos los campos", "error");
        return;
      }
      if (nueva.length < 5) {
        showToast("La contraseña debe tener mínimo 5 caracteres", "error");
        return;
      }
      apiFetch(`/api/usuarios/password/${user.id}`, {
        method: "PUT",
        body: JSON.stringify({ passwordActual: actual, passwordNueva: nueva })
      }).then(data => {
        if (!data.success) throw new Error(data.message);
        showToast("Contraseña actualizada", "success");
        formPass.reset();
      }).catch(() => showToast("Error al actualizar contraseña", "error"));
    });
  }

  cargarPerfil();
}

function initFavoritos() {
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  updateNavbar();
  initHamburger();

  const page = document.body.dataset.page;
  if (page === "index") initIndex();
  else if (page === "login") initLogin();
  else if (page === "register") initRegister();
  else if (page === "recetas") initRecetas();
  else if (page === "perfil") initPerfil();
  else if (page === "favoritos") initFavoritos();
});
