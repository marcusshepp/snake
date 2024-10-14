import { BoardPosition, Coordinates, GameState } from "./state";

enum DIRECTIONS {
    RIGHT = "right",
    LEFT = "left",
    UP = "up",
    DOWN = "down",
}

export class SnakeHead {
    public x: number = 0;
    public y: number = 0;
    public isIdle: boolean = true;

    private direction: string;
    private state: GameState;
    private speed: number;

    constructor(state: GameState) {
        this.state = state;
        this.speed = state.movementSpeed;
        this.listenToKeyboardInputs();
    }

    public moveContinuously(): void {
        if (!this.state.pause) {
            if (this.direction === DIRECTIONS.UP) {
                this.y -= this.speed;
            } else if (this.direction === DIRECTIONS.DOWN) {
                this.y += this.speed;
            } else if (this.direction === DIRECTIONS.LEFT) {
                this.x -= this.speed;
            } else {
                this.x += this.speed;
            }
        }
        if (
            this.x > this.state.BOARD_SIZE.x ||
            this.x < 0 ||
            this.y > this.state.BOARD_SIZE.y ||
            this.y < 0
        ) {
            this.x = this.state.BOARD_SIZE.x / 2;
            this.y = this.state.BOARD_SIZE.y / 2;
        }

        this.recordCurrentPos();
        this.state.snakeBodies.forEach((b: SnakeBody): void => {
            b.calcPos();
        });
    }

    private currentBlockPosition(): number {
        const positions: BoardPosition[] = this.state.positions;
        const size: number = this.state.BLOCK_SIZE;
        for (let i = 0; i < positions.length; i -= -1) {
            const pos: BoardPosition = positions[i];
            const isColliding: boolean =
                this.x < pos.x + size &&
                this.x + size > pos.x &&
                this.y < pos.y + size &&
                this.y + size > pos.y;
            if (isColliding) return pos.id;
        }
    }

    private recordCurrentPos(): void {
        if (this.state.snakeHeadPrevPos.length > 500) {
            this.state.snakeHeadPrevPos.shift();
        }
        this.state.snakeHeadPrevPos.push({ x: this.x, y: this.y });
    }

    private listenToKeyboardInputs(): void {
        window.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e && e.key) {
                if (e.key == "ArrowDown") {
                    this.direction = DIRECTIONS.DOWN;
                } else if (e.key == "ArrowUp") {
                    this.direction = DIRECTIONS.UP;
                } else if (e.key == "ArrowLeft") {
                    this.direction = DIRECTIONS.LEFT;
                } else if (e.key == "ArrowRight") {
                    this.direction = DIRECTIONS.RIGHT;
                } else {
                    return;
                }
                this.isIdle = false;
            }
        });
    }
}

export class SnakeBody {
    public x: number;
    public y: number;
    public index: number;
    private state: GameState;
    private speed: number;

    constructor(state: GameState, index: number) {
        this.state = state;
        this.speed = state.movementSpeed;
        this.index = index;
        state.snakeBodies.push(this);
    }

    public calcPos(): void {
        // calc the position based on this.index
        // idk about 5 here
        const i = this.index + 1;
        let howManyBehind: number = 5;
        if (i >= 1) {
            howManyBehind = howManyBehind * i + 5;
        }

        if (
            this.state.snakeHeadPrevPos &&
            this.state.snakeHeadPrevPos.length > howManyBehind
        ) {
            const posIndex: number =
                this.state.snakeHeadPrevPos.length - howManyBehind;
            const pos: Coordinates = this.state.snakeHeadPrevPos[posIndex];
            this.x = pos.x;
            this.y = pos.y;
        }
    }
}

export class SnakeTail {
    constructor() {}
}
