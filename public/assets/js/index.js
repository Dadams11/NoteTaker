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

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  const note = JSON.parse(e.target.dataset.note);
  activeNote = note;
  renderActiveNote();
};

// ... (existing code for handling other functions) ...

// Call the renderNoteList function to display notes when the page loads
renderNoteList();
