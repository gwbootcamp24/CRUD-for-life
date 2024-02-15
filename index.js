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

    // Event Delegation für das Löschen von Notizen
    notesList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-button")) {
            event.target.parentElement.remove();
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
});

