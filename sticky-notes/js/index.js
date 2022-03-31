const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

//create html according to notes data from localStorage
getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

//add click event handler to add-note button
addNoteButton.addEventListener("click", addNote);

//get data from localStorage by key-"stickynotes-notes"
function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const doDelete = confirm(
            "Are you sure you wish to delete this sticky note? "
        );

        if (doDelete) {
            deleteNote(id, element);
        }
    });

    return element;
}

function addNote() {
    const notes = getNotes();
    const maxIdNote = [...notes].sort((a, b) => (a.id > b.id ? -1 : 1))[0];
    const noteObject = {
        id: maxIdNote ? maxIdNote.id + 1 : 0,
        content: "",
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);

    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.find((note) => note.id == id);

    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id !== id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}
