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
          <div class="row justify-content-center ">
          <div class="col-sm-6 mb">
          <img src="${product.img}" class="card-img-top mt-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded-3" alt="${product.name}">
          </div>
          <div class="col-sm-6 bg-light_brown align-self-center h-75 p-5 align-content-center shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <h5 class="card-title fs-1 text-Oswald fw-bold mb-3">${product.name}</h5>
            <p class="card-text mb-5 fs-5">${product.descripcion}</p>
            <p class="card-text fw-bold fs-5"><strong>Precio: $${product.price}</strong></p>
            <p class="card-text text-success"><strong>Oferta: ${product.oferta}</strong></p>
            <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-black w-75 mt-5 p-2  text-Oswald fs-5">AGREGAR AL CARRITO</button>
            </div>
          </div>
          <div/>
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
