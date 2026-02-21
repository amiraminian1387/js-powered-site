// Getting the list of books from API and searching in English
const searchInput = document.querySelector('.search-bar');
const resultBox = document.querySelector('.search-results');
let books = [];

// Fetching data from API
fetch("https://6995f89db081bc23e9c5017a.mockapi.io/BOOK-STORE/BOOKNEST")
  .then(res => res.json())
  .then(data => {
    books = data;
  });

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  const filtered = books.filter(b =>
    (b.title && b.title.toLowerCase().includes(q)) ||
    (b.author && b.author.toLowerCase().includes(q))
  );
  resultBox.innerHTML = q === ""
    ? ""
    : filtered.length === 0
      ? "No book found"
      : filtered.map(b => `<div>${b.title} — ${b.author}</div>`).join('');
});
