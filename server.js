// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dbUtils = require('./dbUtils');
const path = require('path');

// Middleware to parse JSON data
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle the GET request for retrieving all saved notes
app.get('/notes', (req, res) => {
  const notes = dbUtils.readDataFromFile();
  res.json(notes);
});

// Route to handle the POST request for saving a new note
app.post('/api/notes', (req, res) => {
  // ... (code to save a new note to db.json and respond with the saved note) ...
});

// Route to handle the DELETE request for deleting a note by its ID
app.delete('/api/notes/:id', (req, res) => {
  // ... (code to delete a note by ID from db.json and respond with the updated list of notes) ...
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
