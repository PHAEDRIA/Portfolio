//TicTacToe.Js

//Variable to keep track of whose turn it is
let activePlayer ='X';

//Array to store moves - used this to determine win conditions
let selectedSquares = [];

//Function to place x or o in a square
function placeXOrO(squareNumber) {
    //checks if the square has been selected already
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
    //Variable to hold the HTML element that was clicked
    let select = document.getElementById(squareNumber);
    //Dettermines the active player and place th icon
    if (activePlayer === 'X') {
        select.style.backgroundImage ='url("images/x_img2.png")';    //FIX
    } else {
        select.style.backgroundImage ='url("images/o_img1.png")';    //FIX
    }   
    //Adds the square number and player to the array
    selectedSquares.push(squareNumber + activePlayer);
    //Calls the function to check for a win
    checkWinConditions();
    //CHanges the active player
    if (activePlayer === 'X') {
        activePlayer = 'O';
    } else {
        activePlayer = 'X';
    }
    //Function to play the placement sound
    Audio('./media/place.mp3');            //FIX
    //Checks if it is the computer turn
    if (activePlayer === 'O'); {
        disableClick();
        setTimeout(function () { computersTurn(); }, 1000);
    }
    //Returning true is needed for the computersTurn() function
    return true;
    }

    //Picks a random square for the computers turn
    function computersTurn() {
        let success = false;
        let pickASquare;
        while (!success) {
            pickASquare = String(Math.floor(Math.random() * 9));
            if (placeXOrO(pickASquare)) {
                placeXOrO(pickASquare);
                success = true;
            };
        }
    }
}

//This function parsesthe selectedSquares array to determine if a player has won
//The drawLine function is called if a win condition is met
function checkWinConditions() {
    if (arrayIncludes( '0X', '1X', '2X')) { drawinLine(50, 100, 558, 100) }
    else if (arrayIncludes('3X', '4X', '5X')) { drawinLine(50, 304, 558, 304) }
    else if (arrayIncludes('6X', '7X', '8X')) { drawinLine(50, 508, 558, 508) }
    else if (arrayIncludes('0X', '3X', '6X')) { drawinLine(100, 50, 100, 558) }
    else if (arrayIncludes('1X', '4X', '7X')) { drawinLine(304, 50, 304, 558) }
    else if (arrayIncludes('2X', '5X', '8X')) { drawinLine(508, 50, 508, 558) }
    else if (arrayIncludes('6X', '4X', '2X')) { drawinLine(100, 508, 510, 90) }
    else if (arrayIncludes('0X', '4X', '8X')) { drawinLine(100, 100, 520, 520) }   
    else if (arrayIncludes('00', '10', '20')) { drawinLine(50, 100, 558, 100) }
    else if (arrayIncludes('30', '40', '50')) { drawinLine(50, 304, 558, 304) }
    else if (arrayIncludes('60', '70', '80')) { drawinLine(50, 508, 558, 508) }
    else if (arrayIncludes('00', '30', '60')) { drawinLine(100, 50, 100, 558) }
    else if (arrayIncludes('10', '40', '70')) { drawinLine(304, 50, 304, 558) }
    else if (arrayIncludes('20', '50', '80')) { drawinLine(508, 50, 508, 558) }
    else if (arrayIncludes('60', '40', '20')) { drawinLine(100, 508, 510, 90) } 
    else if (arrayIncludes('00', '40', '80')) { drawinLine(100, 100, 520, 520) }
    //checks for a tie - if no win conditions are met and 9 squares have been selevted
    else if (selectedSquares.length >= 9)   {
        //Plays the tie sound
        Audio(',/media/tie.mp3');
        //resets the game after a tie
        setTimeout(function () { resetGame(); }, 500);
    }

    //This function checks for each win condition
    function arrayIncludes(squareA, squareB, squareC) {
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        if (a === true && b === true && c === true) {return true; }
    }

}

//Clears the board and the array to restart the game
function resetGame() {
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(string(i));
        square.style.backgroundImage = '';
    }
    selectedSquares = [];
}

//Function to draw the line acroos winning coordinates
function drawinLine(coordX1, coordY1, coordX2, coordY2) {
    const convas = document.getElementById('win-lines');
    const c = convas.getContext('2d');
    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2
        y2 = coordY2,
        x = x1,
        y = y1;

        function animateLineDrawing() {
            const animationLoop = requestAnimationFrame(animateLineDrawing);
            c.clearRect(0, 0, 608, 608);
            c.beginPath();
            c.moveTo(x1, y1);
            c.lineTo(x, y);
            c.lineWidth = 10;
            strokesStyle = 'rgba(70, 255, 33, .8)';
            c.stroke();
            if (x1 <= x2 && y1 <= y2) {
                if (x < x2) { x += 10; }
                if (x < y2) { y += 10; }          
                if (x >= x2 && y >= y2) { cancelAnimationFrame(animatetionLoop); }                          
            }
            if (x1 <= x2 && y1 >= y2) {
                if (x < x2) { x += 10; }
                if (x > y2) { y -= 10; }          
                if (x >= x2 && y <= y2) { cancelAnimationFrame(animatetionLoop);  }                          
            }
        }

//Clears the board after the animation
    function clear() {
        const animationLoop = requestAnimationFrame(clear);
        c.clearRect(0, 0, 608, 608);
        cancelAnimationFrame(animationLoop);
   
    }
    disableClick();
    Audio('./media/winGame.mp3');
    animateLineDrawing();
    setTimeout(function () { clear(); resetGame(); }, 1000);
}

//Disables click during the computer's turn
function disableClick() {
    body.style.pointerEvents = 'none';
    setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1000);
}


