const container = document.querySelector('#container')
const addBookButton = document.querySelector('#add_book_button')
let formTitle = document.querySelector('#title')
let formAuthor = document.querySelector('#author')
let formPages = document.querySelector('#pages')
let readStatus = document.querySelector('#read')
const modalContainer = document.querySelector('#modal_container')
const submitButton = document.querySelector('#submit_book')
const closeModalBtn = document.querySelector('#close_modal')

const myLibrary = [];

const changeStatus = (btn, currStatus) => {
    if (btn.textContent === 'I swear to God I read it') {
        btn.textContent = "Not going to lie, I didn't read it"
    } else if (btn.textContent === "Not going to lie, I didn't read it") {
        btn.textContent = "I swear to God I read it";
    }
    currStatus = btn.textContent
    checkForStatus(btn)
}

const checkForStatus = (btn) => {
    if (btn.textContent === 'I swear to God I read it') {
        btn.classList.add("read-button")
        if (btn.classList.contains('not-read-button')) {
            btn.classList.remove('not-read-button')
        }
    } else if (btn.textContent === "Not going to lie, I didn't read it") {
        btn.classList.remove('read-button')
        btn.classList.add('not-read-button')
    }
}

const deleteBook = (div, book) => {
    container.removeChild(div)
    const bookIndex = myLibrary.indexOf(book)
    myLibrary.splice(bookIndex, 1)
}

const Book = (title, author, pages, read) => {
    return {
        title: title,
        author: author,
        pages: pages,
        read: read,

        addToLibrary() {
            myLibrary.push(this)
        },

        createBookCard() {
            let newBook = document.createElement('div')
            newBook.classList.add("book-card");
            
            let bookTitle = document.createElement("h1")
            bookTitle.textContent = title + ','
            
            let bookAuthor = document.createElement("p")
            bookAuthor.textContent = 'by ' + author + ','
            
            let bookPages = document.createElement("p")
            bookPages.textContent = pages + ' pages'
            
            let readButton = document.createElement("button")
            readButton.textContent = read
            checkForStatus(readButton)
            readButton.addEventListener('click', () => {
                changeStatus(readButton, read)
            })
            
            let deleteButton = document.createElement("button")
            deleteButton.addEventListener('click', () => {
                deleteBook(newBook, this)
            })
            deleteButton.classList.add('delete-button')

            newBook.appendChild(bookTitle)
            newBook.appendChild(bookAuthor)
            newBook.appendChild(bookPages)
            newBook.appendChild(deleteButton)
            newBook.appendChild(readButton)
            container.insertBefore(newBook, addBookButton)
        }
    }
}

const displayBook = () => {
    const userBook = Book(formTitle.value, formAuthor.value, formPages.value, readStatus.value)
    userBook.addToLibrary()
    userBook.createBookCard()
}

const clearForm = () => {
    formTitle.value = ''
    formAuthor.value = ''
    formPages.value = ''
}

const validateForm = () => {
    if (formTitle.value === "") {
      alert("Book title must be filled out")
      return false
    } else if(formAuthor.value === "") {
        alert("Book author must be filled out")
        return false
    } else if(formPages.value === "") {
        alert("Book pages must be filled out")
        return false
    } else {
        return true
  }
}

addBookButton.addEventListener('click', () => {
    modalContainer.classList.add('show')
});

closeModalBtn.addEventListener('click', () => {
    modalContainer.classList.remove('show')
})

submitButton.addEventListener('click', () => {
    if (validateForm() === true) {
        displayBook()
        clearForm()
        modalContainer.classList.remove('show')
    }
})

const openInNewTab = (url) => {
    window.open(url, '_blank').focus();
}

const startingBook = Book("A Game of Thrones", "George R.R Martin", "694", "I swear to God I read it")
startingBook.addToLibrary()
startingBook.createBookCard()
