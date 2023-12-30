document.addEventListener("DOMContentLoaded", () => {
  createSquare();

  const key = document.querySelectorAll('.keyboard-row button')
  const guessedWords = [[]]

  for(let i = 0; i < key.length; i++){
    key[i].onclick = ({target}) => {
        const letter = target.getAttribute("data-key")

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
        }
  }

  function createSquare() {
    const gameboard = document.getElementById("board");

    for (let i = 0; i < 30; i++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("id", i + 1);
      gameboard.appendChild(square);
    }
  }
});
