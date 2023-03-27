const modalForm = document.getElementById("modal-form");
const addBook = document.getElementById("addBook");

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
  const form = document.createElement("form");
  form.id = "myForm";
  modalForm.appendChild(form);
  //create labels
  const labels = ["Title", "Author", "Page"];
  labels.forEach((labelText) => {
    const label = document.createElement("label");
    label.textContent = labelText + ":";
    label.setAttribute("for", labelText.toLowerCase());
    form.appendChild(label);
    //create input
    const input = document.createElement("input");
    input.type = labelText === "Page" ? "number" : "text";
    input.id = labelText.toLowerCase();
    form.appendChild(input);
    form.appendChild(document.createElement("br"));
  });
  //create checkbox with label

  const inputCheckbox = document.createElement("input");
  inputCheckbox.type = "checkbox";
  inputCheckbox.id = "checkbox";
  inputCheckbox.setAttribute("checked", false);
  form.appendChild(inputCheckbox);
  const labelCheckbox = document.createElement("label");
  labelCheckbox.for = "checkbox";
  labelCheckbox.textContent = "Have you read it?";
  form.appendChild(labelCheckbox);

  //create submitButton
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  form.appendChild(submitButton);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("page").value;
    const isRead = inputCheckbox.checked ? "Read" : "Not read";
    console.log(isRead);
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    displayBooks();
  });
}

addBook.addEventListener("click", addBookToLibrary);

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
    toggleButton.textContent="Change read status"
    toggleButton.addEventListener("click",function(){
      book.toggleReadStatus();
      readStatus.textContent=book.isread
    })

    //create Remove button
    const removeButton = document.createElement("button");
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
    bookCard.appendChild(removeButton);
    bookCard.appendChild(removeButton);
    booksInfo.appendChild(bookCard);
    booksInfo.appendChild(toggleButton)
  });
}
