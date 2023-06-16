console.log("Running");

var submitButton = document.getElementById("submitButton");
var loadMoreMoviesButton = document.getElementById("load-more-movies-btn");
var searchInput = document.getElementById("searchInput");
var homeButton = document.getElementById("homeButton");

var currentPage = 1;

const apiKey = "6a08aabf3e9e29b260193e5aa2446497";
const baseURL = "http://image.tmdb.org/t/p/"

async function displayMovies(url, movieCard) {
    const response = await fetch(url);
    const data = await response.json();

    data.results.forEach(movie => {
        const container = document.createElement("div");
        container.classList.add("movie-container");

        const img = document.createElement("img");
        img.src = baseURL + "w342" + movie["poster_path"];
        container.appendChild(img);

        const title = document.createElement("div");
        title.textContent = movie["title"];
        container.appendChild(title);

        const rating = document.createElement("div");
        rating.textContent = movie["vote_average"] + " ⭐️";
        container.appendChild(rating);

        movieCard.appendChild(container);
    });
}

function displayCurrentMovies() {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${currentPage}`;
    const movieList = document.querySelector('.movieList');

    displayMovies(url, movieList);

    currentPage++;
}

function displaySearchedMovies(term) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${term}`;
    const searchedMovies = document.querySelector('.searchedMovies');

    displayMovies(url, searchedMovies);
}

document.addEventListener("DOMContentLoaded", displayCurrentMovies());

loadMoreMoviesButton.addEventListener("click", (event) => {
    event.preventDefault();

    displayCurrentMovies();
    console.log("Movies Loaded Succesfully")
});

function clearCurrentMovies() {
    const currentMoviesContainer = document.getElementById('currentMovies');
    currentMoviesContainer.remove();
}

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    clearCurrentMovies();

    const searchTerm = searchInput.value;
    displaySearchedMovies(searchTerm);

    console.log("Movies Found");
});

homeButton.addEventListener("click", (event) => {
    event.preventDefault();

    location.reload();

    console.log("Back Home");
})





