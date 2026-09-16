// what are the different sections?
/*
there is a gameboard
there are two players, each with their own symbol
there are 9 separate spaces on the gameboard
the two players take turns
on a players turn, the player clicks one of the empty nine spots
when the player clicks the spot, that players symbol gets put on the spot
when a player has 3 of their symbols in a row, column or diagonally that player wins the game
*/
/*
what has only one instance?
    - game board
what has more than one instance?
    - players
*/

    
const setupGameBoard = (() => {
    const gameBoardParent = document.querySelector('#gameBoard');
    let squareCount = 0;

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
})();


const gameControls = (() => {
    let squares = document.querySelectorAll('.square');

    function addSymbol(e) {
        const symbolArray = [...squares].map(element => element.textContent);
        const blankSquaresCount = symbolArray.filter(item => item === '').length;

        if (e.target.textContent) {
            return;
        }
        
        blankSquaresCount % 2 === 0 ? e.target.textContent = 'X' : e.target.textContent = 'O';

        endGame.threeSymbols();

    }

    function clickSquare() {
        squares.forEach(square => {
            square.addEventListener('click', addSymbol);    
        });
    }

    clickSquare();

})();


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
        // console.log(thirdColumn[0].textContent);
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
        // console.log(secondRowTheSame(secondRowArray));
        // console.log(thirdRowTheSame(thirdRowArray));
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

