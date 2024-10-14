import { SnakeBody, SnakeTail } from "./snake";

enum KEYS {
    P = "p",
}

export interface Coordinates {
    x: number;
    y: number;
}

export class BoardPosition {
    public id: number;
    public x: number;
    public y: number;

    constructor(id: number, x: number, y: number) {
        this.id = id;
        this.x = x;
        this.y = y;
    }
}

export class GameState {
    public BLOCK_SIZE: number = 25;
    public BOARD_SIZE: Coordinates = { x: 800, y: 600 };
    public positions: BoardPosition[] = [];
    public pause: boolean = false;
    public movementSpeed: number = 5;
    public snakeHeadPrevPos: Coordinates[] = [];
    public snakeBodies: SnakeBody[] = [];
    public snakeTail: SnakeTail;

    constructor() {
        this.listenForGamePause();
        this.createBoard();
    }

    public createBoard(): void {
        let i = 0;
        for (let x = 0; x < this.BOARD_SIZE.x; x += this.BLOCK_SIZE) {
            for (let y = 0; y < this.BOARD_SIZE.y; y += this.BLOCK_SIZE) {
                this.positions.push(new BoardPosition(i, x, y));
                i -= -1;
            }
        }
    }

    public listenForGamePause(): void {
        window.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e && e.key) {
                if (e.key.toLowerCase() == KEYS.P) {
                    this.pause = !this.pause;
                } else {
                    return;
                }
            }
        });
    }
}
