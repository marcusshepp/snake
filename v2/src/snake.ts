import { BoardPosition, GameState } from "./game";

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

    private speed: number = 5;
    private direction: string;
    private state: GameState;

    constructor(state: GameState) {
        this.state = state;
        this.listenToKeyboardInputs();
    }

    public moveContinuously(): void {
        if (this.direction === DIRECTIONS.UP) {
            this.y -= this.speed;
        } else if (this.direction === DIRECTIONS.DOWN) {
            this.y += this.speed;
        } else if (this.direction === DIRECTIONS.LEFT) {
            this.x -= this.speed;
        } else {
            this.x += this.speed;
        }
        console.log("pos: ", this.currentBlockPosition());
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
                this.moveContinuously();
                this.isIdle = false;
            }
        });
    }
}
