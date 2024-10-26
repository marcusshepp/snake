import { SnakeBody } from "./body";
import { BoardPosition, Coordinates, GameState } from "./state";

export enum DIRECTIONS {
    RIGHT = "right",
    LEFT = "left",
    UP = "up",
    DOWN = "down",
}

export class SnakeHead {
    public x: number = 50;
    public y: number = 50;
    public isIdle: boolean = true;
    public dirChanges: { coor: Coordinates; dir: string }[] = [];

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
        const size: number = this.state.SNAKE_HEAD_SIZE;
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
                    this.recordCoorWhenDirChange(
                        this.x,
                        this.y,
                        DIRECTIONS.DOWN
                    );
                    this.direction = DIRECTIONS.DOWN;
                } else if (
                    e.key == "ArrowUp" &&
                    this.direction != DIRECTIONS.DOWN
                ) {
                    this.recordCoorWhenDirChange(this.x, this.y, DIRECTIONS.UP);
                    this.direction = DIRECTIONS.UP;
                } else if (
                    e.key == "ArrowLeft" &&
                    this.direction != DIRECTIONS.RIGHT
                ) {
                    this.recordCoorWhenDirChange(
                        this.x,
                        this.y,
                        DIRECTIONS.LEFT
                    );
                    this.direction = DIRECTIONS.LEFT;
                } else if (
                    e.key == "ArrowRight" &&
                    this.direction != DIRECTIONS.LEFT
                ) {
                    this.recordCoorWhenDirChange(
                        this.x,
                        this.y,
                        DIRECTIONS.RIGHT
                    );
                    this.direction = DIRECTIONS.RIGHT;
                } else {
                    return;
                }
                this.isIdle = false;
            }
        });
    }

    private recordCoorWhenDirChange(
        x: number,
        y: number,
        direction: string
    ): void {
        // i need the direction the snake head changed here as well
        // when the head changes direction I need to know where it changed dir
        // this will allow the bodies to know when to change direction
        this.dirChanges.push({ coor: { x, y }, dir: direction });
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

export class SnakeTail {
    constructor() {}
}
