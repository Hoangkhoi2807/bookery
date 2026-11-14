async function displayBooks(keyword) {

    const container = document.getElementById("exploreResults");

    container.innerHTML = "<p>Loading books...</p>";

    let books = await searchBooks(keyword, 20);


if (!books || books.length === 0) {
    books = getDemoBooks();
}

    container.innerHTML = "";

    if (books.length === 0) {
        container.innerHTML = "<p>No books found. Try another keyword.</p>";
        return;
    }

   books.forEach(book => {

    const info = book.volumeInfo;

    const title = info.title || "Unknown Title";

    const author = info.authors
        ? info.authors.join(", ")
        : "Unknown Author";

    const image = info.imageLinks?.thumbnail || "";

    const card = document.createElement("div");
    card.className = "book-card";

    // BOOK COVER
    const img = document.createElement("img");
    img.src = image || "https://placehold.co/200x280?text=No+Cover";
    img.alt = title + " cover";
    img.loading = "lazy";

    // BOOK INFORMATION
    const bookInfo = document.createElement("div");
    bookInfo.className = "book-info";

    const heading = document.createElement("h5");
    heading.textContent = title;

    const authorText = document.createElement("p");
    authorText.textContent = author;

    // ADD TO LIBRARY BUTTON
    const addButton = document.createElement("button");
    addButton.className = "add-library-button";
    addButton.textContent = "Add to Library";

    const savedBooks = getSavedBooks();

    const alreadySaved = savedBooks.some(
        savedBook => savedBook.id === book.id
    );

    if (alreadySaved) {
        addButton.textContent = "Added to Library";
        addButton.disabled = true;
    }

    addButton.addEventListener("click", function() {
        addToLibrary(book);
        addButton.textContent = "Added to Library";
        addButton.disabled = true;
    });

    // VIEW DETAILS BUTTON
    bookInfo.append(heading, authorText);

    if (!book.isDemo) {
        const detailsButton = document.createElement("a");

        detailsButton.className = "btn btn-outline-secondary";
        detailsButton.textContent = "View Details";
        detailsButton.href =
            "details.html?id=" + encodeURIComponent(book.id);

        bookInfo.appendChild(detailsButton);
    }

    bookInfo.appendChild(addButton);

    card.append(img, bookInfo);
    container.appendChild(card);

});
}

const searchForm = document.getElementById("exploreSearchForm");

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const keyword = document
        .getElementById("exploreSearchInput")
        .value.trim();

    if (keyword !== "") {
        displayBooks(keyword);
    }

});

const params = new URLSearchParams(window.location.search);

const category = params.get("category");
const searchQuery = params.get("q");

const initialKeyword = searchQuery ||
    (category ? `subject:${category}` : "fiction");

document.getElementById("exploreSearchInput").value =
    searchQuery || category || "";

displayBooks(initialKeyword);

document.getElementById("exploreSearchInput").value =
    initialKeyword === "fiction" ? "" : initialKeyword;

displayBooks(initialKeyword);

function getDemoBooks() {
    return [
        {
            id: "demo1",
            isDemo: true,
            volumeInfo: {
                title: "Harry Potter and the Philosopher's Stone",
                authors: ["J.K. Rowling"],
                imageLinks: {
                    thumbnail: "https://covers.openlibrary.org/b/isbn/9780747532699-M.jpg"
                }
            }
        },
        {
            id: "demo2",
            isDemo: true,
            volumeInfo: {
                title: "The Hobbit",
                authors: ["J.R.R. Tolkien"],
                imageLinks: {
                    thumbnail: "https://covers.openlibrary.org/b/isbn/9780547928227-M.jpg"
                }
            }
        },
        {
            id: "demo3",
            isDemo: true,
            volumeInfo: {
                title: "Pride and Prejudice",
                authors: ["Jane Austen"],
                imageLinks: {
                    thumbnail: "https://covers.openlibrary.org/b/isbn/9780141439518-M.jpg"
                }
            }
        },
        {
            id: "demo4",
            isDemo: true,
            volumeInfo: {
                title: "The Adventures of Sherlock Holmes",
                authors: ["Arthur Conan Doyle"],
                imageLinks: {
                    thumbnail: "https://covers.openlibrary.org/b/isbn/9780141439563-M.jpg"
                }
            }
        }
    ];
}

function getSavedBooks() {

    try {
        return JSON.parse(
            localStorage.getItem("bookeryLibrary")
        ) || [];

    } catch (error) {
        console.error("Library data error:", error);
        return [];
    }
}


// ==============================
// 5. ADD BOOK TO LIBRARY
// ==============================

function addToLibrary(book) {

    const books = getSavedBooks();

    // Check whether the book already exists
    const alreadySaved = books.some(
        savedBook => savedBook.id === book.id
    );

    if (alreadySaved) {
        alert("This book is already in your library!");
        return;
    }

    const info = book.volumeInfo;

    const newBook = {
        id: book.id,
        title: info.title || "Unknown Title",
        authors: info.authors
            ? info.authors.join(", ")
            : "Unknown Author",
        thumbnail: info.imageLinks?.thumbnail || "",
        status: "Want to Read"
    };

    books.push(newBook);

    localStorage.setItem(
        "bookeryLibrary",
        JSON.stringify(books)
    );

    alert("Book added to your library!");
}