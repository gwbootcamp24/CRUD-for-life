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
            this.done = false;
            this.deadline = deadline;
        }
        isDone() {
            this.done = true;
            return this
        }
        update(text, deadline){
            this.text = text;
            this.setDeadline(deadline);
            return this
        }
        setText(text){
            this.text = text
            return this
        }
        setDeadline(date){
            this.deadline = date
            return this
        }
    
    
    }
    
    class Notelist {

        title;
        htmlTemplate;
        htmlFormTemplate;
        notes;

        constructor(){
            this.title = 'Meine Todo-Liste'        
            this.notes = []         
    
            this.htmlFormTemplate = `<div class="item" data-item_id="{--DEADLINE--}">
            <input type="text" name="noteText" class="noteText" value="{--TEXT--}" >
            <input type="date" class="deadline" name="deadline" value="{--DEADLINEINPUT--}" >
            <button class="save">Save todo</button>
            </div>
            `;
            this.htmlTemplate = `
            <div class="item" data-item_id="{--DEADLINE--}">
                        <div class="content">{--TEXT--}</div><div class="deadline">{--DEADLINE--}</div><button class="edit">Edit</button><button class="delete">delete</button><button class="done">{--DONESTATUS--}</button>
                    </div>
            `
            // {--DONESTATUS--}
        }   
        add(noteData){
            const { text, deadline } = noteData;
            const newNote = new Note(text, deadline);
            this.notes.push(newNote);
            this.updateNodes();
            return newNote;
        }
        updateNodes() {
            this.sortNotes();
        }
        update(text, done, deadline) {
            this.text = text;
            this.done = done;
            this.deadline = deadline;
        }
        printList() {

            let output = `<div><br><h1>${this.title}</h1> <button class="addBtn" id="addBtn" style="font-size: 36px;">+</button></div><div class="listTitle"></div>`;
            output = output + this.notes.reduce((acc, key) => {
                acc = acc + this.htmlTemplate.replace('{--TEXT--}', key.text).replaceAll('{--DEADLINE--}', key.deadline).replaceAll('{--DONESTATUS--}', key.done === true ? 'already Done': 'not yet done');
                return acc;
            }, '')
            output * output + '</div>';
            const positionSelect = document.querySelector(".noteList");
            positionSelect.insertAdjacentHTML(
              'beforeend',
              output,
            );

        }
        printNote() {
        }
        sortNotes(){
            this.notes.sort((a, b) => a.deadline - b.deadline);
        }

        newEditNote(deadline) {

            const noteEdited = this.notes.find((e) => e.deadline === deadline);

            const newDeadline = new Date().toISOString();

            let output = this.htmlFormTemplate.replace('{--TEXT--}', '').replaceAll('{--DEADLINE--}', newDeadline).replaceAll('{--DEADLINEINPUT--}', newDeadline.substring(0, 10));
            
            const positionSelect = document.querySelector('.listTitle');
            positionSelect.insertAdjacentHTML(
              'afterend',
              output,
            );



        }
        editNote(deadline) {


            const noteEdited = this.notes.find((e) => e.deadline === deadline);

            // // const input = document.querySelector('input')
            // const dt = new Date(2021, 1, 1);
            // const day = ("0" + dt.getDate()).slice(-2);
            // const month = ("0" + (dt.getMonth() + 1)).slice(-2);
            // const date = dt.getFullYear() + "-" + month + "-" + day;
            // // input.value = date

            let output = this.htmlFormTemplate.replace('{--TEXT--}', noteEdited.text).replaceAll('{--DEADLINE--}', noteEdited.deadline).replaceAll('{--DEADLINEINPUT--}', noteEdited.deadline.substring(0, 10));
            
            const positionSelect = document.querySelector('[data-item_id="' + deadline + '"]');
            positionSelect.insertAdjacentHTML(
              'afterend',
              output,
            );

            positionSelect.remove();
                


        }
        remove(domNote) {
            const itemId = domNote.dataset.item_id;
            this.notes = this.notes.filter((e) => e.deadline !== itemId);
            domNote.remove();

        }
        checkDone(domNote){
            const itemId = domNote.dataset.item_id;
            const noteToCheck = this.notes.find((e) => e.deadline === itemId);
            noteToCheck.done = true;
            const buttonCheck = domNote.querySelector('.done')
            buttonCheck.innerHTML = 'Done';
            return this
        }
        
        saveNote(domNote) {
            const itemId = domNote.dataset.item_id;
            let noteToBeSaved = this.notes.find((e) => e.deadline === itemId);
            const date = domNote.querySelector('input[name="deadline"]');
            const text = domNote.querySelector('.noteText');
            const addedTime = new Date().toISOString().substring(10);
            const newDeadline = date.value + addedTime
            if (!noteToBeSaved) {
                noteToBeSaved = new Note();
                this.notes.push(noteToBeSaved);

            }
            noteToBeSaved.setDeadline(newDeadline)
            noteToBeSaved.setText(text.value);

            console.log(this)

            let output = this.htmlTemplate.replace('{--TEXT--}', text.value).replaceAll('{--DEADLINE--}', newDeadline).replaceAll('{--DONESTATUS--}', noteToBeSaved.done === true ? 'already Done': 'not yet done');
            
            domNote.insertAdjacentHTML(
                "beforebegin",
                output,
            );

            domNote.remove();



            
        }
        connectEventListeners(){


            // function callFn (fnToBeCalled, args = []) {
            //     fnToBeCalled(...args);
            // }

            const that = this;
            function handleKeyboardKlick(e){
                // if (exitCond) return;
                const btn = e.target.closest("button");
                if (!btn) return;
                const buttonClass = btn.classList[0];
                const domNote = e.target.closest('.item')
                let itemId
                if (domNote !== null) {
                    itemId = domNote.dataset.item_id;
                }
                switch (buttonClass) {
                    case 'edit': that.editNote(itemId); break;
                    case 'delete': 
                    if (confirm("Wirklich löschen?") === true) {
                        that.remove(domNote); 
                      } else {
                      }
                    break;
                    case 'done':
                        if (confirm("Wirklich schon erledigt? :-)") === true) {
                            that.checkDone(domNote); 
                            btn.classList = 'reallyDone';
                          } else {
                          }
    
                    case 'save': that.saveNote(domNote); break;
                    case 'addBtn': that.newEditNote(); break;
                }
            }


            // const editBtns = document.querySelectorAll('button.edit');
            // const deleteBtns = document.querySelectorAll('button.delete');

            document.querySelector('.listeWrapper').addEventListener('click', handleKeyboardKlick);



        

        }

    }


      



    

    // 2011-10-05T14:48:00.000Z

    const myNotesToBeStores =   [
    {
        text: "vulture of the stars",
        done: false, 
        deadline: '2024-02-17T12:12:12.123Z'
    },
    {
        text: "builders of earth",
        done: false, 
        deadline: '2024-02-22T12:12:12.523Z'
    },
    {
        text: "bakers without duty",
        done: false, 
        deadline: '2024-02-17T12:12:12.143Z'
    },
    {
        text: "couriers and foreigners",
        done: false, 
        deadline: '2024-03-17T12:12:12.123Z'
    },
    {
        text: "medics and strangers",
        done: false, 
        deadline: '2024-02-17T12:12:12.124Z'
    },
    {
        text: "accidents without desire",
        done: false, 
        deadline: '2024-02-17T12:02:12.1234Z'
    },
    {
        text: "lord of the sea",
        done: false, 
        deadline: '2024-02-27T12:12:12.144Z'
    } 
    ]

    const myNoteList = new Notelist();

    myNotesToBeStores.forEach((note) =>{
        myNoteList.add(note);

    })      

myNoteList.printList();

myNoteList.connectEventListeners();

})
