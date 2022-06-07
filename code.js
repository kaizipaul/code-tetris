document.addEventListener('DOMContentLoaded', () => {
    const grid= document.querySelector('.grid');
    let squares= Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay=document.querySelector('#score');
    const startButton=document.querySelector('#start-button');
    const width= 10;
    let nextRandom=0;
    let timerId;
// The tetrominoes
const lTetromino=[
    [1, width+1,width*2+1,2],
    [width,width+1,width+2,width*2+2],
    [1,width+1,width*2+1,width*2],
    [width,width*2,width*2+1,width*2+2]
];

const zTetromino= [
    [0,width,width+1,width*2+1],
    [width+1,width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1,width+2,width*2,width*2+1]
];

const tTetromino=[
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
];

const oTetromino=[
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
];

const iTetromino=[
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
];

const theTetrominoes=[lTetromino,zTetromino,tTetromino,oTetromino,iTetromino];

let currentPosition= 4;
let currentRotation=0;
//randomly select a tetromino

let random=Math.floor(Math.random()*theTetrominoes.length);
let current= theTetrominoes[random][currentRotation];

//draw the first tetromino
function draw(){
    current.forEach(index=>{
        squares[currentPosition+index].classList.add("tetromino")
    });
}

//undraw tetromino
function undraw (){
    current.forEach(index=>{
     squares[currentPosition+index].classList.remove("tetromino")
    });
}

//move down per second
timerId=setInterval(moveDown,1000);

//assign function to keycodes
function control(e){
    if(e.keyCode===37){
        moveLeft();
    } else if(e.keyCode===38){
        rotate();
    } else if(e.keyCode===39){
        moveRight();
    } else if(e.keyCode===40){
        moveDown();
    }
}
document.addEventListener('keyup',control);



//move down function
function moveDown(){
    undraw();
    currentPosition += width;
    draw();
    freeze();
}
// freeze function
function freeze(){
 if(current.some(index=> squares[currentPosition+index+width].classList.contains("taken"))){
current.forEach(index=> squares[currentPosition+index].classList.add("taken"));

        //set a new tetromino falling
random=nextRandom;
nextRandom=Math.floor(Math.random()*theTetrominoes.length);
current= theTetrominoes[random][currentRotation];
currentPosition=4;
draw();
displayShape();
    }
}



//move the block left
function moveLeft(){
    undraw();
    const isAtLeftEdge= current.some(index=>(currentPosition+index)% width===0)

    if(!isAtLeftEdge) currentPosition -=1;
    if(current.some(index=>squares[currentPosition+index].classList.contains("taken"))){
        currentPosition +=1;
    }
    draw();
}

//move block to the right unless its the edge or blocked
function moveRight(){
    undraw();
    const isAtRightEdge=current.some(index=>(currentPosition+index)%width===width-1);

    if (!isAtRightEdge) currentPosition+=1;

    if(current.some(index=>squares[currentPosition+index].classList.contains('taken'))){
        currentPosition-=1;
    }
draw();
}

//rotate the tetromino
function rotate(){
    undraw();
    currentRotation++;
    if(currentRotation===current.length){//if the current rotation gets to 4, make it go back to 0
currentRotation=0;
    }
current= theTetrominoes[random][currentRotation];
draw();
}

//show next tetromino

const displaySquares=document.querySelectorAll('.mini-grid div');
const displayWidth=4;
let displayIndex=0;


//tetrominoes without rotations
const upNextTetrominoes=[
    [1,displayWidth+1,displayWidth*2+1,2],
    [0,displayWidth,displayWidth+1,displayWidth*2+1],
    [1,displayWidth,displayWidth+1,displayWidth+2],
    [0,1,displayWidth,displayWidth+1], //oTetromino
    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]
];

//display the shape in mini-grid display
function displayShape(){
    //remove any traces of a tetromino from the entire grid
    displaySquares.forEach(square=> {
        square.classList.remove('tetromino')
    });
    upNextTetrominoes[nextRandom].forEach(index=>{
        displaySquares[displayIndex+index].classList.add('tetromino')
    });
}

//add functionality to the button start/pause
startButton.addEventListener('click',()=>{
    if (timerId){
        clearInterval(timerId);
        timerId=null;
    } else{
        draw();
        timerId=setInterval(moveDown,1000);
        nextRandom=Math.floor(Math.random()*theTetrominoes.length);
    }
})












});