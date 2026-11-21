
async function searchMovies() {
    const query = document.getElementById("movieInput").value.trim();
    const results = document.getElementById("movieResults");

    if (query === "") {
        results.innerHTML = "<p>Please enter a movie or show name.</p>";
        return;
    }

    results.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch(
            `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch information.");
        }

        const data = await response.json();

        if (data.length === 0) {
            results.innerHTML = "<p>No results found.</p>";
            return;
        }

        results.innerHTML = "";

        data.forEach(item => {
            const show = item.show;

            const card = document.createElement("div");
            card.className = "movie-card";

            const img = document.createElement("img");
            img.src = show.image
                ? show.image.medium
                : "";
            img.alt = show.name + " poster";
            img.style.display = show.image ? "block" : "none";

            const heading = document.createElement("h3");
            heading.textContent = show.name;

            const rating = document.createElement("p");
            rating.textContent = "Rating: " +
                (show.rating.average || "Not available");

            const genre = document.createElement("p");
            genre.textContent = "Genre: " +
                (show.genres.length ? show.genres.join(", ") : "Not available");

            const summary = document.createElement("p");
            summary.textContent = show.summary
                ? show.summary.replace(/<[^>]*>/g, "")
                : "Description not available.";

            card.append(img, heading, rating, genre, summary);
            results.appendChild(card);
        });

    } catch (error) {
        results.innerHTML = "<p>Unable to load information. Try again.</p>";
        console.error(error);
    }
}
