import { BoardPosition, Coordinates, GameState } from "./state";

enum DIRECTIONS {
    RIGHT = "right",
    LEFT = "left",
    UP = "up",
    DOWN = "down",
}

export class SnakeHead {
    public x: number = 50;
    public y: number = 50;
    public isIdle: boolean = true;

    private coorLastDirectionChange: Coordinates;
    private direction: string;
    private state: GameState;
    private speed: number;

    constructor(state: GameState) {
        this.state = state;
        this.speed = state.movementSpeed;
        this.listenToKeyboardInputs();
    }

    public get degrees(): number {
        if (this.direction === DIRECTIONS.UP) {
            return 0;
        } else if (this.direction === DIRECTIONS.DOWN) {
            return 180;
        } else if (this.direction === DIRECTIONS.LEFT) {
            return 270;
        } else {
            return 90;
        }
    }

    public moveSnake(): void {
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

        this.borderDetection();
        this.recordCurrentPos();
        this.calculateBodyPositions();
    }

    public currentBlockPosition(): number {
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
        this.state.snakeHeadPrevPos.push({
            x: this.x,
            y: this.y,
        } as Coordinates);
    }

    private listenToKeyboardInputs(): void {
        window.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e && e.key) {
                if (e.key == "ArrowDown" && this.direction != DIRECTIONS.UP) {
                    this.direction = DIRECTIONS.DOWN;
                } else if (
                    e.key == "ArrowUp" &&
                    this.direction != DIRECTIONS.DOWN
                ) {
                    this.direction = DIRECTIONS.UP;
                } else if (
                    e.key == "ArrowLeft" &&
                    this.direction != DIRECTIONS.RIGHT
                ) {
                    this.direction = DIRECTIONS.LEFT;
                } else if (
                    e.key == "ArrowRight" &&
                    this.direction != DIRECTIONS.LEFT
                ) {
                    this.direction = DIRECTIONS.RIGHT;
                } else {
                    return;
                }
                this.isIdle = false;
            }
        });
    }

    private recordCoorWhenDirChange(): void {
        // i need the direction the snake head changed here as well
    }

    private calculateBodyPositions(): void {
        this.state.snakeBodies.forEach((b: SnakeBody): void => {
            b.calcPos();
        });
    }

    private borderDetection(): void {
        if (
            this.x > this.state.BOARD_SIZE.x ||
            this.x < 0 ||
            this.y > this.state.BOARD_SIZE.y ||
            this.y < 0
        ) {
            this.x = this.state.BOARD_SIZE.x / 2;
            this.y = this.state.BOARD_SIZE.y / 2;
        }
    }
}

export class SnakeBody {
    public x: number;
    public y: number;
    public index: number;
    public element: HTMLImageElement;

    private state: GameState;
    private speed: number;

    constructor(state: GameState, index: number) {
        this.state = state;
        this.speed = state.movementSpeed;
        this.index = index;
        state.snakeBodies.push(this);
    }

    public get degrees(): number {
        return 0;
    }

    public calcPos(): void {
        const howManyBehind: number = this.index;
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

    public currentBlockPosition(): number {
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
}

export class SnakeTail {
    constructor() {}
}
