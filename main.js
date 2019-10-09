require('dotenv').config()

const fs = require('fs');
const exec = require('child_process').exec;

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const app = express();

app.post('/', (req, res) => {
const data = { form: {
        token: process.env.SLACK_AUTH_TOKEN,
        channel: "#general",
    }};
request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
        // Sends welcome message
        res.json();
    });
});

app.use('/reaction_added', )

app.listen(process.env.PORT,`Listening for events on ${process.env.PORT}` )
