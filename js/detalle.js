// Obtener parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

// Detectar categoría a partir del referrer
let category = "";
const referrer = decodeURIComponent(document.referrer);

if (referrer.includes("niño")) {
  category = "niño";
} else if (referrer.includes("hombre")) {
  category = "hombre";
} else if (referrer.includes("mujer")) {
  category = "mujer";
} else {
  category = "general";
}

// Consumir API y mostrar producto
if (category && productId) {
  fetch(`http://localhost:3000/${category}/${productId}`)
    .then((response) => {
      if (!response.ok) throw new Error("Error en la respuesta de la API");
      return response.json();
    })
    .then((product) => {
      const detailContainer = document.getElementById("product-detail");
      detailContainer.innerHTML = `     
      
      
  <div class="container-fluid row p-3">
    <div class="col-12 col-md-6">
        <img src="${product.img}" class="card-img-top mt-3 shadow-lg p-3 mb-5 rounded-3 img-fluid" alt="${product.name}">
    </div>
    <div class="col-12 col-md-6 bg-light_brown align-self-center p-4 p-md-5 shadow-lg rounded-5">
        <h5 class="card-title fs-3 fs-md-1 text-Oswald fw-bold mb-3">${product.name}</h5>
        <p class="card-text mb-5 fs-5">${product.descripcion}</p>
        <p class="card-text fw-bold fs-5"><strong>Precio: $${product.price}</strong></p>
        <p class="card-text text-success"><strong>Oferta: ${product.oferta}</strong></p>
        <button class="btn btn-black w-100 w-md-75 text-Oswald fs-5" id="add-to-cart-${product.id}">AGREGAR AL CARRITO</button>
    </div>
</div>



`;
      // Asociar evento al botón de agregar al carrito
      document
        .getElementById(`add-to-cart-${product.id}`)
        .addEventListener("click", () => addToCart(product));
    })
    .catch((error) =>
      console.error("Error al cargar los detalles del producto:", error.message)
    );
}

function addToCart(product) {
  // Obtener carrito del localStorage o inicializarlo como un arreglo vacío si no existe
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Verificar si el producto ya existe en el carrito
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    // Si el producto ya está en el carrito, solo aumentamos la cantidad
    existingProduct.quantity += 1;
  } else {
    // Si el producto no está en el carrito, lo agregamos con cantidad 1
    product.quantity = 1;
    cart.push(product);
  }

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Producto agregado al carrito");
  renderCartItems(); // Actualiza la vista del carrito
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Verificar si hay productos en el carrito
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<tr><td colspan="4">El carrito está vacío</td></tr>`;
    return;
  }

  // Renderizar los productos del carrito
  cartItemsContainer.innerHTML = cart
    .map((item) => {
      return `
        <tr>
          <td><img src="${item.img}" alt="${item.name}" width="50"></td>
          <td>${item.name}</td>
          <td>$${item.price}</td>
          <td>${item.quantity}</td>
        </tr>
      `;
    })
    .join("");
  const cartCount = document.getElementById("cart-count");
  cartCount.innerText = cart.length;
}

// Función para vaciar el carrito
document.getElementById("vaciar_carrito").addEventListener("click", () => {
  localStorage.removeItem("cart");
  renderCartItems(); // Actualiza la vista del carrito
});

// Mostrar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", renderCartItems);
