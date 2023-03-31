document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    const width = 10

    //The Tetrominoes
    const theTetrominoes = [tetrominoL,tetrominoZ,tetrominoT,tetrominoO,tetrominoI];

    const tetrominoL = [
        [l,width+1, width*2+1,2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2],
    ]

    const tetrominoZ = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
    ]

    const tetrominoT = [
        [1, width, width+1, width+2],
        [1,width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const tetrominoO = [
        [0,1, width, width+1]
        [0,1, width, width+l],
        [0,1, width, width+1],
        [0, 1, width, width+1],
    ]

    const tetrominoI = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1,width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
    ]


    })