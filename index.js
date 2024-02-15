document.addEventListener("DOMContentLoaded", function() {
    const header = document.getElementById("header");
    const notesList = document.getElementById("notes");
    const newNoteInput = document.getElementById("new-note");
    const addButton = document.getElementById("add-button");

    // Funktion zum Hinzufügen einer neuen Notiz
    function addNote() {
        const noteText = newNoteInput.value;
        if (noteText.trim() === "") return; // Leerzeichen am Anfang und Ende entfernen
        const newNote = document.createElement("li");
        newNote.innerHTML = `
            <input type="checkbox">
            <span>${noteText}</span>
            <button class="edit-button"></button>
            <button class="delete-button"></button>
        `;
        notesList.appendChild(newNote);
        newNoteInput.value = ""; // Eingabefeld leeren
    }

    // Eventlistener für den Button zum Hinzufügen einer Notiz
    addButton.addEventListener("click", addNote);

    // Eventlistener für das Drücken der Enter-Taste im Eingabefeld
    newNoteInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addNote();
        }
    });

    // Event Delegation für das Bearbeiten und Löschen von Notizen
    notesList.addEventListener("click", function(event) {
        const target = event.target;
        if (target.classList.contains("edit-button")) {
            const noteText = target.previousElementSibling;
            const newText = prompt("Edit note:", noteText.textContent);
            if (newText !== null) {
                noteText.textContent = newText;
            }
        } else if (target.classList.contains("delete-button")) {
            target.parentElement.remove();
        }
    });

    // Event Delegation für das Abhaken von Notizen
    notesList.addEventListener("change", function(event) {
        if (event.target.type === "checkbox") {
            const noteText = event.target.nextElementSibling;
            if (event.target.checked) {
                noteText.style.textDecoration = "line-through";
            } else {
                noteText.style.textDecoration = "none";
            }
        }
    });

    // Funktion zum Speichern der Notizen
    function saveNotes() {
        const notes = [];
        notesList.querySelectorAll("li span").forEach(note => {
            notes.push(note.textContent);
        });
        // Notizen speichern, z.B. in localStorage
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    // Button zum Speichern hinzufügen und ihn mit einem Eventlistener verknüpfen
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Notes";
    saveButton.addEventListener("click",);
    document.body.appendChild(saveButton);
});