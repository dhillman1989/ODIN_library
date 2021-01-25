let myLibrary = JSON.parse(localStorage.getItem("library")) || [];

///BOOK CONSTRUCTOR
function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.getInfo = function () {
    return { title, author, pages, read };
  };
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
        `<div>
        <input type="checkbox" ${
          b.read && "checked"
        } onclick={toggleRead(${i})}> 
      ${b.title}, ${b.author} - ${b.pages} pages
        <button class="deleteButton" onclick={deleteBook(${i})}>x</button>
        
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

document
  .querySelector("#addBook")
  .addEventListener("click", () => submitNewBook());

showBooks();
