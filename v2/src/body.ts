import { DIRECTIONS } from "./head";
import { GameState, Coordinates, BoardPosition } from "./state";

export class SnakeBody {
    public x: number;
    public y: number;
    public index: number;
    public element: HTMLImageElement;
    public degrees: number = 90;

    private xOffset: number = 15;
    private yOffset: number = 5;
    private state: GameState;

    constructor(state: GameState, index: number) {
        this.state = state;
        this.index = index;
        this.xOffset = state.bodyOffsetX;
        this.yOffset = state.bodyOffsetY;
        state.snakeBodies.push(this);
    }

    private get xWithOffset(): number {
        return this.x + this.xOffset;
    }

    private get yWithOffset(): number {
        return this.y + this.yOffset;
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
            // this.x = pos.x + this.xOffset;
            // this.y = pos.y + this.yOffset;
            // TODO offsetting is through off degree
            // change detection
            this.x = pos.x;
            this.y = pos.y;
        }
        this.changeDirection();
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

    private changeDirection(): void {
        const dirChanges: { coor: Coordinates; dir: string }[] =
            this.state.snakeHead.dirChanges;
        dirChanges.forEach((dc): void => {
            if (this.x === dc.coor.x && this.y === dc.coor.y) {
                if (dc.dir === DIRECTIONS.DOWN || dc.dir === DIRECTIONS.UP) {
                    this.degrees = 0;
                } else {
                    this.degrees = 90;
                }
            }
        });
    }
}
