console.log("Running");

var loadMoreMoviesButton = document.getElementById("load-more-movies-btn");

loadMoreMoviesButton.addEventListener("click", (event) => {
    event.preventDefault();

    console.log("Movies Loaded Succesfully")
});