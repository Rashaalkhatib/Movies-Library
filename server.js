'use strict';
const express = require('express');
const movies = require("data.json");
const axios = require("axios");
const pg = require("pg");

const app = express();


const DATABASE_URL = process.'postgres://rasha:318020@localhost:5432/movies';
const client = new pg.Client(DATABASE_URL);


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
app.post("/addMovie", addMovie);
app.get("/getMovies", getMovieHandler);

app.get("getMovie/:id", favMovieHandler);
app.put("/update/:id", updateHandler);
app.delete("/delete/:id", deleteHandler);

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




function addMovie(req, res) {
    const addmov = req.body;
    
    const sql = 'INSERT INTO movie (title,release_date ,poster_path ,overview ) VALUES($1, $2, $3, $4, $5,) RETURNING *';
    const values = [addMov.title,addmov.title,addmov.release_date,addmov.poster_path,addmov.overview]
    client.query(sql, values).then((result) => {
        return res.status(201).json(result.rows);
    }).catch((error) => {
        errorHandler(error, req, res);
    });
};

function getMovieHandler(req, res) {
    const sql = 'SELECT * FROM movie';

    client.query(sql).then((result) => {
        return res.status(200).json(result.rows);
    }).catch((error) => {
        errorHandler(error, req, res);
    });
};

function favMovieHandler(req, res) {
    let id = req.params.id;

    const sql = 'SELECT * FROM movie WHERE id=$1;';
    const values = [id];

    client.query(sql, values).then((result) => {
        return res.status(200).json(result.rows);
    }).catch((error) => {
        errorHandler(error, req, res)
    })
};


function updateHandler(req, res) {
    const id = req.params.id;
    const addmov= req.body;

    const sql = 'UPDATE movie SET title=$1,release_date=$2 ,poster_path=$3 ,overview=$4  WHERE id=$5 RETURNING *;';
    const values = [addMov.title, addmov.title, addmov.release_date, addmov.poster_path, addmov.overview, id];

    client.query(sql, values).then((result) => {
        return res.status(200).json(result.rows);
    }).catch((error) => {
        errorHandler(error, req, res);
    })

};



function deleteHandler(req, res) {
    const id = req.params.id

    const sql = 'DELETE FROM movie WHERE id=$1;';
    const values = [id];

    client.query(sql, values).then(() => {
        return res.status(204).json({})
    }).catch(error => {
        errorHandler(error, req, res);
    })
};



app.listen(3000, () => {
    console.log("Listen on 3000")
})
