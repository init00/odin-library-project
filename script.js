
let myLibray = [];
const formElement = document.getElementById('book-form');

const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');

addBookToLibrary('Atlas Shrugged', 'Ayn Rand', 1168, true);
addBookToLibrary('Kafka on the Shore', 'Haruki Murakami', 505, false);
addBookToLibrary('The Order of Time', 'Carlo Rovelli', 256, false);

title.addEventListener('input', () => {
    title.setCustomValidity('');
    title.checkValidity();
});

title.addEventListener('invalid', () => {
    title.setCustomValidity('Please enter a title for the book.');
})

author.addEventListener('input', () => {
    author.setCustomValidity('');
    author.checkValidity();
})

author.addEventListener('invalid', () => {
    author.setCustomValidity('Please enter the book\'s author.');
})

pages.addEventListener('input', () => {
    pages.setCustomValidity('');
    pages.checkValidity();
})

pages.addEventListener('invalid', () => {
    pages.setCustomValidity('Please enter the number of pages in the book.');
})

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibray.push(book);
    console.log(myLibray);
    renderBookList();
}

function Book(title, author, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;

    // this.info = function () {
    //     return `${this.title} by ${this.author}, ${this.pages} pages, ${isRead?"Read": "Not Read"}`
    // }

    this.toggleReadStatus = function () {
        this.isRead = !this.isRead;
    }
}

function renderBookList() {
    const cardContainer = document.getElementById('books');
    cardContainer.innerHTML = "";

    myLibray.forEach((obj, index) => {
        //create card element
        let card = document.createElement('div');
        card.classList.add('card');
        obj.isRead ? card.classList.add('book-read'): card.classList.remove('book-read');

        //create book text node
        const bookTextContainer = document.createElement('div');
        bookTextContainer.appendChild(document.createTextNode(obj.title+" by "+ obj.author));

        //create remove button
        const removeButton = document.createElement('button');
        const buttonText = document.createTextNode('Remove');
        removeButton.appendChild(buttonText);
        removeButton.setAttribute("id", index);
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', (event) => {
            myLibray.splice(parseInt(event.target.getAttribute('id')), 1);
            renderBookList();
        });

        //create toggle read status
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('toggle-button');
        toggleButton.innerHTML = obj.isRead?"Mark Unread": "Mark Read";
        toggleButton.addEventListener('click', ev => {
            obj.toggleReadStatus();
            ev.target.innerHTML = obj.isRead?"Mark Unread": "Mark Read";
            obj.isRead ? card.classList.add('book-read'): card.classList.remove('book-read');
        });
        
        //append book text and remove button to card
        card.appendChild(bookTextContainer);
        card.appendChild(toggleButton);
        card.appendChild(removeButton);

        //append card to card-container
        cardContainer.appendChild(card);
    });
}

function showForm() {
    formElement.reset();
    formElement.classList.remove('hide-form');
}

function hideForm() {
    formElement.classList.add('hide-form');
}


formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(formElement);
    const isRead = formData.get('read') === "true";
    addBookToLibrary(
        formData.get('title'),
        formData.get('author'),
        formData.get('pages'),
        isRead
    );
    formElement.classList.add('hide-form');
    console.log("New book was added");
});

