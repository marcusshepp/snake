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

    private speed: number = 25;
    private direction: string;

    constructor() {
        this.listenToKeyboardInputs();
    }

    public moveContinuously() {
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

    public moveOne() {
        if (this.direction === DIRECTIONS.UP) {
            this.y -= this.speed * 2;
        } else if (this.direction === DIRECTIONS.DOWN) {
            this.y += this.speed * 2;
        } else if (this.direction === DIRECTIONS.LEFT) {
            this.x -= this.speed * 2;
        } else {
            this.x += this.speed * 2;
        }
    }

    public foo() {}

    private currentBlock() {}

    private listenToKeyboardInputs() {
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
                this.moveOne();
                this.isIdle = false;
            }
        });
    }
}
