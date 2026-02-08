/**
 * Lógica para la página de Galería
 */

export const initGalery = async () => {
    const selectCategory = document.querySelector(".box-sel select");
    const galeryWindow = document.querySelector(".galery-window");

    // 1. Cargar datos del simulador API
    try {
        const response = await fetch('api_simulator.json');
        const data = await response.json();
        const imagenes = data.galeria;

        // Función para renderizar las imágenes
        const renderCards = (lista) => {
            // Limpiamos la galería antes de pintar
            galeryWindow.innerHTML = "";

            lista.forEach(item => {
                const card = document.createElement("div");
                card.className = "item-card";
                card.innerHTML = `
                    <img src="${item.url}" alt="${item.nombre}" class="img-card">
                    <p class="name-card">${item.nombre}</p>
                    <p class="desc-card">${item.desc}</p>
                `;
                galeryWindow.appendChild(card);
            });
        };

        // 2. Render inicial (todas las fotos)
        renderCards(imagenes);

        // 3. Evento del filtro (Select)
        selectCategory.addEventListener("change", (e) => {
            const seleccion = e.target.value;

            // Si la opción es "first", mostramos el array original completo
            if (seleccion === "first") {
                renderCards(imagenes);
            } else {
                // Si es cualquier otra, filtramos normalmente
                const filtrados = imagenes.filter(img => img.categoria === seleccion);
                renderCards(filtrados);
            }
        });

    } catch (error) {
        console.error("Error cargando la galería:", error);
        galeryWindow.innerHTML = "<p>Error al cargar las imágenes.</p>";
    }
};