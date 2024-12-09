// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

// Verificar si se obtuvo correctamente el productId
console.log("Parámetro productId obtenido:", productId);

// Detectar la categoría a partir de la página de origen
let category = "";

// Decodificar el referrer para manejar caracteres especiales
const referrer = decodeURIComponent(document.referrer);
console.log("Referrer decodificado:", referrer); // Mostrar el referrer decodificado para depuración

// Comprobar la URL de referencia para determinar la categoría
if (referrer) {
  if (referrer.includes("niño")) {
    category = "niño";
  } else if (referrer.includes("hombre")) {
    category = "hombre";
  } else if (referrer.includes("mujer")) {
    category = "mujer";
  }
} else {
  // Asignar una categoría predeterminada si no hay referrer
  category = "general"; // Puedes cambiar esto a una categoría por defecto
  console.warn(
    "No se pudo detectar la referencia de la URL, se asignó categoría 'general'."
  );
}

// Verificar los valores de category y productId
console.log("Categoría detectada:", category);
console.log("ID del producto:", productId);

// Consumir la API con la categoría y el ID
if (category && productId) {
  console.log(
    `Haciendo fetch a: http://localhost:3000/${category}/${productId}`
  );
  fetch(`http://localhost:3000/${category}/${productId}`)
    .then((response) => {
      console.log(response); // Para inspeccionar la respuesta
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      return response.json();
    })
    .then((product) => {
      // Asegúrate de que el contenedor exista antes de intentar modificarlo
      const detailContainer = document.getElementById("product-detail");
      if (detailContainer) {
        detailContainer.innerHTML = `
          <img src="${product.img}" class="card-img-top mt-3" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.descripcion}</p>
            <p class="card-text text-success">${product.oferta}</p>
            <p class="card-text"><strong>Precio: $${product.price}</strong></p>
          </div>
        `;
      } else {
        console.error("No se encontró el contenedor con id 'product-detail'.");
      }
    })
    .catch((error) => {
      console.error(
        "Error al cargar los detalles del producto:",
        error.message
      );
    });
} else {
  console.error("Faltan parámetros: 'category' o 'productId'.");
}
