const rootElement = document.getElementById("root")
const movieListElement = document.getElementById("movieList")
const modalElement = document.getElementById("modal")
const modalHeadElement = document.getElementById("modalHead")
const closeElement = document.getElementById("close")

async function fetchMovieList (url) {
    const response = await fetch(url)
    const data = await response.json()
    data.forEach(title => {
        movieListElement.insertAdjacentHTML("beforeend", `<li><h3>${title}</h3></li>`)
    });
}

fetchMovieList("http://127.0.0.1:3000/api/movies/all")

movieListElement.addEventListener("click", (event) => {
    let url = "http://127.0.0.1:3000/api/movies/"
    let movie = event.target.innerText
    modalHeadElement.innerHTML = ""
    modalElement.style.display = "block"

    async function fetchMovieDetails (url) {
        const response = await fetch (url)
        const data = await response.json()
        console.log(data);
        modalHeadElement.insertAdjacentHTML("beforeend", `<h2>${data.title}</h2>`)
        modalHeadElement.insertAdjacentHTML("beforeend", `<h3>Year: ${data.year}</h3>`)
        modalHeadElement.insertAdjacentHTML("beforeend", `<h3>Genres:</h3>`)
        data.genres.forEach(genre => modalHeadElement.insertAdjacentHTML("beforeend", `<p>${genre}</p>`))
        
    }

    closeElement.onclick = function() {
        modal.style.display = "none";
    }

    fetchMovieDetails(`${url}${movie}`)
})

