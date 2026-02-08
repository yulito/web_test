
export function initProfile() {
    console.log("Cargando datos desde LocalStorage...");

    // 1. Obtenemos el string y lo convertimos de vuelta a objeto
    const sessionData = sessionStorage.getItem('userSession');
    
    const profileContainer = document.getElementById("profile-content");

    if (sessionData) {
        const user = JSON.parse(sessionData);
        
        // 2. Inyectamos los datos en el HTML que se acaba de cargar
        profileContainer.innerHTML = `
            <div class="user-card">
                <p><strong>Usuario:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><small>Sesión iniciada el: ${user.loginDate}</small></p>
                <button id="logoutBtn">Cerrar Sesión</button>
            </div>
        `;

        // Lógica para borrar sesión
        document.getElementById('logoutBtn').addEventListener('click', () => {
            sessionStorage.removeItem('userSession');
            location.href = '#/'; // O navigateTo('/')
        });

    } else {
        // Si alguien intenta entrar a /profile sin loguearse
        profileContainer.innerHTML = "<p>No hay sesión activa. Por favor, identifícate.</p>";
    }
}
