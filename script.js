let hiddenWord = "";

async function getRandomWord() {
    try {
        const response = fetch("https://wordle-api.vercel.app/api/wordle", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        const data = await response.json();
        hiddenWord = data.word.toLowerCase();
        updateWordDisplay();
    } catch (error) {
        console.error('Error fetching word:', error);
    }
}

function updateWordDisplay(){
    const displayWordElement = document.getElementById("wordDisplay")
    displayWordElement.textContent = hiddenWord.replace(/./g, "*");
}

function submitGuess(){
    const submitBtn = document.getElementById("submitBtn")
    const userGuess = submitBtn.Value.toLowerCase()

    if(userGuess.length === hiddenWord.length){
        let result = ""

        for(let i = 0 ; i < hiddenWord.length; i++){
            if (hiddenWord[i] === userGuess[i]) {
                result += hiddenWord[i];
            } else if (hiddenWord.includes(userGuess[i])) {
                result += '+';
            } else {
                result += '*';
            }
        }

    if (result === hiddenWord) {
        alert('Congratulations! You guessed the word.');
        getRandomWord(); 
    } else {
        alert('Incorrect guess. Try again.');
    } 
}

    else {
        alert('Invalid guess length. Please enter a word of the correct length.');
    }

    guessInput.value = ''; 
}

getRandomWord();