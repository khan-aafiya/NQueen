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
]

const winPattern = [
    [1, 7, 8, 14],
    [2, 4, 11, 13],
];

const resetGame = () => {
    msgContainer.classList.add("hide");
    for (let i = 0; i < boxarr.length; i++) {
        for (let j = 0; j < boxarr.length; j++) {
            let box = boxarr[i][j];
            box.innerText = "";
        }
    }
};

for (let i = 0; i < boxarr.length; i++) {
    for (let j = 0; j < boxarr.length; j++) {
        let box = boxarr[i][j];
        box.addEventListener("click", () => {
            if (isSafe(boxarr, i, j)) {
                box.innerText = "Q";
                box.style.color = "black";
                // box.disabled = true;
            } else {
                box.innerText = "Q";
                box.style.color = "red";
                box.addEventListener("click", () => {
                    enableBoxe(box);
                });

            }
            checkWinner();
        });
    }
};

const isSafe = (board, row, col) => {
    // Horizantal
    for (let j = 0; j < board.length; j++) { // j = column
        let box = board[row][j];
        if (box.innerText == 'Q') {
            return false;
        }
    }

    // Vertical
    for (let i = 0; i < board.length; i++) {
        let box = board[i][col];
        if (box.innerText == 'Q') {
            return false;
        }
    }

    // Upper Left
    // let r = row;
    for (let c = col, r = row; r >= 0 && c >= 0; c--, r--) {
        let box = board[r][c];
        if (box.innerText == 'Q') {
            return false;
        }
    }

    // Upper Right
    for (let r = row, c = col; r >= 0 && c < board.length; r--, c++) {
        let box = board[r][c];
        if (box.innerText == 'Q') {
            return false;
        }
    }

    // Lower Left
    for (let r = row, c = col; r < board.length && c >= 0; r++, c--) {
        let box = board[r][c];
        if (box.innerText == 'Q') {
            return false;
        }
    }

    // Lower Right
    for (let r = row, c = col; r < board.length && c < board.length; r++, c++) {
        let box = board[r][c];
        if (box.innerText == 'Q') {
            return false;
        }
    }

    return true;
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxe = (box) => {
    box.disabled = false;
    box.innerText = "";
};

const showWinner = () => {
    if (win) {
        msg.innerText = "you win";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }else {
        msg.innerText = "Try again...";
        msgContainer.classList.remove("hide");
    }
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Va2 = boxes[pattern[1]].innerText;
        let pos3Va3 = boxes[pattern[2]].innerText;
        let pos4Va4 = boxes[pattern[3]].innerText;

        if (pos1Val != "" && pos2Va2 != "" && pos3Va3 != "" && pos4Va4 != "") {
            if (pos1Val == pos3Va3 && pos2Va2 == pos4Va4 && pos3Va3 == pos4Va4) {
                win = true;
            }
        }
    }
};

resetBtn.addEventListener("click", resetGame);
showResult.addEventListener("click", showWinner);
newGame.addEventListener("click", resetGame);
