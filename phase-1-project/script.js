document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0

    const colors = [
        'red',
        'orange',
        'green',
        'blue',
        'purple',
    ];


    //The Tetrominoes

    const tetrominoL = [
        [1,width+1, width*2+1,2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2],
    ];

    const tetrominoZ = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
    ];

    const tetrominoT = [
        [1, width, width+1, width+2],
        [1,width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ];

    const tetrominoO = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
    ];

    const tetrominoI = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
    ];

    const tertominoReverseL = [
        [0, 1, width+1, width*2+1],
        [width, width+1, width+2, 2],
        [1, width+1, width*2+1, width*2+2],
        [width*2, width, width+1, width+2],
    ];

    const tertominoReverseZ = [
        [width, width+1, width*2+1,width*2+2],
        [1, width+1, width, width*2],
        [width, width+1, width*2+1,width*2+2],
        [1, width+1, width, width*2],
    ];

    const tertominoX = [
        [1, width, width+1, width+2, width*2+1],
        [1, width, width+1, width+2, width*2+1],
        [1, width, width+1, width+2, width*2+1],
        [1, width, width+1, width+2, width*2+1],
    ];

    const theTetrominoes = [tetrominoI,tetrominoL,tetrominoO,tetrominoT,tetrominoZ,tertominoReverseL,tertominoReverseZ,tertominoX];
    let currentPosition = 4;
    let currentRotation = 0;
 
    //Randomly select a tetromino at its first rotation 
    let random = Math.floor(Math.random()*theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];


    //draw the tetromino
    function draw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
            squares[currentPosition + index].style.backgroundColor = colors[random];
        })
    }

    //undraw the tertomino
    function undraw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }

    //assigns functions to arrow keys
    function control(event){
        if(event.keyCode === 37){
            console.log("left");
            moveLeft();
        } else if (event.keyCode === 38){
            console.log("rotate");
            rotate();
        } else if (event.keyCode === 39){
            console.log("right");
            moveRight();
        } else if (event.keyCode === 40){
            console.log("down");
            moveDown();
        }
    }
    
    document.addEventListener('keydown',control);

    //moves the tetrominoes down
    function moveDown() {
        if(!current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        undraw()
        currentPosition += width
        draw()
        } else {
        freezeBlock();
      }
    }

    //freeze block
    function freezeBlock(){
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start a new tetromino falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            console.log(current);
            draw();
            displayShape();
            addScore();
            gameOver();
        }
    }

    //move tetromino left unless blocked by another block or edge
    function moveLeft(){
        undraw();
        const atLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if(!atLeftEdge)currentPosition -= 1;
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw();
    }

    //move tetromino right unless blocked by another block or edge
    function moveRight(){
         undraw();
        const atRightEdge = current.some(index => (currentPosition + index) % width === width-1);
        if(!atRightEdge)currentPosition += 1;
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
      }
    //fix tetromino rotation at the edge 
    function isAtRight() {
        return current.some(index=> (currentPosition + index + 1) % width === 0)  
    }
    
    function isAtLeft() {
        return current.some(index=> (currentPosition + index) % width === 0)
    }

    function checkRotatedPosition(P){
        P = P || currentPosition       //get current position.  Then, check if the piece is near the left side.
        if ((P+1) % width < 4) {         //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).     
          if (isAtRight()){            //use actual position to check if it's flipped over to right side
            currentPosition += 1    //if so, add one to wrap it back around
            checkRotatedPosition(P) //check again.  Pass position from start, since long block might need to move more.
            }
        }
        else if (P % width > 5) {
          if (isAtLeft()){
            currentPosition -= 1
          checkRotatedPosition(P)
          }
        }
      }

    //rotate the tetromino
    function rotate(){
        undraw();
        currentRotation ++
        if(currentRotation === current.length){
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation]
        checkRotatedPosition();
        draw();
    }   

    //show up-next tetromino
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    const displayIndex = 0;

    //the tetromino without rotation
    const upNext = [
        [0, 1, displayWidth+1, displayWidth*2+1], //tertominoReverseL
        [displayWidth, displayWidth+1, displayWidth*2+1,displayWidth*2+2],  //tertominoReverseZ
        [1, displayWidth, displayWidth+1, displayWidth+2, displayWidth*2+1], //tertominoX
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1],  //tetrominoI
        [1,displayWidth+1, displayWidth*2+1,2], //tetrominoL
        [0, 1, displayWidth, displayWidth+1], // tetrominoO
        [1, displayWidth, displayWidth+1, displayWidth+2], // tetrominoT
        [0, displayWidth, displayWidth+1, displayWidth*2+1], // tetrominoZ
    ]

    //display shape on mini grid
    function displayShape(){
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
            square.style.backgroundColor = ''
        })
        upNext[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tertromino')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
    }

    //start button functionality
    startBtn.addEventListener('click', () => {
        if(timerId){
            clearInterval(timerId)
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown,1000)
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            displayShape();
        }
    })

    //add score
    function addScore(){
        for(let i=0; i > 199; i+=width){
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(row.every(index => squares[index].classList.contains('taken'))){
                score += 1;
                scoreDisplay.innerHTML = score;
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                    squares[index].style.backgroundColor = ''
            })
            const squareRemove = squares.splice(i,width)
            squares = squareRemove.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    //game over
    function gameOver(){
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            scoreDisplay.innerHTML = ' GAME OVER'
            clearInterval(timerId)
        }
    }

//DOM listener close
})