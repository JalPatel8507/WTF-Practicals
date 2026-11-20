
async function getNews() {

    let newsList = document.getElementById("newsList");
    let status = document.getElementById("status");

    newsList.innerHTML = "<p>Loading news...</p>";

    try {

        // Fetch news data from JSON API
        let response = await fetch(
            "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );

        if (!response.ok) {
            throw new Error("Unable to fetch news!");
        }

        // Convert response into JSON
        let newsData = await response.json();

        newsList.innerHTML = "";

        // Display news headlines
        newsData.forEach(function(news) {

            let newsDiv = document.createElement("div");
            newsDiv.className = "news";

            let heading = document.createElement("h3");
            heading.textContent = news.title;

            let description = document.createElement("p");
            description.textContent = news.body;

            newsDiv.appendChild(heading);
            newsDiv.appendChild(description);

            newsList.appendChild(newsDiv);

        });

        status.textContent =
            "News updated successfully! Auto-refreshes every 30 seconds.";

    } catch (error) {

        newsList.textContent = error.message;
        status.textContent = "";

    }
}

// Load news when page opens
getNews();

// Automatically refresh news every 30 seconds
setInterval(getNews, 30000);
