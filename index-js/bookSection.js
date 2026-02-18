const API_URL = "https://6995f89db081bc23e9c5017a.mockapi.io/BOOK-STORE/BOOKNEST";

async function loadSections() {
  const res = await fetch(API_URL);
  const books = await res.json();

  // سکشن پرفروش‌ها
  const bestContainer = document.getElementById("bestsellers");
  bestContainer.innerHTML = "";
  const bestsellers = books.filter(book => book.rating >= 4.8);
  bestsellers.forEach(book => {
    bestContainer.appendChild(createCard(book));
  });

  // سکشن جدیدترین‌ها
  const newContainer = document.getElementById("new-books");
  newContainer.innerHTML = "";
  const newest = books.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
  newest.forEach(book => {
    newContainer.appendChild(createCard(book));
  });
}

// تابع ساخت کارت
function createCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";
  card.innerHTML = `
    <img src="${book.image}" alt="${book.title}" class="book-img" />
    <h3 class="book-title">${book.title}</h3>
    <p class="book-author">${book.author}</p>
    <p class="book-price">$${book.price}</p>
    <button class="add-to-cart">افزودن به سبد خرید</button>
  `;
  return card;
}

// رویداد کلیک روی دکمه‌ها
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const bookTitle = e.target.parentElement.querySelector(".book-title").textContent;
    alert(`کتاب "${bookTitle}" به سبد خرید اضافه شد!`);
  }
});

document.addEventListener("DOMContentLoaded", loadSections);
