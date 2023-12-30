document.addEventListener("DOMContentLoaded", () => {
  createSquare();

  const key = document.querySelectorAll('.keyboard-row button')

  for(let i = 0; i < key.length; i++){
    key[i].onclick = ({target}) => {
        const key = target.getAttribute("data-key")

        console.log(key)
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
