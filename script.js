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
        

function Player(title, symbol) {
  this.title = title;
  this.symbol = symbol;
}

let player1 = new Player('Player 1', 'X');
let player2 = new Player('Player 2', 'O');

/*
player1 goes first
*/

console.log(document.querySelector('#square1').textContent);
// When tile is clicked player2 places an O and player1 places an X
// factory function
// function gameplay() {
//     const tileNullCount = gameBoardModule.filter(item => item === null).length;

//     function playerTurn() {
//         return tileNullCount % 2 === 0 ? 'player2' : 'player1';
//     }
    
//     console.log(playerTurn());
// }

// gameplay();

const gameControls = (() => {
    let squares = document.querySelectorAll('.square');
    

    
    function addSymbol(e) {
        const symbolArray = [...squares].map(element => element.textContent);
        const blankSquaresCount = symbolArray.filter(item => item === '').length;
        // console.log(e.target.id);
        console.log(e.target.textContent);
        if (e.target.textContent) {
            return;
        }
            blankSquaresCount % 2 === 0 ? e.target.textContent = 'X' : e.target.textContent = 'O';


        console.log(symbolArray);
        console.log(blankSquaresCount);
        // console.log(e.target.textContent);
    }

    function clickSquare() {
        squares.forEach(square => {
            square.addEventListener('click', addSymbol);    
        });
    }

    clickSquare();

})();


