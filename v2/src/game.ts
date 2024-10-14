/*
    I want there to be a board of blocks. Each block represents a 
    current position for the head, bodies and tail of the snake.
    If I keep track of the top left coordinates of each block,
    that will give me the information I need as long as each block 
    is the same size.
    This will give me the ability to:
    - detect where the snake and all it's nodes are ie 
    what board position they are in.
    - detect if two nodes are in the same position.
*/

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
    public positions: BoardPosition[] = [];
    constructor() {}

    public createBoard() {
        let i = 0;
        for (let x = 0; x < 600; x += this.BLOCK_SIZE) {
            for (let y = 0; y < 800; y += this.BLOCK_SIZE) {
                this.positions.push(new BoardPosition(i, x, y));
                i -= -1;
            }
        }
    }
}
