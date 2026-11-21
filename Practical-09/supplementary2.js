
async function searchBooks() {
    const query = document.getElementById("bookInput").value.trim();
    const results = document.getElementById("bookResults");

    if (query === "") {
        results.innerHTML = "<p>Please enter a book name or author.</p>";
        return;
    }

    results.innerHTML = "<p>Searching books...</p>";

    try {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=12`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch books.");
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            results.innerHTML = "<p>No books found. Try another search.</p>";
            return;
        }

        results.innerHTML = "";

        data.items.forEach(book => {
            const info = book.volumeInfo;

            const title = info.title || "Title not available";
            const authors = info.authors
                ? info.authors.join(", ")
                : "Author not available";
            const description = info.description
                ? info.description.substring(0, 150) + "..."
                : "Description not available";
            const image = info.imageLinks
                ? info.imageLinks.thumbnail
                : "";

            const card = document.createElement("div");
            card.className = "book-card";

            const img = document.createElement("img");
            img.src = image;
            img.alt = title + " cover";
            img.style.display = image ? "block" : "none";

            const heading = document.createElement("h3");
            heading.textContent = title;

            const author = document.createElement("p");
            author.textContent = "Author: " + authors;

            const detail = document.createElement("p");
            detail.textContent = description;

            card.append(img, heading, author, detail);
            results.appendChild(card);
        });

    } catch (error) {
        results.innerHTML = "<p>Unable to load books. Please try again.</p>";
        console.error(error);
    }
}
