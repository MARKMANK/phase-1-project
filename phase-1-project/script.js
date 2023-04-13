
document.addEventListener('DOMContentLoaded',() => {

    const highScoreTable = document.getElementById('player-scores');

    const configurationObject = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        Accept: "application/json"
        },
      }
  
      fetch("http://localhost:3000/scores",configurationObject)
        .then (function(response){
            return response.json();
        })
        .then (function(resObj){
            resObj.forEach((player) => {
                highScoreTable.innerHTML = highScoreTable.innerHTML +
                `
                <p>
                <h5>${player.name}&nbsp&nbsp${player.score}&nbsp&nbsp${player.time}</h5>
                </p>
                `
            })
        })

    const grid = document.querySelector('.grid')
    const title = document.getElementById('title-tetris')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const restartBtn = document.querySelector('#restart-button')
    const width = 10
    let blockSpeed = 1000
    let nextRandom = 0
    let timerId
    let score = 0

    let totalTimeResult = ''
    let timeStartInSeconds = ''
    let timeEndInSeconds = ''



    const colors = [
        'rgb(216, 22, 22)',
        'rgb(255, 166, 0)',
        'rgb(245, 245, 38)',
        'rgb(85, 219, 13)',
        'rgb(20, 156, 25)',
        'rgb(30, 230, 216)',
        'rgb(28, 161, 237)',
        'rgb(166, 83, 244)',
      ]

    const tetrominoL = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const tetrominoZ = [
        [0, width, width+1,width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const tetrominoT = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const tetrominoO = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const tetrominoI = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const tertominoReverseL = [
        [0, 1, width+1, width*2+1],
        [width, width+1, width+2, 2],
        [1, width+1, width*2+1, width*2+2],
        [width*2, width, width+1, width+2],
    ];

    const tertominoReverseZ = [
        [width, width+1, width*2+1, width*2+2],
        [1, width+1, width, width*2],
        [width, width+1, width*2+1, width*2+2],
        [1, width+1, width, width*2],
    ];
      

    const tertominoX = [
        [1, width, width+1, width+2, width*2+1],
        [1, width, width+1, width+2, width*2+1],
        [1, width, width+1, width+2, width*2+1],
        [1, width, width+1, width+2, width*2+1],
    ];

    const theTetrominoes = [tertominoReverseL, tertominoReverseZ, tertominoX, tetrominoI, tetrominoL, tetrominoO, tetrominoT, tetrominoZ];
    let currentPosition = 4;
    let currentRotation = 0;
 

    let random = Math.floor(Math.random()*theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];



    function draw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
            squares[currentPosition + index].style.backgroundColor = colors[random];
        })
    }


    function undraw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }


    function startTime(){
    const one = new Date();
    timeStartInSeconds = (one.getHours()*3600)+(one.getMinutes()*60)+(one.getSeconds())
    console.log(timeStartInSeconds)
    }


    function endTime(){
    const two = new Date();
    timeEndInSeconds = (two.getHours()*3600)+(two.getMinutes()*60)+(two.getSeconds())
    console.log(timeEndInSeconds)
    let totalTime = timeEndInSeconds-timeStartInSeconds

    const date = new Date(null);
    date.setSeconds(totalTime);
    const result = date.toISOString().slice(11, 19);
    console.log(result)
    totalTimeResult = result;
    }


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

    function moveDown() {
        if(!current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        undraw()
        currentPosition += width
        draw()
        } else {
        freezeBlock();
      }
    }


    function freezeBlock(){
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))

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


    function moveLeft(){
        undraw();
        const atLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if(!atLeftEdge)currentPosition -= 1;
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw();
    }


    function moveRight(){
         undraw();
        const atRightEdge = current.some(index => (currentPosition + index) % width === width-1);
        if(!atRightEdge)currentPosition += 1;
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
      }


    function isAtRight() {
        return current.some(index=> (currentPosition + index + 1) % width === 0)  
    }
    
    function isAtLeft() {
        return current.some(index=> (currentPosition + index) % width === 0)
    }

    function checkRotatedPosition(P){
        P = P || currentPosition      
        if ((P+1) % width < 4) {       
          if (isAtRight()){          
            currentPosition += 1   
            checkRotatedPosition(P) 
            }
        }
        else if (P % width > 5) {
          if (isAtLeft()){
            currentPosition -= 1
          checkRotatedPosition(P)
          }
        }
      }

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



    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    const displayIndex = 0;


    const upNext = [
        [0, 1, displayWidth+1, displayWidth*2+1], 
        [displayWidth, displayWidth+1, displayWidth*2+1,displayWidth*2+2], 
        [1, displayWidth, displayWidth+1, displayWidth+2, displayWidth*2+1], 
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1], 
        [1,displayWidth+1, displayWidth*2+1,2], 
        [0, 1, displayWidth, displayWidth+1], 
        [1, displayWidth, displayWidth+1, displayWidth+2],
        [0, displayWidth, displayWidth+1, displayWidth*2+1], 
    ]


    function displayShape(){
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
            square.style.backgroundColor = ''
        })
        upNext[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
    }


    startBtn.addEventListener('click', () => {
        document.getElementById("start-button").innerHTML = "Start Game"
        if(timerId){
            clearInterval(timerId)
            timerId = null;
        } else {
            document.getElementById("start-button").innerHTML = "PAUSE"
            draw();
            timerId = setInterval(moveDown,blockSpeed)
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            displayShape()
            startTime()
        }
    })


    restartBtn.addEventListener("click", (event) => {
        console.log("NEW GAME!")
        document.location.reload();
    })
    


    function addScore() {
    for (let i = 0; i < 199; i +=width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if(row.every(index => squares[index].classList.contains('taken'))) {
        score +=1
        blockSpeed -= 50
        console.log(blockSpeed)
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
          squares[index].style.backgroundColor = ''
        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }}

 


    function gameOver(){
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            title.innerHTML = ' GAME OVER'
            document.getElementById('submit-div').style.display = "block"; 
            const occupiedBlock = document.getElementsByClassName("taken");
            for(let i = 0; i < occupiedBlock.length; i++){
                occupiedBlock[i].style.backgroundColor = 'rgb(28,28,28,50%)'
            }
            clearInterval(timerId)
            undraw()
            endTime()
        }
    }


    function addZeroToScore(){
        if(score<10){
            return score = `0${score}`
        } else {
            return score
        }
    }



   let playerNameInput = 'AAA';
   const playerNameInputElement = document.getElementById("name-box")
   playerNameInputElement.addEventListener("input", function(event){
     playerNameInput = (event.target.value).toUpperCase();
   })

     const form = document.getElementById("submit-form");
     form.addEventListener("submit", (event) => {
         event.preventDefault();
         console.log("You sumbitted your score!")
         document.getElementById('submit-div').style.display = "none";
        let bodyObj =  JSON.stringify({
            "name": playerNameInput,
            "score": addZeroToScore(score),
            "time": totalTimeResult
        })
        console.log(bodyObj)
         const configurationObject = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            Accept: "application/json"},
            body: bodyObj
         }
         fetch("http://localhost:3000/scores",configurationObject)
         .then (function(response){
           return response.json();
         })
         .then (function(resObj){
          console.log(resObj)
                highScoreTable.innerHTML = highScoreTable.innerHTML +
                `
                <p>
                <h5>${resObj.name}&nbsp&nbsp${resObj.score}&nbsp&nbsp${resObj.time}</h5>
                </p>
                `
        })
     })



})
