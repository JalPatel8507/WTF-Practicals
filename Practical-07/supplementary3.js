
let books = JSON.parse(localStorage.getItem("libraryBooks")) || [];

let bookForm = document.getElementById("bookForm");
let editId = null;

// Save book records in browser storage
function saveBooks() {
    localStorage.setItem("libraryBooks", JSON.stringify(books));
}

// Display all books
function displayBooks(bookData = books) {

    let bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    bookData.forEach(function(book) {

        let row = document.createElement("tr");

        let values = [
            book.isbn,
            book.title,
            book.author,
            book.category,
            book.quantity
        ];

        values.forEach(function(value) {
            let cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        let actionCell = document.createElement("td");

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";
        editButton.onclick = function() {
            editBook(book.id);
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.onclick = function() {
            deleteBook(book.id);
        };

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        bookList.appendChild(row);

    });

}

// Add or update book
bookForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let title = document.getElementById("title").value.trim();
    let author = document.getElementById("author").value.trim();
    let isbn = document.getElementById("isbn").value.trim();
    let category = document.getElementById("category").value.trim();
    let quantity = Number(document.getElementById("quantity").value);

    if (!title || !author || !isbn || !category || quantity < 1 ||
        !Number.isInteger(quantity)) {
        showMessage("Please enter valid book details!", true);
        return;
    }

    // Check for duplicate ISBN
    let duplicate = books.some(function(book) {
        return book.isbn.toLowerCase() === isbn.toLowerCase()
            && book.id !== editId;
    });

    if (duplicate) {
        showMessage("This ISBN already exists!", true);
        return;
    }

    let book = {
        id: editId || Date.now(),
        title: title,
        author: author,
        isbn: isbn,
        category: category,
        quantity: quantity
    };

    if (editId === null) {
        books.push(book);
        showMessage("Book added successfully!");
    } else {
        let index = books.findIndex(function(item) {
            return item.id === editId;
        });

        books[index] = book;
        editId = null;

        document.getElementById("submitBtn").textContent = "Add Book";
        showMessage("Book updated successfully!");
    }

    saveBooks();
    displayBooks();
    bookForm.reset();

});

// Search books
document.getElementById("search").addEventListener("input", function() {

    let searchText = this.value.toLowerCase();

    let filteredBooks = books.filter(function(book) {
        return book.title.toLowerCase().includes(searchText) ||
               book.author.toLowerCase().includes(searchText);
    });

    displayBooks(filteredBooks);

});

// Edit book
function editBook(id) {

    let book = books.find(function(item) {
        return item.id === id;
    });

    if (!book) return;

    document.getElementById("bookId").value = book.id;
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("isbn").value = book.isbn;
    document.getElementById("category").value = book.category;
    document.getElementById("quantity").value = book.quantity;

    editId = id;

    document.getElementById("submitBtn").textContent = "Update Book";

}

// Delete book
function deleteBook(id) {

    if (confirm("Are you sure you want to delete this book?")) {

        books = books.filter(function(book) {
            return book.id !== id;
        });

        if (editId === id) {
            editId = null;
            bookForm.reset();
            document.getElementById("submitBtn").textContent = "Add Book";
        }

        saveBooks();
        displayBooks();

        showMessage("Book deleted successfully!");

    }

}

// Display messages
function showMessage(message, isError = false) {

    let messageBox = document.getElementById("message");

    messageBox.textContent = message;
    messageBox.style.color = isError ? "red" : "green";

}

// Load saved books when page opens
displayBooks();
