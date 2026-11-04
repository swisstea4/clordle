const validWords = new Set([...wordles, ...nonwordles]);
function isValid(word) {
    return validWords.has(word.toLowerCase());
}
const inputs = document.getElementsByClassName("inputs");
const allowedLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
for (let i = 0; i < inputs.length; i++) {
    if (i%5 != 4) {
        inputs[i].addEventListener("keyup", (event)=>{
            if (allowedLetters.includes(event.key)) {
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
        inputs[i].addEventListener("keyup", (event)=>{
            if (event.key == 'Backspace') {
                inputs[i-1].focus();
            }
        });
        inputs[i].addEventListener("keyup", (event)=>{
            if (event.key == 'ArrowLeft') {
                inputs[i-1].focus();
            }
        });
    }

    if (i%5 == 4 && i < 29) {
        inputs[i].addEventListener("keydown", (event)=>{
            if (event.key == 'Enter') {
                let word = '';
                for (let j = i-4; j <= i; j++) {
                    word += inputs[j].value;
                }
                console.log(word);
                if (word.length < 5) {
                    ThrowError("Not enough letters");
                }
                else {
                    if (!isValid(word)) {
                        ThrowError("Not a valid word");
                    }
                    else {
                        inputs[i+1].focus();
                    }
                }
            }
        });
    }
}