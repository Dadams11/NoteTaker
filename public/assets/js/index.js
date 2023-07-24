// Function to save a new note to the server
const saveNote = async (note) => {
  try {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error('Failed to save note.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving note:', error);
    return null;
  }
};

// Function to handle the click on the "Save" button
const handleSaveNote = async (e) => {
  e.preventDefault();
  const title = document.querySelector('.note-title').value;
  const text = document.querySelector('.note-textarea').value;

  if (!title || !text) {
    alert('Please enter a title and text for the note.');
    return;
  }

  const newNote = { title, text };
  const savedNote = await saveNote(newNote);

  if (savedNote) {
    activeNote = savedNote;
    renderNoteList();
    renderActiveNote();
  } else {
    alert('Failed to save the note. Please try again.');
  }
};

// Add event listener to the "Save" icon
const saveNoteIcon = document.querySelector('.save-note');
saveNoteIcon.addEventListener('click', handleSaveNote);
