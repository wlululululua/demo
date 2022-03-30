//test NotesView
import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

const app = document.getElementById("app");
const view = new NotesView(app, {
    onNoteAdd() {
        console.log("Let's add a note!");
    },

    onNoteEdit(newTitle, newBody) {
        console.log("edit title: ", newTitle);
        console.log("edit body: ", newBody);
    },

    onNoteSelect(id) {
        console.log("note selected: " + id);
    },

    onNoteDelete(id) {
        console.log("note deleted: " + id);
    },
});

const notes = NotesAPI.getAllNotes();
view.updateNoteList(notes);
view.updateActiveNote(notes[0]);
