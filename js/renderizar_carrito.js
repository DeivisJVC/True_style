// Función para mostrar productos en la tabla del carrito (en cualquier página)
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Si hay productos en el carrito, se generan las filas en la tabla
  cartItemsContainer.innerHTML = cart.length
    ? cart
        .map(
          (item) => `
      <tr>
        <td><img src="${item.img}" alt="${item.name}" width="50"></td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>${item.quantity}</td>
      </tr>
    `
        )
        .join(" ")
    : `<tr><td colspan="4">El carrito está vacío</td></tr>`;

  // También podemos mostrar la cantidad total de productos en el carrito
  const cartCount = document.getElementById("cart-count");
  cartCount.innerText = cart.length;
}

// Vaciar carrito
document.getElementById("vaciar_carrito").addEventListener("click", () => {
  localStorage.removeItem("cart");
  renderCartItems(); // Actualiza la tabla después de vaciar
});

// Ejecutar la función al cargar la página
document.addEventListener("DOMContentLoaded", renderCartItems);
