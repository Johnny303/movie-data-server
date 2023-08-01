import express from "express";
const app = express();
import fs from "fs";
import { title } from "process";

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
       console.log(movieToDisplay)
       res.send(movieToDisplay)
    });
});
    //TODO make it work for multy words









// app.get('/api/movies/title/:titlesearch', (req,res) => {
//     fs.readFile('./data.json', 'utf-8', (err,data) => {
//         if (err) throw err
//         const movies = JSON.parse(data)
//         const {titlesearch} = req.params.titlesearch
//         let movieToDisplay = []

//         console.log(movies)

        
//         if (movieToDisplay){
//             res.send(movieToDisplay)
//         } else {
//             res.status(404).send({state: "User Not Found"})
//         }
//     })
// })