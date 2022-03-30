import NotesAPI from "./NotesAPI.js"; //与note相关的数据操作API
import NotesView from "./NotesView.js"; //与note有关UI渲染

export default class App {
    constructor(root) {
        this.notes = []; //所有notes
        this.activeNote = null; //当前操作的note
        this.view = new NotesView(root, this._handlers()); //UI

        this._refreshNotes(); //App实例一被创建就进行UI渲染
    }

    //一些UI控制器
    _handlers() {
        return {
            onNoteAdd: () => {
                const newNote = {
                    title: "New Note",
                    body: "Take note...",
                };

                NotesAPI.addNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => {
                NotesAPI.updateNote({
                    id: this.activeNote.id,
                    title, //相当于title: title
                    body,
                });

                this._refreshNotes();
            },
            onNoteSelect: (noteId) => {
                //debug好久OTZ noteId是string 用===习惯了 这里改成==就行
                const selectedNote = this.notes.find(
                    (note) => note.id === Number(noteId)
                );

                //console.log("selectedNote: ", selectedNote);

                this._setActiveNote(selectedNote);
            },
            onNoteDelete: (noteId) => {
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
            },
        };
    }

    //重新渲染Notes App UI
    _refreshNotes() {
        const notes = NotesAPI.getAllNotes();

        this._setNotes(notes);

        if (notes.length > 0) {
            this._setActiveNote(notes[0]); //默认设置第一个note为当前选中状态
        }
    }

    //设置Notes App初始UI渲染
    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes); //更新侧边栏UI
        this.view.updateNotePreviewVisibility(notes.length > 0); //更新右侧preview UI的可见性
    }

    //设置选中状态的note UI渲染
    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note); //更新选中状态note的UI
    }
}
