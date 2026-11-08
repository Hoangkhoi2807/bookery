async function loadFeaturedBooks() {

    const container = document.getElementById("featuredBooks");

    if (!container) return;

    container.innerHTML = "<p>Loading books...</p>";

    const books = await searchBooks("subject:fiction", 4);

    container.innerHTML = "";

    if (books.length === 0) {
        container.innerHTML =
            "<p>Unable to load books. Please try again later.</p>";
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

        const img = document.createElement("img");
        img.src = image || "https://placehold.co/200x280?text=No+Cover";
        img.alt = title + " cover";
        img.loading = "lazy";

        const bookInfo = document.createElement("div");
        bookInfo.className = "book-info";

        const heading = document.createElement("h5");
        heading.textContent = title;

        const authorText = document.createElement("p");
        authorText.textContent = author;

        bookInfo.append(heading, authorText);
        card.append(img, bookInfo);

        container.appendChild(card);

    });
}

const searchForm = document.getElementById("searchForm");

if (searchForm) {

    searchForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const searchInput = document.getElementById("searchInput");

        const keyword = searchInput.value.trim();

        if (keyword === "") {
            alert("Please enter a book name or author!");
            return;
        }

        window.location.href =
            "webpages/explore.html?q=" + encodeURIComponent(keyword);

    });

}

document.addEventListener("DOMContentLoaded", function() {
    loadFeaturedBooks();
});

