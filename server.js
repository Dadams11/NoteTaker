// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dbUtils = require('./dbUtils'); // Import the utility function for reading and parsing data

app.use(express.json());

// Route to handle a GET request for retrieving all saved notes
app.get('/api/notes', (req, res) => {
  const notes = dbUtils.readDataFromFile();
  res.json(notes);
});

// Route to handle a POST request for saving a new note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  // Read existing notes from the file
  const notes = dbUtils.readDataFromFile();

  // Assign a unique ID to the new note (You can use a library like `uuid` to generate a unique ID)
  newNote.id = Date.now().toString();

  // Add the new note to the existing notes
  notes.push(newNote);

  // Write the updated notes array back to the file
  fs.writeFileSync(dbFilePath, JSON.stringify(notes, null, 2), 'utf8');

  res.json(newNote);
});

// Route to handle a DELETE request for deleting a note by its ID
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  // Read existing notes from the file
  const notes = dbUtils.readDataFromFile();

  // Find the index of the note with the given ID
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex !== -1) {
    // If the note with the ID is found, remove it from the array
    const deletedNote = notes.splice(noteIndex, 1)[0];

    // Write the updated notes array back to the file
    fs.writeFileSync(dbFilePath, JSON.stringify(notes, null, 2), 'utf8');

    res.json(deletedNote);
  } else {
    res.status(404).json({ message: 'Note not found.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
