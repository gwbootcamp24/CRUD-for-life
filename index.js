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
                        <div class="content">{--TEXT--}</div><div class="deadline">{--DEADLINE--}</div><button class="edit">Edit</button><button class="delete">delete</button><button class="done">done</button>
                    </div>
            `
        }   
        add(note){
            const { text, deadline } = note;
            const newNote = new Note(text, deadline);
            this.notes.push(newNote);
            this.updateNodes();
        }
        updateNodes() {
            this.sortNotes();
        }
        remove(domNote) {
            const itemId = domNote.dataset.item_id;
            this.notes = this.notes.find((e) => e.deadline !== itemId);
            domNote.remove();

        }
        update(text, done, deadline) {
            this.text = text;
            this.done = done;
            this.deadline = deadline;
        }
        printList() {

            let output = `<div><div class="listTitle">${this.title}</div>`;
            output = output + this.notes.reduce((acc, key) => {
                acc = acc + this.htmlTemplate.replace('{--TEXT--}', key.text).replaceAll('{--DEADLINE--}', key.deadline);
                return acc;
            })
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
        }
        insertNote(DOMPosition) {
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

                

        }
        checkDone(deadline){
            const noteToCheck = this.notes.find((e) => e.deadline === deadline);
            noteToCheck.done = true;
            return this
        }
        
        saveNote(domNote) {
            const itemId = domNote.dataset.item_id;
            const noteToBeSaved = this.notes.find((e) => e.deadline === itemId);
            const date = domNote.querySelector('input[name="deadline"]');
            const text = domNote.querySelector('.noteText');
            const addedTime = new Date().toISOString().substring(10);
            const newDeadline = date.value + addedTime
            noteToBeSaved.setDeadline(newDeadline)
            noteToBeSaved.setText(text);

            let output = this.htmlTemplate.replace('{--TEXT--}', text.value).replaceAll('{--DEADLINE--}', newDeadline);
            console.log(output);
            
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
                const domNote = e.target.closest('.item')
                if (!btn) return;
                const buttonClass = btn.classList[0];
                const itemId = domNote.dataset.item_id;
                switch (buttonClass) {
                    case 'edit': that.editNote(itemId); break;
                    case 'delete': 
                    if (confirm("Wirklich löschen?") === true) {
                        that.remove(domNote); 
                      } else {
                      }
                    break;
                    case 'save': that.saveNote(domNote); break;
                }
            }


            // const editBtns = document.querySelectorAll('button.edit');
            // const deleteBtns = document.querySelectorAll('button.delete');

            document.querySelector('.noteList').addEventListener('click', handleKeyboardKlick);



            // editBtns.forEach((btn) => {

            //     const noteId = btn.parentElement.dataset.itemid;

                
            //     btn.addEventListener('click', (event) => {
            //         event.preventDefault();
            //         this.editNote(noteId)
            //     });
            // })
            
            // deleteBtns.forEach((btn) => {

            //     const noteId = btn.parentElement.dataset.itemid;



                
            //     btn.addEventListener('click', (event) => {
            //         event.preventDefault();
            //         this.remove(noteId)
            //     });
            // })
            



                // const buttonFnArr = {
                //     'delete': [this.remove, [noteId]
                //     ],
                //     'edit': [this.editNote,[noteId]],
                //     'done': [this.checkDone,[noteId]]
                // }


                // const buttonFnArr = {
                //     'delete': [this.remove, [noteId]
                //     ],
                //     'edit': [this.editNote,[noteId]],
                //     'done': [this.checkDone,[noteId]]
                // }


            
            // const allBtns = document.querySelectorAll('button:not(.addBtn)');

            // allBtns.forEach((btn) => {
            //     const noteId = btn.parentElement.dataset.item_id;
            //     const buttonFnArr = {
            //         'delete': [this.remove, [noteId]
            //         ],
            //         'edit': [this.editNote,[noteId]],
            //         'done': [this.checkDone,[noteId]]
            //       }
    

            //   btn.addEventListener('click', (event) => {
            //     event.preventDefault();
            //     const fnToCall = buttonFnArr[btn.classList.item(0)][0];
            //     callFn(fnToCall, buttonFnArr[btn.classList.item(0)][1]);
            //   });
            // })
        

        }

    }


      



    
 
    // const allBtns = document.querySelectorAll('button');

    // allBtns.forEach((btn) => {
    //   btn.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     const fnToCall = buttonFnArr[btn.classList.item(0)][0];
    //     callFn(fnToCall, buttonFnArr[btn.classList.item(0)][1]);
    //   });
    // })


    // const saveNode = (noteId) => {
    //     const noteText = document.querySelector('')
    //     const noteData = {
    //         noteId: [noteText, order]
    //     }
    //     localStorage.setItem(noteId, [noteText, order]);

    // }  

    /* <div class="item">
    <div class="content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, accusamus!</div>
    <div class="buttons">Buttons</div>
    </div> */

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
