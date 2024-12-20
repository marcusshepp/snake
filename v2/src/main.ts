import { GameState } from "./state";
import { SnakeHead } from "./head";
import { drawImageRot } from "./utils/rotate-image";
import { snake1Asset, snakeBodyAsset } from "./asset";
import { SnakeBody } from "./body";

const canvas = document.getElementById("can") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
context.fillStyle = "white";

let game: GameState;
let snakeHead: SnakeHead;

function drawSnakeHead(): void {
    drawImageRot(
        context,
        snake1Asset.element,
        snakeHead.x,
        snakeHead.y,
        game.SNAKE_HEAD_SIZE,
        game.SNAKE_HEAD_SIZE,
        snakeHead.degrees
    );
}

function drawSnakeBody(): void {
    const bodies: SnakeBody[] = game.snakeBodies;
    bodies.forEach((b: SnakeBody): void => {
        drawImageRot(
            context,
            snakeBodyAsset.element,
            b.x,
            b.y,
            game.SNAKE_BODY_SIZE,
            game.SNAKE_BODY_SIZE,
            b.degrees
        );
    });
}

function drawFood(): void {
    drawImageRot(
        context,
        game.food.asset.element,
        game.food.x,
        game.food.y,
        game.FOOD_SIZE_X,
        game.FOOD_SIZE_Y,
        game.food.degrees
    );
}

function drawBoard(): void {
    context.beginPath();
    const cellSize: number = 55;
    for (let x = 0; x < canvas.width; x += cellSize) {
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
    }
    for (let y = 0; y < canvas.height; y += cellSize) {
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
    }
    context.strokeStyle = '#df8c6b2b';

    context.stroke();
}

function initializeObjects(): void {
    game = new GameState();
    game.startGame();
    snakeHead = game.snakeHead;
    drawSnakeBody();
}

function gameLoop(): void {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawBoard();
    drawSnakeHead();
    drawSnakeBody();
    drawFood();

    snakeHead.moveSnake();
    // game.checkForCollidingSnakeBody();

    requestAnimationFrame(gameLoop);
}

initializeObjects();
gameLoop();
