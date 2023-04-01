document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    const width = 10


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
    random = Math.floor(Math.random() * theTetrominoes.length);

    //Randomly select a tetromino at its first rotation 
    let randomShape = Math.floor(Math.random()*theTetrominoes.length);
    let currentRotation = 0;
    let currentShape = theTetrominoes[randomShape][currentRotation];


    //draw the tetromino
    function draw(){
        currentShape.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        })
    }

    draw();

    //undraw the tertomino
    function undraw(){
        currentShape.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    //tetrominoes downward speed 1000 = 1 sec
    let timerValue = 1000;
    timerId = setInterval(moveDown,timerValue);

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

    //moves the tetrominoes down based on the above speed
    function moveDown(){
        if(!currentShape.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        undraw();
        currentPosition += width
        draw();
        }else{
         freezeBlock();
        }
  
    }
    
    //freeze block
    function freezeBlock(){
        if(currentShape.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            currentShape.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //Increases the falling speed 
            timerValue = timerValue - 100;
            console.log(timerValue);
            //start a new tetromino falling
            currentShape = theTetrominoes[randomShape][currentRotation];
            currentPosition = 4;
            draw();
        }
    }

    //move tetromino left unless blocked by another block or edge
    function moveLeft(){
        undraw();
        const atLeftEdge = currentShape.some(index => (currentPosition + index) % width === 0);
        if(!atLeftEdge)currentPosition -= 1;
        if(currentShape.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw();
    }

    //move tetromino right unless blocked by another block or edge
    function moveRight(){
         undraw();
        const atRightEdge = currentShape.some(index => (currentPosition + index) % width === width-1);
        if(!atRightEdge)currentPosition += 1;
        if(currentShape.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
      }

    //rotate the tetromino
    function rotate(){
        undraw();
        const atLeftEdge = currentShape.some(index => (currentPosition + index) % width === 0);
        if(!atLeftEdge)currentPosition -= 1;
        const atRightEdge = currentShape.some(index => (currentPosition + index) % width === width-1);
        if(!atRightEdge)currentPosition += 1;
        currentRotation ++;
        if(currentRotation === currentShape.length){
            currentRotation = 0;
        }
        currentShape = theTetrominoes[random][currentRotation]
        draw();
    }   


//DOM listener close
})