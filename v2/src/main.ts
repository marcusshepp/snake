import { GameState } from "./state";
import { SnakeBody, SnakeHead } from "./snake";
import { drawImageRot } from "./utils/rotate-image";
import { snake1, snakeBody } from "./asset";

const canvas = document.getElementById("can") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
context.fillStyle = "white";

let game: GameState;
let snakeHead: SnakeHead;

function drawSnakeHead(): void {
    drawImageRot(
        context,
        snake1.element,
        snakeHead.x,
        snakeHead.y,
        game.BLOCK_SIZE,
        game.BLOCK_SIZE,
        snakeHead.degrees
    );
}

function drawSnakeBody(): void {
    const bodies: SnakeBody[] = game.snakeBodies;
    bodies.forEach((b: SnakeBody): void => {
        drawImageRot(
            context,
            snakeBody.element,
            b.x,
            b.y,
            game.BLOCK_SIZE,
            game.BLOCK_SIZE,
            b.degrees
        );
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

    snakeHead.moveSnake();
    // game.checkForCollidingSnakeBody();

    requestAnimationFrame(gameLoop);
}

initializeObjects();
gameLoop();
