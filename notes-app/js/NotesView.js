export default class NoteView {
    constructor(
        root,
        { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
    ) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add" type="button">Add Note</button>
                <div class="notes__list"></div>
            </div>
            <div class="notes__preview">
                <input type="text" class="notes__title" placeholder="New note...">
                <textarea class="notes__body">Take Note</textarea>
            </div>
        `;

        const btnAddNote = this.root.querySelector(".notes__add");
        const inputTitle = this.root.querySelector(".notes__title");
        const inputBody = this.root.querySelector(".notes__body");

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        [inputTitle, inputBody].forEach((inputFiled) => {
            inputFiled.addEventListener("blur", () => {
                const updatedTitle = inputTitle.value.trim();
                const updatedBody = inputBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        //hide the note preview by default
        this.updateNotePreviewVisibility(true);
    }

    _createListItemHTML(note) {
        const MAX_BODY_LENGTH = 60;
        const { id, title, body, updated } = note;

        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${new Date(updated).toLocaleString(undefined, {
                        dateStyle: "full",
                        timeStyle: "short",
                    })}
                </div>
            </div>
        `;
    }

    //更新侧边栏的notelist的UI
    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");

        //empty list
        notesListContainer.innerHTML = "";

        //create html insert to notelist according the note data
        for (const note of notes) {
            const html = this._createListItemHTML(note);

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        //add select/delete events for each list item
        notesListContainer
            .querySelectorAll(".notes__list-item")
            .forEach((noteListItem) => {
                noteListItem.addEventListener("click", () => {
                    this.onNoteSelect(noteListItem.dataset.noteId);
                });

                noteListItem.addEventListener("dblclick", () => {
                    const doDelete = confirm("确定要删除嘛？");

                    if (doDelete) {
                        this.onNoteDelete(noteListItem.dataset.noteId);
                    }
                });
            });
    }

    //更新当前操作的note的UI
    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        //清除所有noteListItem的选中样式
        this.root
            .querySelectorAll(".notes__list-item")
            .forEach((noteListItem) => {
                noteListItem.classList.remove("notes__list-item--selected");
            });

        //为当前note添加选中样式
        this.root
            .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
            .classList.add("notes__list-item--selected");
    }

    //控制左侧preview UI的可见性
    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible
            ? "visible"
            : "hidden";
    }
}
