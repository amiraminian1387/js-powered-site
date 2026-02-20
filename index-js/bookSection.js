const API_URL = "https://6995f89db081bc23e9c5017a.mockapi.io/BOOK-STORE/BOOKNEST";

async function loadSections() {

  // اول اسکلتن‌ها
  showSkeletons("bestsellers");
  showSkeletons("new-books");
  showSkeletons("discount-books");

  // گرفتن دیتا
  const res = await fetch(API_URL);
  const books = await res.json();

  /* -------------------------
     پرفروش‌ها
  ------------------------- */
  const bestsellers = books.filter(b => b.rating >= 4.8);
  renderSection("bestsellers", bestsellers);

  /* -------------------------
     جدیدترین‌ها
  ------------------------- */
  const newest = [...books]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);
  renderSection("new-books", newest);

  /* -------------------------
     تخفیف‌دار (رندوم)
  ------------------------- */
  const discount = [...books]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
  renderDiscountSection("discount-books", discount);
}

/* -------------------------
   اسکلتن
------------------------- */
function showSkeletons(id, count = 6) {
  const container = document.getElementById(id);
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const sk = document.createElement("div");
    sk.className = "skeleton-card";
    container.appendChild(sk);
  }
}

/* -------------------------
   رندر کارت معمولی
------------------------- */
function renderSection(id, list) {
  const container = document.getElementById(id);
  container.innerHTML = "";
  list.forEach(book => container.appendChild(createCard(book)));
}

/* -------------------------
   رندر کارت تخفیف‌دار
------------------------- */
function renderDiscountSection(id, list) {
  const container = document.getElementById(id);
  container.innerHTML = "";
  list.forEach(book => container.appendChild(createDiscountCard(book)));
}

/* -------------------------
   کارت معمولی
------------------------- */
function createCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";
  card.innerHTML = `
    <img src="${book.image}" class="book-img" />
    <h3 class="book-title">${book.title}</h3>
    <p class="book-author">${book.author}</p>
    <p class="book-price">$${book.price}</p>
    <button class="add-to-cart">افزودن به سبد خرید</button>
  `;
  return card;
}

/* -------------------------
   کارت تخفیف‌دار
------------------------- */
function createDiscountCard(book) {
  const card = document.createElement("div");
  card.className = "book-card discount-card";
  card.innerHTML = `
    <div class="discount-badge">30% OFF</div>
    <img src="${book.image}" class="book-img" />
    <h3 class="book-title">${book.title}</h3>
    <p class="book-author">${book.author}</p>
    <p class="book-price">
      <span class="old-price">$${book.price}</span>
      <span class="new-price">$${(book.price * 0.7).toFixed(2)}</span>
    </p>
    <button class="add-to-cart">افزودن به سبد خرید</button>
  `;
  return card;
}

/* -------------------------
   دکمه سبد خرید
------------------------- */
document.addEventListener("click", e => {
  if (e.target.classList.contains("add-to-cart")) {
    const title = e.target.parentElement.querySelector(".book-title").textContent;
    alert(`کتاب "${title}" به سبد خرید اضافه شد!`);
  }
});

/* -------------------------
   اجرا
------------------------- */
document.addEventListener("DOMContentLoaded", loadSections);
