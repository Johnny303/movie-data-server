import express from "express";
const app = express();
import fs from "fs";
import path from "path"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { fileURLToPath } from 'url';
const url = "http://127.0.0.1:3000/movies"


app.get('/users', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, data) => {
      if (err) throw err;
      const users = JSON.parse(data).users;
      res.send(users);
    });
  });



app.use('/', express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/movies"));
  });

const moviesUrl = "http://127.0.0.1:3000/api/movies/all"



app.listen(3000, () => {
    console.log(`Open this link in your browser: http://127.0.0.1:3000`);
  });


app.get('/api/movies/all', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) throw err;
        const movies = JSON.parse(data).movies;
        let movieTitles  = []
        movies.forEach(movie => {
            movieTitles.push(movie.title)
        })

        res.send(movieTitles);
});
});
app.get('/api/movies/title/:search', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) throw err;
        const movies = JSON.parse(data).movies;
        const {search} = req.params
        let movieToDisplay = []

        movies.forEach(movie => {
            if (movie.title === search){
                movieToDisplay.push(movie)
            }
        })
       res.send(movieToDisplay)
    });
});

function renderMovies(movies){
    let movieList = []
    movies.forEach(movie => {
        movieList.push(`<h2 class = "movieTitle">${movie}<h2>`)
    })
    return movieList.join("")
}


async function fetchMoviesFromServer(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        let movieTitles = Object.values(data)
        
        app.get('/movies', (req, res) => {
            res.send(renderMovies(movieTitles))
        })
          
    } catch (error) {
        console.log(error)
    }
}



fetchMoviesFromServer(moviesUrl)

