const myLibrary = [];
const addBookButton = document.getElementById('addBookButton');
const submitButton = document.getElementById('submitButton');
const noForm = document.getElementById('cancelFormButton');
let rmvUserBook;

const startingBook = new Book ("A Game of Thrones", "George R.R Martin", "694", "I swear to God I read it");
myLibrary.push(startingBook);
new bookCard ("A Game of Thrones", "George R.R Martin", "694", "I swear to God I read it");

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};


function bookCard(title, author, pages, read) {     // creating the book cards
    let newBook = document.createElement('div');
    newBook.classList.add("card");
    let newBookTitle = document.createElement("HEADER");
    newBookTitle.classList.add("header");
    let newBookAuthor = document.createElement("P");
    let newBookPages = document.createElement("P");
    let newBookRead = document.createElement("BUTTON");
    newBookRead.classList.add("readButton");
    let deleteButton = document.createElement("BUTTON");
    deleteButton.classList.add('deleteButton')
    newBookRead.addEventListener('click', () => {
        if (newBookRead.textContent == "I swear to God I read it") {
            newBookRead.textContent = "Not going to lie, I didn't read it";
        } else if (newBookRead.textContent == "Not going to lie, I didn't read it") {
            newBookRead.textContent = "I swear to God I read it";
        };
    });
    deleteButton.addEventListener('click', () => {
        newBook.remove();
        const bookIndex = myLibrary.indexOf(rmvUserBook);
        myLibrary.splice(bookIndex, 1);
    });
    newBookTitle.textContent = title;
    newBookAuthor.textContent = 'by ' + author;
    newBookPages.textContent = pages + " pages";
    newBookRead.textContent = read;
    deleteButton.textContent = 'Remove book';
    newBook.appendChild(newBookTitle);
    newBook.appendChild(newBookAuthor);
    newBook.appendChild(newBookPages);
    newBook.appendChild(newBookRead);
    newBook.appendChild(deleteButton);
    let currentDiv = document.getElementById('start');
    document.body.insertBefore(newBook, currentDiv);
};

function addBookToLibrary() {       // adding the books to library
    let bookTitle = document.getElementById("newTitle").value;
    let bookAuthor = document.getElementById('newAuthor').value;
    let bookPages = document.getElementById('newPages').value;
    let bookRead = document.getElementById('newRead').value;
    let userBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
    rmvUserBook = userBook;
    myLibrary.push(userBook);
    new bookCard(userBook.title, userBook.author, userBook.pages, userBook.read)
};



function showForm() {
    document.getElementById('bookForm').style.display = 'block';
};

function hideForm() {
    document.getElementById("bookForm").style.display = "none";
};

addBookButton.addEventListener('click', showForm);

noForm.addEventListener('click', hideForm)

function validateForm() {
    let formTitle = document.forms["bookForm"]["bTitle"].value;
    let formAuthor = document.forms["bookForm"]["bAuthor"].value;
    let formPages = document.forms["bookForm"]["bPages"].value;
    if (formTitle == "") {
      alert("Book title must be filled out");
      return false;
    } else if(formAuthor == "") {
        alert("Book author must be filled out");
        return false;
    } else if(formPages == "") {
        alert("Book pages must be filled out");
        return false;
  };
};

function clearForm (){
    document.forms["bookForm"]["bTitle"].value = '';
    document.forms["bookForm"]["bAuthor"].value = '';
    document.forms["bookForm"]["bPages"].value = '';
};

submitButton.addEventListener('click', () => {
    if (validateForm() !== false) {
        addBookToLibrary();
        clearForm();
        hideForm();
    };
});


