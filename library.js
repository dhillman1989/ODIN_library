let myLibrary = JSON.parse(localStorage.getItem("library")) || [
  { title: "Example Book", author: "A. Writer", pages: 9999, read: true },
];

///BOOK CONSTRUCTOR
function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

///ADD BOOK TO LIBRARY
function addBookToLibrary(title, author, pages, read) {
  myLibrary.push({ title, author, pages, read });
}

///SHOW BOOKS
function showBooks() {
  const bookList = myLibrary
    .map(
      (b, i) =>
        `<div class="book ${b.read ? "book--read" : ""}">
        
      <span class="book__title">${b.title}</span> 
      <span class="book__author">${b.author}
        </span>
        <span class="book__pages">
        ${b.pages} pages
        </span>
          <div>
        <label class="book__read-label" for="read">I've read this</label><input id="read" type="checkbox" ${
          b.read && "checked"
        } onclick={toggleRead(${i})}> </div>
        <button class="book__deleteButton" onclick={deleteBook(${i})}>Delete</button>
        
    </div>`
    )
    .join("<br>");

  document.querySelector("#books").innerHTML = bookList;
}

///delete()
function deleteBook(index) {
  let newLibrary = myLibrary.filter((book, i) => i !== index);
  myLibrary = [...newLibrary];
  localStorage.setItem("library", JSON.stringify(myLibrary));
  showBooks();
}

function toggleRead(i) {
  myLibrary[i].read = !myLibrary[i].read;
  localStorage.setItem("library", JSON.stringify(myLibrary));
  showBooks();
}

function submitNewBook() {
  let title = prompt("Please provide a book title:");
  let author = prompt("Please provide an Author:");
  let pages = prompt("How many pages?");
  let read = prompt("Has this book been read?") == "true" ? true : false;
  if ([title, author, pages].some((item) => item === null || item === "")) {
    alert("Sorry, you must provide all details.");
  } else {
    addBookToLibrary(title, author, pages, read);
    localStorage.setItem("library", JSON.stringify(myLibrary));
    showBooks();
  }
}

///event listener for NEW BOOK button
document
  .querySelector("#addNewBook")
  .addEventListener("click", () => submitNewBook());

showBooks();
