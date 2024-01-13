document.addEventListener("DOMContentLoaded", () => {
  createSquare();
  getNewWord();

  let guessedWords = [[]]
  let availableSpace = 1;

  let word;
  let guessedWordCount = 0;
  

  const key = document.querySelectorAll('.keyboard-row button')

  function getNewWord(){
    fetch(
      `https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=5&lettersMax=5`,
      {
        method: "GET",
        headers: {
          'X-RapidAPI-Key': 'YOUR_KEY',
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
      },
    }
 )
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      word = res.word;
    })
    .catch((err) => {
      console.error(err)
    })
  }

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

  function getTileColor(letter, i){
    const isCorrectLetter = word.includes(letter)

    if(!isCorrectLetter){
      return "rgb(70, 70, 70)"
    }

    const letterInThatPosition = word.charAt(i)
    const isCorrectPosition = letter === letterInThatPosition

    if(isCorrectPosition){
      return "rgb(83,141,78)"
    }

    return "rgb(181, 159, 59)" 
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
        const tileColor = getTileColor(letter, i);

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
