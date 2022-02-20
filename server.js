'use strict';
const express = require('express');
const movies = require("data.json");
const app = express();

function movie(original_language, original_title, poster_path, video) {
    this.original_language = original_language;
    this.original_title = original_title;
    this.poster_path = poster_path
    this.video = video;
}

app.get('/', handler);
function handler(req, res) {
    let arr = [];
    movies.data.forEach((value, index) => {
        console.log(value);
    }
        return res.status(200).json(movies.data);
}
