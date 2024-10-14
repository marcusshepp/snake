import { GameState } from "./game";
import { SnakeHead } from "./snake";

const canvas = document.getElementById("can") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
context.fillStyle = "white";

let game: GameState;
let snakeHead: SnakeHead;

function drawBoard() {
    for (let x = 0; x < 800; x += 50) {
        for (let y = 0; y < 600; y += 50) {
            context.beginPath();
            context.rect(x, y, game.BLOCK_SIZE, game.BLOCK_SIZE);
            context.stroke();
        }
    }
}

function drawBlock() {
    context.fillRect(
        snakeHead.x,
        snakeHead.y,
        game.BLOCK_SIZE,
        game.BLOCK_SIZE
    );
}

function initializeObjects() {
    game = new GameState();
    game.createBoard();
    snakeHead = new SnakeHead(game);
}

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawBlock();
    requestAnimationFrame(gameLoop);
}

initializeObjects();
gameLoop();
