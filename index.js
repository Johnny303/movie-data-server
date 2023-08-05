import express from "express";
const app = express();
import fs from "fs";

import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/pub', express.static(path.join(__dirname, 'client', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.get('/api/movies/all', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) throw err;
      const movieTitles = JSON.parse(data).movies.map(movie => movie.title);
      res.send(movieTitles);
    });
});

app.get('/api/movies/:movie', (req, res) => {
    const searchedMovie = decodeURIComponent(req.params.movie);
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) throw err;
        const movies = JSON.parse(data).movies;
        movies.forEach(movie => movie.title === searchedMovie ? res.send(movie) : false)
      });
})

async function fetchMovies (url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
    catch (error) {
        console.log(error);
    }
}

app.get('/movies', (req, res) => {
    async function getMovieTitles (){
        let movieList = await fetchMovies("http://127.0.0.1:3000/api/movies/all")

        res.sendFile(path.join(__dirname, '/client/public/index.html'));
    }
    getMovieTitles()
})



  
app.listen(3000, () => {
console.log(`Open this link in your browser: http://127.0.0.1:3000`);
});