//与note相关的数据操作API
export default class NotesAPI {
    //get all notes
    static getAllNotes() {
        //notes从localStorage中key为notesapp-notes的字段中获取 若无此字段 则返回空数组
        const notes = JSON.parse(
            localStorage.getItem("notesapp-notes") || "[]"
        );

        return notes.sort((a, b) => {
            //
            //返回根据updated排序后的notes 更新时间最近的在前
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    //add a new note
    static addNote(noteToAdd) {
        const notes = NotesAPI.getAllNotes();
        //保证id的唯一性 每次的id取当前notes中最大的id+1
        const maxIdNote = [...notes].sort((a, b) => {
            return a.id > b.id ? -1 : 1;
        })[0];

        //为新创建的note添加id 添加updated
        noteToAdd.id = maxIdNote ? maxIdNote.id + 1 : 0;
        noteToAdd.updated = new Date().toISOString();
        notes.push(noteToAdd);

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    //update note by id from noteInfo
    //noteInfo: id, title, body
    static updateNote(noteInfo) {
        const notes = NotesAPI.getAllNotes();
        const noteToUpdate = notes.find((note) => note.id === noteInfo.id);

        noteToUpdate.title = noteInfo.title;
        noteToUpdate.body = noteInfo.body;
        noteToUpdate.updated = new Date().toISOString();

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    //delete note by id
    static deleteNote(id) {
        const notes = NotesAPI.getAllNotes();
        //在一个坑里面掉两次也是够了... id依旧是string...
        const newNotes = notes.filter((note) => note.id !== Number(id));

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}
