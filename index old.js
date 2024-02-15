document.addEventListener('DOMContentLoaded', () => {

/*
notiz
    text
    erledigt
    datum
        deleteNote(deadline){
            
        }


*/

    class Note {
        text;
        done;
        deadline;
        constructor (text, deadline){
            this.text = text;
            this.deadline = deadline;
            this.done = false;
            this.read = false;
            this.readDate = {};
        }
        isDone() {
            this.done = true;
            return this
        }
        update(text, deadline){
            this.text = text;
            this.setDeadline(deadline);
        }
        setDeadline(date){
            this.readDate = date
            return this
        }
    
    
    }
    
    class Notelist {

        title;
        htmlTemplate;
        htmlFormTemplate;
        notes;

        constructor(){
            this.notes = {}            
            this.htmlFormTemplate = `<form action="">
            <input type="text" name="noteText" id="noteText" value="{--TEXT--}" >
            <input type="datetime-local" id="deadline" name="deadline" value="{--DEADLINE--}" >
            <div class="buttons">Save todo</div>
            </form>
            `;
            this.htmlTemplate = `
            <div class="item" data-itemId="{--DEADLINE--}">
                        <div class="content">{--TEXT--}</div><div class="deadline">{--DEADLINE--}</div><div class="edit">Edit</div><div class="delete">delete</div><div class="done">done</div>
                        <div class="buttons">Buttons</div>
                    </div>
            `
        }   
        add(note){
            const { text, deadline } = note;
            const newNote = new Note(text, deadline);
            this.notes.push(newNote);
            this.updateNodes();
        }
        remove(deadline) {
            this.notes = this.notes.filter((e) => e.deadline !== deadline);

        }
        update(text, done, deadline) {
            this.text = text;
            this.done = done;
            this.deadline = deadline;
        }
        printList() {

            const output = `<div><div class="listTitle">${this.title}></div>`;
            output = output + this.notes.reduce((acc, key) => {
                acc = acc + this.htmlTemplate.replace('{--TEXT--}', this.text).replaceAll('{--DEADLINE--}', this.deadline.toDateString());
            })
            output * output + '</div>';

            const positionSelect = document.querySelector(".listeWrapper");
            positionSelect.insertAdjacentHTML(
              'afterend',
              outputHtml,
            );
          
          


/*

  let outputHtml = allKeys.reduce((acc, key) => {
    acc = acc + `<li>${key}: ${localStorage.getItem(key)}</li>`
    return acc
  }, '');


*/ 


        }
        printNote() {
            
        }

        editNote(deadline) {

            const output = this.htmlFormTemplate.replace('{--TEXT--}', this.text).replace('{--DEADLINE--}', this.deadline.toDateString());
            
            const positionSelect = document.querySelector('[data-itemId="' + this.deadline + '"]');
            positionSelect.insertAdjacentHTML(
              'afterend',
              output,
            );
                

        }
        checkDone(deadline){
            const noteToCheck = this.notes.filter((e) => e.deadline == deadline);
            noteToCheck.done = true;
            return this
        }
        saveNote() {
            
        }

    }



    let bisherigerText = 'lorem ipsum'

    // const elementHTML = `<div class="item" data-itemname>
    // <div class="content">${text}</div>
    // <div class="buttons">Buttons</div>
    // </div>`;
    // const newNoteTemplate = `<form action="">
    // <input type="text" name="noteText" id="noteText">
    // <input type="hidden" name="noteId" id="noteId">
    // <div class="content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, accusamus!</div>
    // <div class="buttons">Save todo</div>
    // </form>
    // `;

    const newNoteTemplate = `<form action="">
    <input type="text" name="noteText" id="noteText" value=${bisherigerText}>
    <input type="hidden" name="noteId" id="noteId" value="10">
    <div class="buttons">Save todo</div>
    </form>
    `;
    


    // const elementData = [id, text, date];

    
    function callFn (fnToBeCalled, args = []) {
        fnToBeCalled(...args);
    }


    const addNote = () => {


        const newNoteTemplate = `<form action="">
    <input type="text" name="noteText" id="noteText" value=${bisherigerText}>
    <input type="hidden" name="noteId" id="noteId" value="10">
    <div class="buttons">Save todo</div>
    </form>
    `;

        const positionSelect = document.querySelector(".noteList");
        positionSelect.insertAdjacentHTML(
          'afterend',
          newNoteTemplate,
        );
      
      

        const elementData = [id, text, date];  
    } 


    const addBtn = document.getElementById('addBtn');
    addBtn.addEventListener('click', () => {
        addNote();
    })


    // const buttonFnArr = {
    //     'addNote': [
    //       addNote, []
    //     ],
    //     'deleteNote': [
    //         deleteNote, 
    //         [noteId]
    //     ],
    //     'editNode': [editNode,[noteId]]
    // }

    const saveNode = (noteId) => {
        const noteText = document.querySelector('')
        const noteData = {
            noteId: [noteText, order]
        }
        localStorage.setItem(noteId, [noteText, order]);

    }  
})

/* <div class="item">
<div class="content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, accusamus!</div>
<div class="buttons">Buttons</div>
</div> */
