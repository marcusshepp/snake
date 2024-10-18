import { GameState } from "./state";
import { SnakeBody, SnakeHead } from "./snake";

const canvas = document.getElementById("can") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
context.fillStyle = "white";

let game: GameState;
let snakeHead: SnakeHead;

function drawSnakeHead(): void {
    context.fillRect(
        snakeHead.x,
        snakeHead.y,
        game.BLOCK_SIZE,
        game.BLOCK_SIZE
    );
}

function drawSnakeBody(): void {
    const bodies: SnakeBody[] = game.snakeBodies;
    bodies.forEach((b: SnakeBody): void => {
        context.fillRect(b.x, b.y, game.BLOCK_SIZE, game.BLOCK_SIZE);
    });
}

function initializeObjects(): void {
    game = new GameState();
    game.createSnakeStart();
    snakeHead = game.snakeHead;
    drawSnakeBody();
}

function gameLoop(): void {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawSnakeHead();
    drawSnakeBody();
    snakeHead.moveContinuously();

    game.checkForCollidingSnakeBody();

    // can I change the tick rate here??
    requestAnimationFrame(gameLoop);
}

initializeObjects();
gameLoop();
