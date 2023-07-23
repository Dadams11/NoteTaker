// index.js

const getNotes = () => fetch('/api/notes');

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderNoteList = (notes) => {
  const noteList = document.querySelector('.list-group');
  noteList.innerHTML = '';

  notes.forEach((note) => {
    const li = createLi(note.title, note.id);
    noteList.appendChild(li);
  });
};

const handleNoteView = (noteId) => {
  const noteTitle = document.querySelector('.note-title');
  const noteText = document.querySelector('.note-textarea');

  fetch(`/api/notes/${noteId}`)
    .then((response) => response.json())
    .then((note) => {
      noteTitle.value = note.title;
      noteText.value = note.text;
    })
    .catch((error) => {
      console.error('Error fetching note:', error);
    });
};

const handleNoteSave = () => {
  const noteTitle = document.querySelector('.note-title').value;
  const noteText = document.querySelector('.note-textarea').value;

  const newNote = {
    title: noteTitle,
    text: noteText,
  };

  saveNote(newNote)
    .then(() => {
      getNotes()
        .then((response) => response.json())
        .then((notes) => {
          renderNoteList(notes);
        })
        .catch((error) => {
          console.error('Error fetching notes:', error);
        });
    })
    .catch((error) => {
      console.error('Error saving note:', error);
    });
};

const handleNoteDelete = (noteId) => {
  deleteNote(noteId)
    .then(() => {
      getNotes()
        .then((response) => response.json())
        .then((notes) => {
          renderNoteList(notes);
        })
        .catch((error) => {
          console.error('Error fetching notes:', error);
        });
    })
    .catch((error) => {
      console.error('Error deleting note:', error);
    });
};

const createLi = (text, id) => {
  const liEl = document.createElement('li');
  liEl.classList.add('list-group-item');
  liEl.dataset.noteId = id;

  const spanEl = document.createElement('span');
  spanEl.classList.add('list-item-title');
  spanEl.innerText = text;
  spanEl.addEventListener('click', () => handleNoteView(id));

  const delBtnEl = document.createElement('i');
  delBtnEl.classList.add('fas', 'fa-trash-alt', 'float-right', 'text-danger', 'delete-note');
  delBtnEl.addEventListener('click', (event) => {
    event.stopPropagation();
    handleNoteDelete(id);
  });

  liEl.append(spanEl, delBtnEl);
  return liEl;
};

const init = () => {
  getNotes()
    .then((response) => response.json())
    .then((notes) => {
      renderNoteList(notes);
    })
    .catch((error) => {
      console.error('Error fetching notes:', error);
    });

  const newNoteBtn = document.querySelector('.new-note');
  newNoteBtn.addEventListener('click', () => {
    document.querySelector('.note-title').value = '';
    document.querySelector('.note-textarea').value = '';
  });

  const saveNoteBtn = document.querySelector('.save-note');
  saveNoteBtn.addEventListener('click', handleNoteSave);
};

init();
