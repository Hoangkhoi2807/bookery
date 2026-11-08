const API_URL = "https://www.googleapis.com/books/v1/volumes";

async function searchBooks(query, maxResults = 12) {

    const cacheKey = `books_${query}_${maxResults}`;

    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
        return JSON.parse(cached);
    }

    try {
        const response = await fetch(
            `${API_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}`
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("API Response:", data);

            if (response.status === 429) {
                throw new Error("Google Books API limit reached. Please try again later.");
            }

            throw new Error("Unable to connect to Google Books API");
        }

        const books = data.items || [];

        sessionStorage.setItem(cacheKey, JSON.stringify(books));

        return books;

    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

async function getBookById(bookId) {
    try {
        const response = await fetch(
            `${API_URL}/${encodeURIComponent(bookId)}`
        );

        if (!response.ok) {
            throw new Error("Book not found");
        }

        return await response.json();

    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}

