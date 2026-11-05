const validWords = new Set([...wordles, ...nonwordles]);
const answer = wordles[Math.floor(Math.random()*wordles.length)];
let NotIn = "#3A3A3C";
let CorrectSpot = "#538D4E";
let WrongSpot = "#B59F3B";
function isValid(word) {
    return validWords.has(word.toLowerCase());
}
const inputs = document.getElementsByClassName("inputs");
const allowedLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
function ThrowError(error) {
    const allerrors = document.getElementById("allerrors");
    allerrors.innerHTML = '<div><p>' + error + '</p></div>' + allerrors.innerHTML;
    setTimeout(()=>{
        allerrors.innerHTML = allerrors.innerHTML.replace('<div><p>' + error + '</p></div>', '');
    }, 5000);
}
function ProcessWord(attempt, word) {
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
}
for (let i = 0; i < inputs.length; i++) {
    if (i%5 != 4) {
        inputs[i].addEventListener("input", ()=>{
            if (allowedLetters.includes(inputs[i].value)) {
                inputs[i+1].focus();
            }
        });
        inputs[i].addEventListener("keydown", (event)=>{
            if (event.key == 'ArrowRight') {
                inputs[i+1].focus();
            }
        });
    }

    if (i%5 != 0) {
        let inputFired = false;
        inputs[i].addEventListener("input", ()=>{
            inputFired = true;
        });
        inputs[i].addEventListener("keyup", (event)=>{
            if (event.key == 'Backspace' && !inputFired) {
                inputs[i-1].focus();
            }
            if (inputFired) {
                inputFired = false;
            }
        });

        inputs[i].addEventListener("keyup", (event)=>{
            if (event.key == 'ArrowLeft') {
                inputs[i-1].focus();
            }
        });
    }

    if (i < 29) {
        inputs[i].addEventListener("keydown", (event)=>{
            if (event.key == 'Enter') {
                let word = '';
                for (let j = i-i%5; j < 5*Math.ceil(i/5); j++) {
                    word += inputs[j].value;
                }
                if (word.length < 5) {
                    ThrowError("Not enough letters");
                }
                else {
                    if (!isValid(word)) {
                        ThrowError("Not a valid word");
                    }
                    else {
                        ProcessWord(Math.floor(i/5)+1, word);
                        inputs[i+1].focus();
                    }
                }
            }
        });
    }
}