// Create web server
// Create a web server that listens to incoming requests and responds with a JSON object containing the comments array. The comments array should have at least 3 comments.
// The server should respond to the following routes:
// GET /comments - responds with the comments array
// POST /comments - adds a new comment to the comments array
// PUT /comments - updates the comments array
// DELETE /comments - resets the comments array

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');

// handle request
app.get('/comments', (req, res) => {
    // Read comments from file
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const comments = JSON.parse(data);
        res.json(comments);
    });
});

app.post('/comments', (req, res) => {
    // Read comments from file
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const comments = JSON.parse(data);
        const newComment = req.body;
        comments.push(newComment);
        // Write comments to file
        fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.sendStatus(201);
        });
    });
});

app.put('/comments', (req, res) => {
    // Read comments from file
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const comments = JSON.parse(data);
        const updatedComments = req.body;
        // Update comments array
        comments.splice(0, comments.length, ...updatedComments);
        // Write comments to file
        fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.sendStatus(200);
        });
    });
});

app.delete('/comments', (req, res) => {
    const comments = [];
    // Write empty comments array to file
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.sendStatus(200);
    });
});