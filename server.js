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
  try {
    const newNote = req.body;
    newNote.id = generateUniqueId(); // Generate a unique ID for the new note
    const notes = dbUtils.readDataFromFile();
    notes.push(newNote);
    dbUtils.writeDataToFile(notes);
    res.json(newNote);
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ error: 'Failed to save the note. Please try again.' });
  }
});

// Route to handle the DELETE request for deleting a note by its ID
app.delete('/api/notes/:id', (req, res) => {
  try {
    const noteId = req.params.id;
    const notes = dbUtils.readDataFromFile();
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    dbUtils.writeDataToFile(updatedNotes);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete the note. Please try again.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Function to generate a unique ID for a new note
function generateUniqueId() {
  // A simple implementation using timestamp and random number
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 7);
  return timestamp + randomString;
}
