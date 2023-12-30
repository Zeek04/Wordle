document.addEventListener("DOMContentLoaded", () =>{
    createSquare()
     
    function createSquare(){
        const gameboard = document.getElementById("board")

        for(let i = 0; i < 30; i++){
            let square = document.createElement("div")
            square.classList.add("square")
            square.setAttribute('id', i + 1)
            gameboard.appendChild(square)
        }
    }
})