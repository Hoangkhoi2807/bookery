function getLibraryBooks() {
    try {
        return JSON.parse(localStorage.getItem("bookeryLibrary")) || [];
    } catch (error) {
        console.error("Unable to read library:", error);
        return [];
    }
}

function displayLibrary() {

    const container = document.getElementById("libraryBooks");
    const emptyMessage = document.getElementById("emptyLibrary");
    const bookCount = document.getElementById("bookCount");
    const statusFilter = document.getElementById("statusFilter");

    const books = getLibraryBooks();
    const selectedStatus = statusFilter.value;

    const filteredBooks = selectedStatus === "all"
        ? books
        : books.filter(book => book.status === selectedStatus);

    container.innerHTML = "";

    bookCount.textContent =
        `${filteredBooks.length} books shown (${books.length} total)`;

    if (filteredBooks.length === 0) {

        emptyMessage.classList.remove("hidden");

        if (books.length > 0) {
            emptyMessage.querySelector("h3").textContent =
                "No books in this category.";
            emptyMessage.querySelector("p").textContent =
                "Try selecting another reading status.";
        } else {
            emptyMessage.querySelector("h3").textContent =
                "Your library is waiting for its first story.";
            emptyMessage.querySelector("p").textContent =
                "You haven't added any books yet. Explore and find something to read!";
        }

        return;
    }

    emptyMessage.classList.add("hidden");

    filteredBooks.forEach(book => {

        const card = document.createElement("div");
        card.className = "library-card";

        const image = document.createElement("img");
        image.src = book.thumbnail ||
            "https://placehold.co/200x280?text=No+Cover";
        image.alt = `${book.title} cover`;
        image.loading = "lazy";

        const title = document.createElement("h3");
        title.textContent = book.title || "Unknown Title";

        const author = document.createElement("p");
        author.className = "book-author";
        author.textContent = book.authors || "Unknown Author";

        const statusLabel = document.createElement("label");
        statusLabel.textContent = "Reading Status";

        const statusSelect = document.createElement("select");

        const statuses = [
            "Want to Read",
            "Currently Reading",
            "Finished"
        ];

        statuses.forEach(status => {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            option.selected = (book.status || "Want to Read") === status;
            statusSelect.appendChild(option);
        });

        statusSelect.addEventListener("change", function() {
            updateBookStatus(book.id, statusSelect.value);
        });

        const removeButton = document.createElement("button");
        removeButton.className = "remove-book";
        removeButton.textContent = "Remove from Library";

        removeButton.addEventListener("click", function() {
            removeBook(book.id);
        });

        card.append(
            image,
            title,
            author,
            statusLabel,
            statusSelect,
            removeButton
        );

        container.appendChild(card);
    });
}

function updateBookStatus(bookId, newStatus) {

    const books = getLibraryBooks();

    const book = books.find(item => item.id === bookId);

    if (!book) return;

    book.status = newStatus;

    localStorage.setItem("bookeryLibrary", JSON.stringify(books));

    displayLibrary();
}

function removeBook(bookId) {

    const confirmed = confirm(
        "Are you sure you want to remove this book?"
    );

    if (!confirmed) return;

    const books = getLibraryBooks();

    const updatedBooks = books.filter(
        book => book.id !== bookId
    );

    localStorage.setItem(
        "bookeryLibrary",
        JSON.stringify(updatedBooks)
    );

    displayLibrary();
}

document.getElementById("statusFilter").addEventListener(
    "change",
    displayLibrary
);

displayLibrary();