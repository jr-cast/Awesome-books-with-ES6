// Import BooksRack class
import BooksRack from './modules/BookRackClass.js';

// Import Book class
import Book from './modules/bookClass.js';

// Import DisplayElements Function
import displayElements from './modules/displayElements.js';

// Import anchors functions
import { checkListFunc, addNewFunc, contactFunc } from './modules/anchorFunctions.js';

// Import luxon
import { DateTime } from './modules/luxon.js';

// Populate local storage collection with user entries
const storedBooks = new BooksRack();
storedBooks.UpdateRack();
const addBtn = document.getElementById('addBtn');
const bookTitle = document.getElementById('title');
const author = document.getElementById('author');
let stringData = JSON.stringify(storedBooks.Books);
let book;
addBtn.addEventListener('click', () => {
  if (!bookTitle.value || !author.value) {
    alert('Enter both book title and author please');
    // Display localStorage Books Collection entries
  } else {
    book = new Book(bookTitle.value, author.value);
    storedBooks.Books.push(book);
    bookTitle.value = '';
    author.value = '';
    stringData = JSON.stringify(storedBooks.Books);
    localStorage.setItem('Books', stringData);
    window.location.reload();
  }
});

// Display localStorage Books Collection entries
displayElements();

// Remove books from collection and display
for (let i = 0; i < document.getElementsByClassName('rmv').length; i += 1) {
  const rmvButton = document.getElementById(`btn${i}`);
  const titleName = storedBooks.Books[i].title;
  const list = document.getElementById(`${i}`);
  rmvButton.addEventListener('click', () => {
    const filtered = storedBooks.Books.filter((Books) => Books.title !== titleName);
    const stringData = JSON.stringify(filtered);
    localStorage.setItem('Books', stringData);
    list.remove();
    storedBooks.UpdateRack();
  });
}

// Anchors in Nav added functionality
document.getElementById('list').addEventListener('click', checkListFunc);
document.getElementById('new').addEventListener('click', addNewFunc);
document.getElementById('cont').addEventListener('click', contactFunc);

// Date with interval refresh rate
const date = () => {
  document.getElementById('date').innerHTML = DateTime.now();
};

setInterval(date, 1000);
