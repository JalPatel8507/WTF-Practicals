
window.onload = function() {

    // Load saved genre from Local Storage
    let savedGenre = localStorage.getItem("preferredGenre");

    if (savedGenre) {
        document.getElementById("genre").value = savedGenre;
        getMovies();
    }
};

async function getMovies() {

    let genre = document.getElementById("genre").value;
    let movieList = document.getElementById("movieList");

    if (genre === "") {
        alert("Please select a genre!");
        return;
    }

    // Save preferred genre
    localStorage.setItem("preferredGenre", genre);

    movieList.innerHTML = "<p>Loading movies...</p>";

    try {

        // Fetch shows from TVMaze API
        let response = await fetch("https://api.tvmaze.com/shows");

        if (!response.ok) {
            throw new Error("Unable to fetch movie information!");
        }

        let movies = await response.json();

        // Filter movies according to selected genre
        let filteredMovies = movies.filter(function(movie) {
            return movie.genres.includes(genre);
        });

        movieList.innerHTML = "";

        if (filteredMovies.length === 0) {
            movieList.textContent = "No movies found for this genre.";
            return;
        }

        // Display first 10 matching results
        filteredMovies.slice(0, 10).forEach(function(movie) {

            let movieDiv = document.createElement("div");
            movieDiv.className = "movie";

            let heading = document.createElement("h3");
            heading.textContent = movie.name;

            let genreText = document.createElement("p");
            genreText.textContent =
                "Genre: " + movie.genres.join(", ");

            let rating = document.createElement("p");
            rating.textContent =
                "Rating: " + (movie.rating.average || "Not available");

            movieDiv.appendChild(heading);
            movieDiv.appendChild(genreText);
            movieDiv.appendChild(rating);

            // Display poster if available
            if (movie.image && movie.image.medium) {
                let poster = document.createElement("img");
                poster.src = movie.image.medium;
                poster.alt = movie.name + " poster";
                movieDiv.appendChild(poster);
            }

            movieList.appendChild(movieDiv);

        });

    } catch (error) {

        movieList.textContent = error.message;

    }
}
