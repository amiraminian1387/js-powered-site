// Elements
const searchInput  = document.querySelector('.search-bar');
const resultBox    = document.querySelector('.search-results');
const allBooksList = document.querySelector('.all-books-list');
const btnMore      = document.querySelector('.btn-more');
const btnLess      = document.querySelector('.btn-less');

// State
let books = [];
let visibleCount = 4;
let showingAll   = false;

// Fetch books from API
fetch("https://6995f89db081bc23e9c5017a.mockapi.io/BOOK-STORE/BOOKNEST")
  .then(res => res.json())
  .then(data => {
    books = data;
    renderBooks(); // render after data arrives
  });

// Render ALL BOOKS section
function renderBooks() {
  const visibleBooks = showingAll ? books : books.slice(0, visibleCount);

  allBooksList.innerHTML = visibleBooks.map(b => `
    <div class="book-box" id="book-${b.id}">
      <img src="${b.image}" alt="${b.title}" class="book-pic">
      <h3 class="book-name">${b.title}</h3>
      <p class="book-writer">${b.author}</p>
      <p class="book-cost">${b.price} $</p>
    </div>
  `).join('');
}

// See More / See Less
btnMore.addEventListener('click', () => {
  showingAll = true;
  renderBooks();
  btnMore.style.display = "none";
  btnLess.style.display = "inline-block";
});

btnLess.addEventListener('click', () => {
  showingAll = false;
  renderBooks();
  btnLess.style.display = "none";
  btnMore.style.display = "inline-block";
});

// Search in English
searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();

  const filtered = books.filter(b =>
    (b.title  && b.title.toLowerCase().includes(q)) ||
    (b.author && b.author.toLowerCase().includes(q))
  );

  if (q === "") {
    resultBox.innerHTML = "";
    return;
  }

  if (filtered.length === 0) {
    resultBox.innerHTML = "No book found";
    return;
  }

  resultBox.innerHTML = filtered.map(b => `
    <div class="search-item" data-id="${b.id}">
      ${b.title} — ${b.author}
    </div>
  `).join('');
});

// Click on search result → scroll to card + highlight
resultBox.addEventListener('click', e => {
  if (!e.target.classList.contains('search-item')) return;

  const id = e.target.dataset.id;

  // اگر همه کتاب‌ها دیده نمی‌شن، اول همه رو نشون بده
  if (!showingAll) {
    showingAll = true;
    renderBooks();
    btnMore.style.display = "none";
    btnLess.style.display = "inline-block";
  }

  const targetCard = document.getElementById(`book-${id}`);
  if (targetCard) {
    targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
    targetCard.classList.add("highlight");
    setTimeout(() => targetCard.classList.remove("highlight"), 1500);
  }
});
