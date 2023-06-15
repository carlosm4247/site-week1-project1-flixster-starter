console.log("Running");

var submitButton = document.getElementById("submitButton");
var loadMoreMoviesButton = document.getElementById("load-more-movies-btn");

var currentPage = 1;

const apiKey = "6a08aabf3e9e29b260193e5aa2446497";
const baseURL = "http://image.tmdb.org/t/p/"

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    console.log("Movies Found");
});


async function displayCurrentMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${currentPage}`);
    const data = await response.json();
    const movieList = document.querySelector('.movieList');

    data.results.forEach(movie => {
        const container = document.createElement("div");
        container.classList.add("movie-container");

        const img = document.createElement("img");
        img.src = baseURL + "w185" + movie["poster_path"];
        container.appendChild(img);

        const title = document.createElement("div");
        title.textContent = movie["title"];
        container.appendChild(title);

        const rating = document.createElement("div");
        rating.textContent = movie["vote_average"] + " ⭐️";
        container.appendChild(rating);

        movieList.appendChild(container);
    });

    currentPage++;
}

document.addEventListener("DOMContentLoaded", displayCurrentMovies());

loadMoreMoviesButton.addEventListener("click", (event) => {
    event.preventDefault();

    displayCurrentMovies();
    console.log("Movies Loaded Succesfully")
});


