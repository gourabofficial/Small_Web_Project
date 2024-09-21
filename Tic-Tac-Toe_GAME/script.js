let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector('#reset');
let newGamebtn = document.querySelector('#new-game');
let msgcontainer = document.querySelector('.msg-container');
let msg = document.querySelector('.msg');


let player0 = true;

const patterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (player0) {
            box.innerHTML = "O";
            box.style.color = "red"
            player0 = false;
        } else {
            box.innerHTML = "X";
            box.style.color = "green"

            player0 = true;
        }
        box.disabled = true;
        checkWinner();
    })
});
const resetGame = () => {
    player0 = true;
    enableBoxes();
    msgcontainer.classList.add('hide');
}

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;

    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}


const showWinner = (winner) => {
    msg.innerText = `${winner} is the winner`;
    msgcontainer.classList.remove('hide');
    disabledBoxes();

}
const checkWinner = () => {
    for (let pattern of patterns) {
        let posVal1 = boxes[pattern[0]].innerHTML;
        let posVal2 = boxes[pattern[1]].innerHTML;
        let posVal3 = boxes[pattern[2]].innerHTML;

        if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
            if (posVal1 == posVal2 && posVal2 == posVal3) {
                console.log("Winner", posVal1);
                showWinner(posVal1);
            }
        }
    }
};
resetbtn.addEventListener('click', resetGame);
newGamebtn.addEventListener('click', resetGame);