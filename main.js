const wall = document.getElementById ('wall1');
const ponto = document.getElementById("score");

let scoreGame = 0;
ponto.innerHTML = scoreGame;
ponto.style.fontSize = '2rem'


//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velX = 0;
var velY =  0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

window.onload = function (){
    board = document.getElementById('board');
    board.height = rows* blockSize;
    board.width = rows* blockSize;
    context = board.getContext('2d'); //desenhar a board

    placeFood();
    document.addEventListener('keyup', changeDirection);

    setInterval(update, 100)
}

function update() {
    if(gameOver){
        return;
    }
    context.fillStyle = '#596D50';
    context.fillRect(0, 0, board.width, board.height);
    
    context.fillStyle='red';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        ponto.innerText = ++scoreGame;
         placeFood()
    }

    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
       
    }
    
    context.fillStyle='#063538';
    snakeX += +velX*blockSize;
    snakeY += +velY*blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(let i =0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }
    
    if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            
        }
    }
}

function changeDirection(e){
    if (e.code == "ArrowUp" && velY != 1){
        velX = 0;
        velY = -1;
    }else if (e.code == "ArrowDown" && velY != -1){
        velX = 0;
        velY = 1;
    }else if (e.code == "ArrowLeft" && velX != 1){
        velX = -1;
        velY = 0;
    }else if (e.code == "ArrowRight" && velX != -1){
        velX = 1;
        velY = 0;
    }
};
function placeFood(){
    //math.floor aredonda o numero pra baixo
    foodX = Math.floor(Math.random()* cols) *blockSize;
    foodY = Math.floor(Math.random()* rows) *blockSize;
}