// Contenedor donde se agregarán las tarjetas
const container = document.getElementById("product-container3");

// Consumir la API con fetch
fetch("http://localhost:3000/niño")
  .then((response) => response.json())
  .then((products) => {
    // Limpiar el contenedor
    container.innerHTML = "";

    // Recorrer los productos y generar tarjetas
    products.forEach((product) => {
      // Crear una columna para cada tarjeta
      const card = document.createElement("div");
      card.classList.add("card", "col-md-4", "border-0", "mb-4"); // Añadimos "border-0" aquí para quitar los bordes.

      // Agregar contenido dinámico a la tarjeta
      card.innerHTML = `
        <img src="${product.img}" class="mt-5"  alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.descripcion}</p>
          <p class="card-text text-success">${product.oferta}</p>
          <p class="card-text"><strong>Precio: $${product.price}</strong></p>
        </div>
      `;

      // Agregar la tarjeta al contenedor
      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error al consumir la API:", error);
  });
