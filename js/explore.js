async function displayBooks(keyword) {

    const container = document.getElementById("exploreResults");

    container.innerHTML = "<p>Loading books...</p>";

    const books = await searchBooks(keyword, 20);

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

        const button = document.createElement("a");
        button.className = "btn btn-outline-secondary";
        button.textContent = "View Details";
        button.href = "details.html?id=" + encodeURIComponent(book.id);

        bookInfo.append(heading, authorText, button);
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
const initialKeyword = params.get("q") || "fiction";

document.getElementById("exploreSearchInput").value =
    initialKeyword === "fiction" ? "" : initialKeyword;

displayBooks(initialKeyword);

