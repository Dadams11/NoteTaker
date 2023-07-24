// Function to fetch the notes from the server
const fetchNotes = async () => {
  try {
    const response = await fetch('/notes');
    const notes = await response.json();
    return notes;
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
};

// Function to render the list of note titles in the left-hand column
const renderNoteList = async () => {
  const notes = await fetchNotes();
  const noteListContainer = document.querySelector('.list-group');
  noteListContainer.innerHTML = ''; // Clear existing list

  if (notes.length === 0) {
    const noNotesItem = document.createElement('li');
    noNotesItem.textContent = 'No saved Notes';
    noNotesItem.classList.add('list-group-item');
    noteListContainer.appendChild(noNotesItem);
  } else {
    notes.forEach((note) => {
      const listItem = document.createElement('li');
      listItem.textContent = note.title;
      listItem.classList.add('list-group-item');
      listItem.dataset.note = JSON.stringify(note);
      listItem.addEventListener('click', handleNoteView);
      noteListContainer.appendChild(listItem);
    });
  }
};

// Function to save a new note to the server
const saveNote = async (note) => {
  try {
    // Generate a unique ID for the new note on the client-side
    note.id = generateUniqueId();
    
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error('Failed to save the note. Please try again.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving note:', error);
    throw error;
  }
};

// Function to generate a unique ID for a new note on the client-side
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// ... (other existing functions, if any) ...

// Event listener for the "Save Note" icon
document.querySelector('.save-note').addEventListener('click', async () => {
  const title = document.querySelector('.note-title').value;
  const text = document.querySelector('.note-textarea').value;
  const newNote = { title, text };

  try {
    const savedNote = await saveNote(newNote);
    activeNote = savedNote;
    renderActiveNote();
    await renderNoteList(); // Refresh the note list after saving
  } catch (error) {
    alert(error.message);
  }
});

// Call the renderNoteList function to display notes when the page loads
renderNoteList();
