console.log("Running");

var submitButton = document.getElementById("submitButton");
var loadMoreMoviesButton = document.getElementById("load-more-movies-btn");

var currentPage = 1;

const apiKey = "6a08aabf3e9e29b260193e5aa2446497";
const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${currentPage}`;

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    console.log("Movies Found")
});

loadMoreMoviesButton.addEventListener("click", (event) => {
    event.preventDefault();

    console.log("Movies Loaded Succesfully")
});


