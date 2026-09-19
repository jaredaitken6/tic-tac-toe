function modalStartBox() {
    gameBoard.classList.add('unclickable');
    // gameBoard.classList.remove('unclickable');
    const modal = document.getElementById('myModal');
    modal.showModal();
    const closeBtn = document.getElementById('closeModal');
    closeBtn.addEventListener('click', () => {
            modal.close();
        });
    
    const startGameBtn = document.querySelector('.start-game-btn');
    startGameBtn.addEventListener('click', () => {
        const versesTitle = document.createElement('h2');
        const player1Name = document.getElementById('player1').value;
        const player2Name = document.getElementById('player2').value;
        const body = document.querySelector('body');
        const firstChildOfBody = body.firstElementChild;
        if (player1Name === '' || player2Name === '') {
            return;
        }
        modal.close();
        gameBoard.classList.remove('unclickable');
        versesTitle.classList.add('verses-title');
        versesTitle.textContent = `${player1Name} vs. ${player2Name}`;
        if (firstChildOfBody.tagName === 'H2') {
            firstChildOfBody?.remove();
        }
        body.prepend(versesTitle);

        setupGameBoard();
        gameControls();
    });
}

modalStartBox()

    
// const setupGameBoard = (() => {
//     modalStartBox();
//     const gameBoardParent = document.querySelector('#gameBoard');
//     let squareCount = 0;

//     for (let i = 0; i < 3; i++) {
//         const childSquareRow = document.createElement('div');
//         childSquareRow.classList.add('square-row');
//         gameBoardParent.appendChild(childSquareRow);
//             for (let i = 0; i < 3; i++) {
//             squareCount++;
//             const childSquare = document.createElement('div');
//             childSquare.classList.add('square');
//             childSquare.id = 'square' + squareCount;
//             childSquare.textContent = '';
//             childSquareRow.appendChild(childSquare);
//         }
//     }

// })();

function setupGameBoard() {
    // modalStartBox();
    const gameBoardParent = document.querySelector('#gameBoard');
    let squareCount = 0;

    gameBoardParent.replaceChildren();

    for (let i = 0; i < 3; i++) {
        const childSquareRow = document.createElement('div');
        childSquareRow.classList.add('square-row');
        gameBoardParent.appendChild(childSquareRow);
            for (let i = 0; i < 3; i++) {
            squareCount++;
            const childSquare = document.createElement('div');
            childSquare.classList.add('square');
            childSquare.id = 'square' + squareCount;
            childSquare.textContent = '';
            childSquareRow.appendChild(childSquare);
        }
    }
}

function gameControls()  {
    let squares = document.querySelectorAll('.square');
    let xSymbol = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 4L20 20M20 4L4 20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>' + 'X';
    let oSymbol = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>' + 'O';
    // let oSymbol = '<img src="./svg/circle.svg" alt="Description">';
    // let xSymbol = '<img src="./svg/x.svg" alt="Description">';

    function addSymbol(e) {
        const symbolArray = [...squares].map(element => element.textContent);
        const blankSquaresCount = symbolArray.filter(item => item === '').length;

        if (e.target.textContent) {
            return;
        }
        
        // blankSquaresCount % 2 === 0 ? e.target.innerHTML = xSymbol : e.target.innerHTML = oSymbol;

        if (blankSquaresCount % 2 === 0) {
            // e.target.textContent = 'X';
            e.target.innerHTML = xSymbol;
            // console.log(xSymbol.trim());
            
        } else {
            // e.target.textContent = 'O';
            e.target.innerHTML = oSymbol;
            // console.log(xSymbol.trim());
        }

        endGame.threeSymbols();

    }

    function clickSquare() {
        squares.forEach(square => {
            square.addEventListener('click', addSymbol);    
        });
    }

    clickSquare();

    const resetGameButton = document.querySelector('.reset-game-btn');
    resetGameButton.addEventListener('click', () => {
        setupGameBoard();
    });

}


const endGame = (() => {

    function threeSymbols() {
        let squares = document.querySelectorAll('.square');
        let gameBoard = document.querySelector('#gameBoard');
        let firstRowParent = gameBoard.firstElementChild;
        let firstRowChildren = firstRowParent.children;
        let secondRowParent = gameBoard.children[1];
        let secondRowChildren = secondRowParent.children;
        let thirdRowParent = gameBoard.children[2];
        let thirdRowChildren = thirdRowParent.children;
        let squaresArray = [...squares];
        const firstColumn = document.querySelectorAll('.square-row > :first-child');
        const secondColumn = document.querySelectorAll('.square-row >  *:nth-child(2)');
        const thirdColumn = document.querySelectorAll('.square-row >  *:nth-child(3)');
        // console.log(thirdColumn);
        // console.log(thirdRowChildren[0].textContent);
        

        // check if there are three symbols in a row or column or diagonal.

        // row wins
        const firstRowArray = Array.from(firstRowChildren, node => node.textContent);
        const firstRowArrayIsFull = firstRowArray.includes('');
        const firstRowTheSame = firstRowArray => firstRowArray.every(val => val === firstRowArray[0]);

        const secondRowArray = Array.from(secondRowChildren, node => node.textContent);
        const secondRowArrayIsFull = secondRowArray.includes('');
        const secondRowTheSame = secondRowArray => secondRowArray.every(val => val === secondRowArray[0]);

        const thirdRowArray = Array.from(thirdRowChildren, node => node.textContent);
        const thirdRowArrayIsFull = thirdRowArray.includes('');
        const thirdRowTheSame = thirdRowArray => thirdRowArray.every(val => val === thirdRowArray[0]);
        // console.log(firstRowArray[2].trim());
        // console.log(secondRowTheSame(secondRowArray));
        console.log(thirdRowTheSame(thirdRowArray));
        // console.log(!thirdRowArrayIsFull);
        if (thirdRowTheSame(thirdRowArray) && !thirdRowArrayIsFull || secondRowTheSame(secondRowArray) && !secondRowArrayIsFull || firstRowTheSame(firstRowArray) && !firstRowArrayIsFull)  {
            console.log("You win");
            gameBoard.classList.add('unclickable');
            // gameBoard.classList.remove('unclickable');
        }

        // column wins
        const firstColumnArray = Array.from(firstColumn, node => node.textContent);
        const firstColumnArrayIsFull = firstColumnArray.includes('');
        const firstColumnTheSame = firstColumnArray => firstColumnArray.every(val => val === firstColumnArray[0]);
        // console.log(firstColumnTheSame(firstColumnArray));

        const secondColumnArray = Array.from(secondColumn, node => node.textContent);
        const secondColumnArrayIsFull = secondColumnArray.includes('');
        const secondColumnTheSame = secondColumnArray => secondColumnArray.every(val => val === secondColumnArray[0]);

        const thirdColumnArray = Array.from(thirdColumn, node => node.textContent);
        const thirdColumnArrayIsFull = thirdColumnArray.includes('');
        const thirdColumnTheSame = thirdColumnArray => thirdColumnArray.every(val => val === thirdColumnArray[0]);

        if (firstColumnTheSame(firstColumnArray) && !firstColumnArrayIsFull || secondColumnTheSame(secondColumnArray) && !secondColumnArrayIsFull || thirdColumnTheSame(thirdColumnArray) && !thirdColumnArrayIsFull)  {
            console.log("You win");
            gameBoard.classList.add('unclickable');
            // gameBoard.classList.remove('unclickable');
        }

        // diagonal wins
        const topLeftRightArray = [squaresArray[0].textContent, squaresArray[4].textContent, squaresArray[8].textContent];
        const topLeftRightArrayIsFull = topLeftRightArray.includes('');
        const topLeftRightTheSame = topLeftRightArray => topLeftRightArray.every(val => val === topLeftRightArray[0]);
        
        const bottomLeftRightArray = [squaresArray[6].textContent, squaresArray[4].textContent, squaresArray[2].textContent];
        const bottomLeftRightArrayIsFull = bottomLeftRightArray.includes('');
        const bottomLeftRightTheSame = bottomLeftRightArray => bottomLeftRightArray.every(val => val === bottomLeftRightArray[0]);

        if (topLeftRightTheSame(topLeftRightArray) && !topLeftRightArrayIsFull || bottomLeftRightTheSame(bottomLeftRightArray) && !bottomLeftRightArrayIsFull)  {
            console.log("You win");
            gameBoard.classList.add('unclickable');
            // gameBoard.classList.remove('unclickable');
        }
        // console.log(squaresArray[3].textContent);
        // console.log(topLeftRightTheSame(topLeftRightArray));
    }

    return {
        threeSymbols
    };
})();

