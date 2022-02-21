'use strict';
const express = require('express');
const movies = require("data.json");
const axios = require("axios");

const app = express();

function movie(id, title, release_date, poster_path, overview) {
    this.id= id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}


app.get('/', handler);
app.get('/trending', trindingHandler);
app.get('/search', searchHandller);
app.get(errorHandller);


function handler(req, res) {
    let arr = [];
    let onemovie = new movie(value.id, value.title, value.release_date, value.poster_path, value.overview)
    arr.push(onemovie);
    }
        return res.status(200).json(movies.data);
}





function trindingHandler(req, res) {
    let arr = [];
    axios.get('https://api.themoviedb.org/3/trending/all/day?1531f1a558c8357ce8990cf887ff196e8f5402ec=<<1531f1a558c8357ce8990cf887ff196e8f5402ec>>')
        .then(apiResponse => {
            apiResponse.data.movies.map(value => {
                let onemovie = new movie(value.id, value.title, value.release_date, value.poster_path, value.overview)
                arr.push(onemovie);
            })
            return res.status(200).json(arr);
        }).catch (error=> {
        errorHandller(error, req, res);
    
    })
   
};





function errorHandller(error, req, res) {
    const err = {
        status =500
        massage=error
    }
    return res.status(500.send("not found");
}



function searchHandller(req, res) {
    let arr = [];
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=668baa4bb128a32b82fe0c15b21dd699&language=en-US&query=The&page=2')
        .then(apiResponse => {
            apiResponse.data.movies.map(value => {
                let onemovie = new movie(value.id, value.title, value.release_date, value.poster_path, value.overview)
                arr.push(onemovie);
            })
            return res.status(200).json(arr);
        }).catch(error => {
            errorHandller(error, req, res);

        })

}



app.listen(3000, () => {
    console.log("Listen on 3000")
})
