const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;


app.use(express.json());

app.use(express.urlencoded({extended: true }))

app.use("/static", express.static(__dirname + "/assets"))

app.use('/api/planes', require('./routes/planes'))

mongoose.connect("mongodb://localhost:27017")
    .then(() => {
        app.listen(port, () => {
             console.log(`.ppp9 ${port}`)
        })
    })

