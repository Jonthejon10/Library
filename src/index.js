import { initializeApp } from "firebase/app"
import { getFirestore, collection, doc, getDocs, setDoc, deleteDoc} from "firebase/firestore"

const container = document.querySelector('#container')
const addBookButton = document.querySelector('#add_book_button')
let formTitle = document.querySelector('#title')
let formAuthor = document.querySelector('#author')
let formPages = document.querySelector('#pages')
let readStatus = document.querySelector('#read')
const modalContainer = document.querySelector('#modal_container')
const submitButton = document.querySelector('#submit_book')
const closeModalBtn = document.querySelector('#close_modal')
const gitBtn = document.querySelector('#github')
const myLibrary = []

const updateStatus = (btn) => {
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

const updateDbStatus = async (currBook, btnStatus) => {
    const querySnapshot = await getDocs(collection(db, 'books'))
    querySnapshot.forEach((currDoc) => {
        if (currDoc.id === currBook.title) {
            const bookRef = doc(db, 'books', currBook.title)
            setDoc(bookRef, {read: btnStatus}, {merge: true})
        }
    })
}

const changeStatus = (btn, currStatus, currBook) => {
    if (btn.textContent === 'I swear to God I read it') {
        btn.textContent = "Not going to lie, I didn't read it"
    } else if (btn.textContent === "Not going to lie, I didn't read it") {
        btn.textContent = "I swear to God I read it";
    }
    currStatus = btn.textContent
    updateStatus(btn)
    updateDbStatus(currBook, btn.textContent)
}


const deleteBook = (div, book) => {
    container.removeChild(div)
    const bookIndex = myLibrary.indexOf(book)
    myLibrary.splice(bookIndex, 1)
    deleteBookFromDb(book)
}

const deleteBookFromDb = async (currBook) => {
    const bookRef = doc(db, 'books', currBook.title)
    await deleteDoc(bookRef)
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
            updateStatus(readButton)
            readButton.addEventListener('click', () => {
                changeStatus(readButton, read, this)
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
})

closeModalBtn.addEventListener('click', () => {
    modalContainer.classList.remove('show')
})

submitButton.addEventListener('click', () => {
    if (validateForm() === true) {
        displayBook()
        clearForm()
        modalContainer.classList.remove('show')
        addToDb()
    }
})

const openInNewTab = (url) => {
    window.open(url, '_blank').focus();
}

gitBtn.addEventListener('click', () => {openInNewTab('https://github.com/Jonthejon10')})


const firebaseApp = initializeApp({
    apiKey: "AIzaSyB0oyudgN_dMVBjsHGUxOjPdI1J3Calwuo",
    authDomain: "library-45b28.firebaseapp.com",
    projectId: "library-45b28",
    storageBucket: "library-45b28.appspot.com",
    messagingSenderId: "1021929217919",
    appId: "1:1021929217919:web:cb0aa921a29b5434bb444a"
})

const db = getFirestore()

const addToDb = async () => {
    try {
        for (let book of myLibrary) {
            await setDoc(doc(db, 'books', book.title), {
                title: book.title,
                author: book.author,
                pages: book.pages,
                read: book.read
            })
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const getBooksFromDb = async () => {
    const querySnapshot = await getDocs(collection(db, 'books'))
    querySnapshot.forEach((doc) => {
        const storedBook = Book(doc.data().title, doc.data().author, doc.data().pages, doc.data().read)
        storedBook.addToLibrary()
        storedBook.createBookCard()
    })
}

getBooksFromDb()