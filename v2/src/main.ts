import { SnakeHead } from './snake';

const canvas = document.getElementById('can') as HTMLCanvasElement;
const content = canvas.getContext('2d') as CanvasRenderingContext2D;
const BLOCK_WIDTH: number = 50;
const BLOCK_HEIGHT: number = 50;

let snakeHead: SnakeHead;

function drawBoard() {
    // const colors = ['black', 'yellow', 'blue', 'green', 'red'];
    // colors[Math.floor(Math.random() * colors.length)]
    for (let x = 0; x < 800; x += 50) {
        for (let y = 0; y < 600; y += 50) {
            // content.fillStyle = 'black';
            content.beginPath();
            content.rect(x, y, BLOCK_HEIGHT, BLOCK_WIDTH);
            content.stroke();
        }
    }
}

function drawBlock() {
    content.fillStyle = 'blue';
    content.fillRect(snakeHead.x, snakeHead.y, BLOCK_HEIGHT, BLOCK_WIDTH);
}

function initializeObjects() {
    snakeHead = new SnakeHead();
}

function gameLoop() {
    content.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawBlock();
    requestAnimationFrame(gameLoop);
}

initializeObjects();
gameLoop();
