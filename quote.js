const twitterUrl = "https://twitter.com/intent/tweet/";
const linkTarget = '_Top';
const windowOptions = 'menubar=no,status=no,height=750,width=500';

const quoteContent = document.querySelector(".quote");
const author = document.querySelector(".author .name"); 
const copyBtn = document.querySelector(".copyBtn");
const twitterBtn = document.querySelector(".twitterBtn");
const createNoteBtn = document.querySelector(".createNoteBtn");
const notesContainer = document.querySelector(".notes-container");
const speech=document.querySelector(".speech");


//shwoing saved notes 

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes")
}

showNotes()

function quoteWithAuthor() {
    content = quoteContent.innerText + "_____By "
    complete_quote = content.concat(author.innerText)
    return complete_quote
}

async function changeQuote() {
    try {
        const res = await fetch("https://api.quotable.io/random");
        const data = await res.json();
        quoteContent.innerHTML = data.content;
        author.innerHTML = data.author;

    } catch (error) {
        console.error("An error occurred while fetching the quote:", error);
        
    }
}

changeQuote();

copyBtn.addEventListener("click", () => {
    quoteInfo = quoteWithAuthor()
    navigator.clipboard.writeText(quoteInfo)
})

twitterBtn.addEventListener("click", () => {
    const twitterQuery = `text=${quoteWithAuthor()}`
    window.open(`${twitterUrl}?${twitterQuery}&`, linkTarget, windowOptions);
})


createNoteBtn.addEventListener("click", () => {
    let inputbox=document.createElement("div");
    let btn = document.createElement("button");
    btn.innerText = "Delete"
    inputbox.className="input-box";
    inputbox.setAttribute("contenteditable","true");
    inputbox.setAttribute("spellcheck","false");
    btn.className = "deleteBtn"
    // Insert the new note above the first child of notesContainer
    notesContainer.appendChild(inputbox);
    notesContainer.appendChild(btn);

    updateStorge()
})

notesContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "DIV"){
        notes = document.querySelectorAll(".input-box")
        notes.forEach(nt => {
            nt.onkeyup = function() {
                updateStorge()
            }
        });
    
    }
    if (e.target.classList.contains("deleteBtn")) {
        e.target.previousSibling.remove(); // Remove the inputbox
        e.target.remove(); // Remove the delete button
        updateStorge();
    }
})

// Saving notes in Local storge 

function updateStorge(){
    localStorage.setItem("notes", notesContainer.innerHTML)
}


speech.addEventListener("click",()=>{
    alert("coming soon😊")
})