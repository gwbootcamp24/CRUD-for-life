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
            this.notes = []         
            this.htmlFormTemplate = `<form action="">
            <input type="text" name="noteText" id="noteText" value="{--TEXT--}" >
            <input type="datetime-local" id="deadline" name="deadline" value="{--DEADLINE--}" >
            <div class="buttons">Save todo</div>
            </form>
            `;
            this.htmlTemplate = `
            <div class="item" data-itemId="{--DEADLINE--}">
                        <div class="content">{--TEXT--}</div><div class="deadline">{--DEADLINE--}</div><button class="edit">Edit</button><button class="delete">delete</button><button class="done">done</button><button class="done">Save Note</button>
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
        remove(deadline) {
            this.notes = this.notes.find((e) => e.deadline !== deadline);

        }
        update(text, done, deadline) {
            this.text = text;
            this.done = done;
            this.deadline = deadline;
        }
        printList() {

            let output = `<div><div class="listTitle">${this.title}></div>`;
            output = output + this.notes.reduce((acc, key) => {
                // console.log(acc);
                acc = acc + this.htmlTemplate.replace('{--TEXT--}', key.text).replaceAll('{--DEADLINE--}', key.deadline);
                return acc;
            })
            output * output + '</div>';
            const positionSelect = document.querySelector(".listeWrapper");
            positionSelect.insertAdjacentHTML(
              'afterend',
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

            let output = this.htmlFormTemplate.replace('{--TEXT--}', this.text).replace('{--DEADLINE--}', this.deadline.toDateString());
            
            const positionSelect = document.querySelector('[data-itemId="' + deadline + '"]');
            positionSelect.insertAdjacentHTML(
              'afterend',
              output,
            );
                

        }
        editNote(deadline) {

            const noteEdited = this.notes.find((e) => e.deadline === deadline);
            console.log('########' + deadline);
            let output = this.htmlFormTemplate.replace('{--TEXT--}', this.text).replace('{--DEADLINE--}', this.deadline);
            
            const positionSelect = document.querySelector('[data-itemId="' + deadline + '"]');
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
        saveNote() {
            
        }
        connectEventListeners(){

            function callFn (fnToBeCalled, args = []) {
                fnToBeCalled(...args);
            }
        
               
            const editBtns = document.querySelectorAll('button.edit');


            editBtns.forEach((btn) => {
                console.log(btn);
                const noteId = btn.parentElement.dataset.itemid;
                console.log(btn.parentElement.dataset);
                console.log(noteId);

                const buttonFnArr = {
                    'delete': [this.remove, [noteId]
                    ],
                    'edit': [this.editNote,['Dirk Documentorerer']],
                    'done': [this.checkDone,[noteId]]
                }
                btn.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.editNote('Dirk Documentorerer')
                });
            })
            
            // const allBtns = document.querySelectorAll('button:not(.addBtn)');
            // console.log(allBtns);

            // allBtns.forEach((btn) => {
            //     console.log(btn);
            //     const noteId = btn.parentElement.dataset.itemId;
            //     const buttonFnArr = {
            //         'delete': [this.remove, [noteId]
            //         ],
            //         'edit': [this.editNote,[noteId]],
            //         'done': [this.checkDone,[noteId]]
            //       }
    

            //   btn.addEventListener('click', (event) => {
            //     event.preventDefault();
            //     const fnToCall = buttonFnArr[btn.classList.item(0)][0];
            //     console.log(fnToCall);
            //     callFn(fnToCall, buttonFnArr[btn.classList.item(0)][1]);
            //   });
            // })
        

        }

    }


      



    
 
    const allBtns = document.querySelectorAll('button');

    allBtns.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        const fnToCall = buttonFnArr[btn.classList.item(0)][0];
        callFn(fnToCall, buttonFnArr[btn.classList.item(0)][1]);
      });
    })


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

    const myNotesToBeStores =   [
    {
        text: "vulture of the stars",
        done: false, 
        deadline: 'Nick Names'
    },
    {
        text: "builders of earth",
        done: false, 
        deadline: 'Dirk Documentorerer'
    },
    {
        text: "bakers without duty",
        done: false, 
        deadline: 'Cern Regulator'
    },
    {
        text: "couriers and foreigners",
        done: false, 
        deadline: 'Nick Names'
    },
    {
        text: "medics and strangers",
        done: false, 
        deadline: 'Nick Names'
    },
    {
        text: "accidents without desire",
        done: false, 
        deadline: 'Nick Names'
    },
    {
        text: "lord of the sea",
        done: false, 
        deadline: 'Nick Names'
    } 
    ]

    const myNoteList = new Notelist();

    myNotesToBeStores.forEach((note) =>{
        myNoteList.add(note);

    })      

// console.log(myNoteList)
myNoteList.printList();

myNoteList.connectEventListeners();

})
