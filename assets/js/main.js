import { initProfile } from './profile.js'; 
import { initGalery } from './galery.js';

// 1. Definición de rutas: Usamos el '#' como prefijo
const routes = {
    "/": "index", 
    "#/about": "pages/about.html",
    "#/profile": "pages/profile.html",
    "#/galery": "pages/galery.html",
    "404": "pages/404.html"
};

const mainContainer = document.getElementById("main-box");

/**
 * Renderiza el formulario de login
 */
const renderLogin = () => {
    mainContainer.innerHTML = `
        <div class="formBox">
            <form id="loginForm">
                <h2>Iniciar Sesión</h2>
                <input type="text" id="username" placeholder="Usuario" required>
                <input type="email" id="email" placeholder="Email" required>
                <button class="submit-btn" type="submit">Entrar</button>
            </form>
        </div>
    `;
};

/**
 * El "Router": Carga el contenido según el hash de la URL
 */
const loadPage = async () => {
    // Obtenemos el hash actual (ej: "#/about"). Si está vacío, usamos "/"
    let path = window.location.hash;
    if (!path || path === "#" || path === "#/") path = "/";

    // Buscamos la ruta en nuestro objeto. Si no existe, usamos la llave "404"
    const isRouteDefined = routes[path];
    const routeValue = isRouteDefined ? routes[path] : routes["404"];

    // CASO A: Es la raíz (Login)
    if (path === "/") {
        renderLogin();
        return;
    }

    // CASO B: Es cualquier otra ruta (Fetch de archivos HTML)
    try {
        const response = await fetch(routeValue);
        
        if (!response.ok) throw new Error("Archivo no encontrado");

        const html = await response.text();
        mainContainer.innerHTML = html;

        // --- DISPARADORES DE LÓGICA MODULAR ---
        // Usamos el 'path' para saber qué función ejecutar
        if (path === "#/profile") {
            initProfile(); 
        }

        if (path === "#/galery") {
            initGalery(); 
        }
        
    } catch (error) {
        console.error("Error cargando la página:", error);
        // Fallback: si falla el fetch, intentamos cargar el 404 manualmente
        mainContainer.innerHTML = "<h1>404</h1><p>Página no encontrada.</p>";
    }
};

/**
 * EVENTOS
 */

// 1. Capturar el envío del formulario de login
document.addEventListener("submit", (e) => {
    if (e.target.id === "loginForm") {
        e.preventDefault();

        const userData = {
            name: document.getElementById("username").value,
            email: document.getElementById("email").value,
            loginDate: new Date()
        };

        // Guardamos en sessionStorage
        sessionStorage.setItem("userSession", JSON.stringify(userData));

        // Cambiamos el hash para navegar al perfil
        window.location.hash = "#/profile";
    }
});



// 2. Escuchar cambios en el hash (cuando el usuario hace clic en enlaces o usa flechas)
window.addEventListener("hashchange", loadPage);

// 3. Carga inicial cuando se abre la web o se refresca
window.addEventListener("DOMContentLoaded", loadPage);
