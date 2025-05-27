let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let showResult = document.querySelector(".show-result");
let newGame = document.querySelector("#new-game");
let previous = document.querySelector(".previous");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let win = false;

let boxarr = [
    [boxes[0], boxes[1], boxes[2], boxes[3]],
    [boxes[4], boxes[5], boxes[6], boxes[7]],
    [boxes[8], boxes[9], boxes[10], boxes[11]],
    [boxes[12], boxes[13], boxes[14], boxes[15]],
];

const winPattern = [
    [1, 7, 8, 14],
    [2, 4, 11, 13],
];

const resetGame = () => {
    msgContainer.classList.add("hide");
    win = false; // reset win status

    for (let i = 0; i < boxarr.length; i++) {
        for (let j = 0; j < boxarr.length; j++) {
            let box = boxarr[i][j];
            box.innerText = "";
            box.style.color = "black";
            box.disabled = false;
        }
    }
};

for (let i = 0; i < boxarr.length; i++) {
    for (let j = 0; j < boxarr.length; j++) {
        let box = boxarr[i][j];

        box.addEventListener("click", () => {
            // Prevent placing on already filled box
            if (box.innerText !== "") return;

            if (isSafe(boxarr, i, j)) {
                box.innerText = "Q";
                box.style.color = "black";
            } else {
                box.innerText = "Q";
                box.style.color = "red";
            }

            checkWinner();
        });
    }
}

const isSafe = (board, row, col) => {
    // Horizontally
    for (let j = 0; j < board.length; j++) {
        if (board[row][j].innerText === "Q") return false;
    }

    // Vertically
    for (let i = 0; i < board.length; i++) {
        if (board[i][col].innerText === "Q") return false;
    }

    // Upper-left diagonal
    for (let r = row, c = col; r >= 0 && c >= 0; r--, c--) {
        if (board[r][c].innerText === "Q") return false;
    }

    // Upper-right diagonal
    for (let r = row, c = col; r >= 0 && c < board.length; r--, c++) {
        if (board[r][c].innerText === "Q") return false;
    }

    // Lower-left diagonal
    for (let r = row, c = col; r < board.length && c >= 0; r++, c--) {
        if (board[r][c].innerText === "Q") return false;
    }

    // Lower-right diagonal
    for (let r = row, c = col; r < board.length && c < board.length; r++, c++) {
        if (board[r][c].innerText === "Q") return false;
    }

    return true;
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = () => {
    if (win) {
        msg.innerText = "You win!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    } else {
        msg.innerText = "Try again...";
        msgContainer.classList.remove("hide");
    }
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        let pos4Val = boxes[pattern[3]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "" && pos4Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val && pos3Val === pos4Val) {
                win = true;
                return;
            }
        }
    }
};

resetBtn.addEventListener("click", resetGame);
showResult.addEventListener("click", showWinner);
newGame.addEventListener("click", resetGame);
