const validWords = new Set([...wordles, ...nonwordles]);
const answer = wordles[Math.floor(Math.random()*wordles.length)];
const allowedLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let colours = ["#3A3A3C", "#538D4E", "#B59F3B"];
let NotIn, CorrectSpot, WrongSpot;
let IdNotIn, IdCorrectSpot, IdWrongSpot;
IdNotIn = Math.floor(Math.random()*colours.length);
NotIn = colours[IdNotIn];
colours.splice(IdNotIn, 1);

IdCorrectSpot = Math.floor(Math.random()*colours.length);
CorrectSpot = colours[IdCorrectSpot];
colours.splice(IdCorrectSpot, 1);

IdWrongSpot = Math.floor(Math.random()*colours.length);
WrongSpot = colours[IdWrongSpot];

let colourEmojis = {
    NotIn: "⬛",
    CorrectSpot: "🟩",
    WrongSpot: "🟨"
}
let attempt = 1;
let focused = 0;
let result = [];
let winmessages = ['Genius', 'Magnificent', 'Impressive', 'Splendid', 'Great', 'Phew'];

const inputs = document.getElementsByClassName("inputs");
const allKeys = document.getElementsByClassName("allKeys");
const winplayagain = document.getElementById("winplayagain");
const loseplayagain = document.getElementById("loseplayagain");
const winshare = document.getElementById("winshare");
const giveup = document.getElementById("giveup");
const helpbutton = document.getElementById("helpbutton");
const closehelp = document.getElementById("closehelp");

inputs[0].focus();

function isValid(word) {
    return validWords.has(word.toLowerCase());
}
function SendMessage(message) {
    const allmessages = document.getElementById("allmessages");
    allmessages.innerHTML = '<div><p>' + message + '</p></div>' + allmessages.innerHTML;
    setTimeout(()=>{
        allmessages.innerHTML = allmessages.innerHTML.replace('<div><p>' + message + '</p></div>', '');
    }, 5000);
}
function ProcessWord(word) {
    let response = [0, 0, 0, 0, 0];
    for (let i = 0; i < 5; i++) {
        if (word[i] === answer[i]) {
            response[i] = CorrectSpot;
        }
        else if (answer.includes(word[i])) {
            response[i] = WrongSpot;
        }
        else {
            response[i] = NotIn;
        }
    }
    for (let i = (attempt-1)*5; i < attempt*5; i++) {
        inputs[i].style.backgroundColor = response[i-(attempt-1)*5];
    }
    attempt++;

    let CorrectAnswer = true;
    for (let i = 0; i < 5; i++) {
        if (response[i] != CorrectSpot) {
            CorrectAnswer = false;
            break;
        }
    }
    result.push(response);
    return CorrectAnswer;
}
function EndGame(win) {
    if (win) {
        const wingame = document.getElementById("wingame");
        const winattempts = document.getElementById("winattempts");

        attempt--;
        if (attempt == 1) {
            winattempts.textContent = attempt + " attempt";
        }
        else {
            winattempts.textContent = attempt + " attempts";
        }
        wingame.style.display = "flex";

        SendMessage(winmessages[attempt-1]);
    }
    else {
        const losegame = document.getElementById("losegame");
        const loseword = document.getElementById("loseword");
        loseword.textContent = answer.toUpperCase();
        losegame.style.display = "flex";
    }
}
function changeInput(letter) {
    if (letter.length == 1) {
        inputs[focused].value = letter;
        if (focused%5 !== 4) {
            focused++;
            inputs[focused].focus();
        }
        else {
            inputs[focused].focus();
        }
    }
    else if (letter == 'Backspace') {
        let goBack = false;
        if (focused%5 !== 0 && inputs[focused].value.length == 0) {
            goBack = true;
        }
        inputs[focused].value = '';

        if (goBack) {
            focused--;
            inputs[focused].focus();
        }
        else {
            inputs[focused].focus();
        }
    }
    else if (letter == 'ArrowLeft') {
        if (focused%5 !== 0) {
            focused--;
            inputs[focused].focus();
        }
        else {
            inputs[focused].focus();
        }
    }
    else if (letter == 'ArrowRight') {
        if (focused%5 !== 4) {
            focused++;
            inputs[focused].focus();
        }
        else {
            inputs[focused].focus();
        }
    }
    else if (letter == 'Enter') {
        let word = '';
        let i = focused;
        for (let j = i-i%5; j < 5*Math.ceil(i/5); j++) {
            word += inputs[j].value;
        }
        if (word.length < 5) {
            SendMessage("Not enough letters");
        }
        else {
            if (!isValid(word)) {
                SendMessage("Not a valid word");
            }
            else {
                let CorrectAnswer = ProcessWord(word);
                if (CorrectAnswer) {
                    EndGame(true);
                }
                else {
                    if (i+1 < inputs.length) {
                        focused = 5*Math.ceil(focused/5);
                        inputs[focused].focus();
                    }
                    else {
                        EndGame(false);
                    }
                }
            }
        }
    }
}

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keydown", (event)=>{
        event.preventDefault();
        if (allowedLetters.includes(event.key) || event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key == 'Enter') {
            changeInput(event.key);
        }
    });

    inputs[i].addEventListener("mousedown", (event)=>{
        if (i !== focused) {
            event.preventDefault();
        }
    });
}

for (let i = 0; i < allKeys.length; i++) {
    allKeys[i].addEventListener("click", ()=>{
        changeInput(allKeys[i].id.slice(3));
    });
}

winplayagain.addEventListener("click", ()=>{
    window.location.reload();
});
loseplayagain.addEventListener("click", ()=>{
    window.location.reload();
});

function reversecolour(colour) {
    if (NotIn == colour) return "NotIn";
    if (CorrectSpot == colour) return "CorrectSpot";
    if (WrongSpot == colour) return "WrongSpot";
}
winshare.addEventListener("click", ()=>{
    let copy = "Clordle\n";
    for (const Result of result) {
        for (const colour of Result) {
            copy += colourEmojis[reversecolour(colour)];
        }
        copy += "\n";
    }
    copy += "Play at https://swisstea4.github.io/clordle";
    navigator.clipboard.writeText(copy);
    SendMessage("Copied to clipboard");
});
loseshare.addEventListener("click", ()=>{
    let copy = "Clordle\n";
    for (const Result of result) {
        for (const colour of Result) {
            copy += colourEmojis[reversecolour(colour)];
        }
        copy += "\n";
    }
    copy += "Play at https://swisstea4.github.io/clordle";
    navigator.clipboard.writeText(copy);
    SendMessage("Copied to clipboard");
});

giveup.addEventListener("click", ()=>{
    EndGame(false); 
});

helpbutton.addEventListener("click", ()=>{
    const help = document.getElementById("help");
    if (help.style.display == "none") {
        help.style.display = "flex";
    }
    else {
        help.style.display = "none";
    }
});
closehelp.addEventListener("click", ()=>{
    const help = document.getElementById("help");
    help.style.display = "none";
})