const addBook = document.getElementById("addBook");
const form = document.getElementById("myForm");
let myLibrary = [];

function Book(title, author, page, isRead) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary() {
  //Create form element
  if (form.style.display === "none") {
    form.style.display = "flex";
  } else {
    form.style.display = "none";
  }
}

addBook.addEventListener("click", addBookToLibrary);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("page").value;
  const checkbox = document.getElementById("checkbox");
  const isRead = checkbox.checked ? "Read" : "Unread";
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
  form.style.display = "none";
  form.reset();
});

function displayBooks() {
  const booksInfo = document.getElementById("book-info");
  booksInfo.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    //title
    const displayTitle = document.createElement("h2");
    displayTitle.textContent = book.title;
    //author
    const displayAuthor = document.createElement("p");
    displayAuthor.textContent = `author: ${book.author}`;
    //page
    const displayPage = document.createElement("p");
    displayPage.textContent = `pages: ${book.page}`;
    //readStatus
    const readStatus = document.createElement("p");
    readStatus.textContent = book.isRead;
    //create togglereadStatus button
    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.id = "togglebutton";
    toggleButton.textContent = "Change read status";
    toggleButton.addEventListener("click", function () {
      book.toggleReadStatus();
      readStatus.textContent = book.isRead ? "Read" : "Unread";
    });

    //create Remove button
    const removeButton = document.createElement("button");
    removeButton.id = "removebutton";
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.setAttribute("data-index", index);
    removeButton.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      myLibrary.splice(index, 1);
      displayBooks();
    });
    bookCard.appendChild(displayTitle);
    bookCard.appendChild(displayAuthor);
    bookCard.appendChild(displayPage);
    bookCard.appendChild(readStatus);
    bookCard.appendChild(toggleButton);
    bookCard.appendChild(removeButton);
    booksInfo.appendChild(bookCard);
  });
}
