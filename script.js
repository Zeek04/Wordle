document.addEventListener("DOMContentLoaded", () => {
  createSquare();

  const key = document.querySelectorAll('.keyboard-row button')
  let guessedWords = [[]]
  let availableSpace = 1;

  let word = "DAIRY"
  let guessedWordCount = 0;

  for(let i = 0; i < key.length; i++){
    key[i].onclick = ({target}) => {
        const letter = target.getAttribute("data-key")

        if(letter === "enter"){
            handleSubmitWord()
            return;
        }

        updateGuessWord(letter)
    }
  }

  function getCurrentWordArr(){
    const numberOfGuessedWords = guessedWords.length
    return guessedWords[numberOfGuessedWords - 1]
  }

  function updateGuessWord(letter){
        const currentWordArr = getCurrentWordArr()

        if(currentWordArr && currentWordArr.length < 5){
            currentWordArr.push(letter)

            const availableSpaceElement = document.getElementById(String(availableSpace))
            availableSpace = availableSpace + 1

            availableSpaceElement.textContent = letter;
        }
  }

  function createSquare() {
    const gameboard = document.getElementById("board");

    for (let i = 0; i < 30; i++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate__animated");
      square.setAttribute("id", i + 1);
      gameboard.appendChild(square);
    }
  }

  function handleSubmitWord(){
    const currentWordArr = getCurrentWordArr()
    if(currentWordArr.length !== 5){
      window.alert("Word must be 5 letters")
    }

    const currentWord = currentWordArr.join('')

    const firstLetterId = guessedWordCount * 5 + 1;
    const interval = 200;
    currentWordArr.forEach((letter, i) => {
      setTimeout(() => {
        const tileColor = "rgb(70, 70, 70)"

        const letterId = firstLetterId + i;
        const letterEl = document.getElementById(letterId)
        letterEl.classList.add("animate__flipInX")
        letterEl.style = `background-color:${tileColor};border-color${tileColor}`;

      }, interval * i)
    });

    guessedWordCount += 1;

    if(currentWord === word){
      window.alert("Congratulations!")
    }

    if(guessedWords.length === 6){
      window.alert(`Sorry, you have no more guesses! The word is ${word}.`)
    }

    guessedWords.push([])
  }
});
