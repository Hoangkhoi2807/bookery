const API_URL = "https://www.googleapis.com/books/v1/volumes";
async function searchBooks(query, maxResults = 12) {
    try {
        const response = await fetch(
            `${API_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}`
        );

        if (!response.ok) {
            throw new Error("Unable to connect to Google Books API");
        }

        const data = await response.json();

        return data.items || [];

    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

async function getBookById(bookId) {
    try {
        const response = await fetch(`${API_URL}/${encodeURIComponent(bookId)}`);

        if (!response.ok) {
            throw new Error("Book not found");
        }

        return await response.json();

    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}

