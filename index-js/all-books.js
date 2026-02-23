const allBooksList = document.querySelector('.all-books-list');
const btnMore = document.querySelector('.btn-more');
const btnLess = document.querySelector('.btn-less');

let visibleCount = 4; 
let showingAll = false;

function renderBooks() {
  const visibleBooks = showingAll ? books : books.slice(0, visibleCount);

  allBooksList.innerHTML = visibleBooks.map(b => `
    <div class="book-box">
      <img src="${b.image}" alt="${b.title}" class="book-pic">
      <h3 class="book-name">${b.title}</h3>
      <p class="book-writer">${b.author}</p>
      <p class="book-cost">${b.price} $ </p>
    </div>
  `).join('');
}

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

renderBooks();
