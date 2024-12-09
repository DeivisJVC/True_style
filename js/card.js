// Contenedor donde se agregarán las tarjetas
const container = document.getElementById("product-container");

// Consumir la API con fetch
fetch("http://localhost:3000/mujer")
  .then((response) => response.json())
  .then((products) => {
    container.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("col-12", "col-sm-6", "col-md-4", "mb-4");

      card.innerHTML = `
        <div class="card border-0" data-product-id="${product.id}" data-category="hombre">
            <img src="${product.img}" class="img-fluid mt-5" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.descripcion}</p>
                <p class="card-text text-success">${product.oferta}</p>
                <p class="card-text"><strong>Precio: $${product.price}</strong></p>
                <button class="btn btn-outline-black" onclick="addToCart(${product.id})">Agregar al Carrito</button>
            </div>
        </div>
      `;

      card.addEventListener("click", (e) => {
        if (!e.target.closest("button")) {
          const category = "mujer"; // Cambiar según la categoría
          window.location.href = `detalle.html?category=${category}&productId=${product.id}`;
        }
      });

      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error al consumir la API:", error);
    container.innerHTML =
      "<p>Hubo un error al cargar los productos. Por favor, inténtalo de nuevo más tarde.</p>";
  });

function addToCart(productId) {
  console.log("Producto agregado al carrito: " + productId);
}
