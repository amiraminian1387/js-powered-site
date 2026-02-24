
const cartContainer = document.querySelector(".cart-items");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    // اطمینان از نوع‌ها
    item.id = String(item.id);
    item.qty = Number(item.qty) || 1;
    item.price = Number(item.price) || 0;

    subtotal += item.price * item.qty;

    cartContainer.innerHTML += `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" class="cart-img" />
        <div class="cart-info">
          <h3 class="cart-name">${item.title}</h3>
          <p class="cart-author">${item.author}</p>
          <p class="cart-price">$${item.price}</p>
        </div>

        <div class="cart-qty">
          <button class="qty-btn" data-id="${item.id}" data-action="minus">−</button>
          <span class="qty-number">${item.qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-action="plus">+</button>
        </div>

        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;
  });

  subtotalEl.textContent = subtotal.toFixed(2);
  totalEl.textContent = subtotal.toFixed(2);
}


loadCart();

document.addEventListener("click", e => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (e.target.classList.contains("qty-btn")) {
    const id = e.target.dataset.id;
    const action = e.target.dataset.action;
    const item = cart.find(i => i.id === id);

    if (action === "plus") item.qty++;
    if (action === "minus" && item.qty > 1) item.qty--;

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }

  if (e.target.classList.contains("remove-btn")) {
    const id = e.target.dataset.id;
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
});
