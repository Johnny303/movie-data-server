import express from "express";
const app = express();
import fs from "fs";

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