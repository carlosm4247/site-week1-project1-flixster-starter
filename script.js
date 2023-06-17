console.log("Running");

var submitButton = document.getElementById("submitButton");
var loadMoreMoviesButton = document.getElementById("load-more-movies-btn");
var searchInput = document.getElementById("search-input");
var homeButton = document.getElementById("homeButton");

var currentPage = 1;

const apiKey = "6a08aabf3e9e29b260193e5aa2446497";
const baseURL = "http://image.tmdb.org/t/p/";

async function displayMovies(url, movieCard) {
  const response = await fetch(url);
  const data = await response.json();

  data.results.forEach((movie) => {
    const container = document.createElement("div");
    container.classList.add("movie-container");
    container.id = "movie-card";

    const img = document.createElement("img");
    img.id = "movie-poster";
    img.src = baseURL + "w342" + movie["poster_path"];
    container.appendChild(img);

    const title = document.createElement("div");
    title.id = "movie-title";
    title.textContent = movie["title"];
    container.appendChild(title);

    const rating = document.createElement("div");
    rating.id = "movie-votes";
    movie["vote_count"] > 0
      ? (rating.textContent = movie["vote_average"] + "/10 ⭐️")
      : (rating.textContent = "No Rating Yet");
    container.appendChild(rating);

    container.addEventListener("click", () => {
      openPopup(movie);
    });

    movieCard.appendChild(container);
  });
}

function displayCurrentMovies() {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${currentPage}`;
  const movieList = document.querySelector(".movieList");
  movieList.id = "movie-grid";

  displayMovies(url, movieList);

  currentPage++;
}

function displaySearchedMovies(term) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${term}`;
  const searchedMovies = document.querySelector(".searchedMovies");

  displayMovies(url, searchedMovies);
}

document.addEventListener("DOMContentLoaded", displayCurrentMovies());

loadMoreMoviesButton.addEventListener("click", (event) => {
  event.preventDefault();

  displayCurrentMovies();
  console.log("Movies Loaded Succesfully");
});

async function openPopup(movie) {
  const movieID = movie["id"];
  const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  let genres = [];
  data.genres.forEach((genre) => {
    genres.push(genre["name"]);
  });

  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");
  popupContainer.id = "popup-container-" + movieID;

  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");

  const img = document.createElement("img");
  img.src = baseURL + "w780" + movie["backdrop_path"];
  popupContent.append(img);

  const title = document.createElement("div");
  title.textContent = "Title: " + movie["title"];
  popupContent.append(title);

  const releaseDate = document.createElement("div");
  releaseDate.textContent = "Release Date: " + movie["release_date"];
  popupContent.append(releaseDate);

  const movieGenres = document.createElement("div");
  movieGenres.textContent = "Genres: " + genres.join(", ");
  popupContent.append(movieGenres);

  const overview = document.createElement("p");
  overview.textContent = "Overview: " + movie["overview"];
  popupContent.append(overview);

  const popupClose = document.createElement("button");
  popupClose.id = "close-search-btn";
  popupClose.classList.add("popup-close");
  popupClose.textContent = "❌";
  popupClose.addEventListener("click", () => {
    closePopup(movieID);
  });

  popupContent.appendChild(popupClose);

  popupContainer.appendChild(popupContent);

  document.body.appendChild(popupContainer);
}

function closePopup(movieID) {
  const popupContainer = document.getElementById("popup-container-" + movieID);
  popupContainer.style.display = "none";
  console.log("Popup closed");
}

function clearCurrentMovies() {
  const currentMoviesContainer = document.getElementById("currentMovies");
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
});