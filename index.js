const canvas = document.getElementById('can');
const ctx = canvas.getContext('2d');

let score = 0;
let paused = false;
class Directions {
    RIGHT = 'right';
    LEFT = 'left';
    UP = 'up';
    DOWN = 'down';
}

const DIRECTIONS = new Directions();

let randomIndex = (cap) => {
    return Math.ceil(Math.random() * cap);
};

let generateRandCoor = () => {
    const x = Math.floor(Math.random() * canvas.width);
    const y = Math.floor(Math.random() * canvas.height);
    return { x, y };
};

class Snake {
    direction = DIRECTIONS.RIGHT;
    x = 50;
    y = 50;
    prevPositions = [];
    height = 30;
    width = 30;
    speed = 4;
    tails = 0;
    constructor() {}

    isAtBoundary = () => {
        if (this.x + this.width > canvas.width + 30) {
            // right boundary
            return true;
        }
        if (this.y + this.height > canvas.height + 30) {
            // bottom boundary
            return true;
        }
        if (this.y - this.height < -30) {
            // top boundary
            return true;
        }
        if (this.x - this.width < -30) {
            // left boundary
            return true;
        }
    };

    reset = () => {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        const d = [
            DIRECTIONS.DOWN,
            DIRECTIONS.LEFT,
            DIRECTIONS.RIGHT,
            DIRECTIONS.UP,
        ];
        this.direction = randomIndex(d.length);
    };
}

class Food {
    x = null;
    y = null;
    height = 8;
    width = 8;
    constructor() {
        const coor = generateRandCoor();
        this.x = coor.x;
        this.y = coor.y;
    }

    isEaten = (snake) => {
        return (
            this.x < snake.x + snake.width &&
            this.x + this.width > snake.x &&
            this.y < snake.y + snake.height &&
            this.y + this.height > snake.y
        );
    };
}

let snake = new Snake();
let food = new Food();

let updateScore = () => {
    score++;
    document.getElementById('score').innerHTML = `Score: ${score}`;
};

window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() == 'p') {
        this.paused = !this.paused;
    }
});

let gameLoop = () => {
    if (!this.paused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';

        // this array should be limited in some way
        snake.prevPositions.push({ x: snake.x, y: snake.y });

        if (snake.direction == DIRECTIONS.UP) {
            snake.y -= snake.speed;
        } else if (snake.direction == DIRECTIONS.DOWN) {
            snake.y += snake.speed;
        } else if (snake.direction == DIRECTIONS.LEFT) {
            snake.x -= snake.speed;
        } else if (snake.direction == DIRECTIONS.RIGHT) {
            snake.x += snake.speed;
        }
        if (snake.isAtBoundary()) {
            snake.reset();
        }
        ctx.fillRect(snake.x, snake.y, snake.width, snake.height);

        /*
        follow logic 

        head snake x,y
        head snake keeps track of its last 100 positions
        each tail should be x number of positions behind the head
        use length of snake last pos array to find where tail should be 
        */

        let posIndex = snake.prevPositions.length - 10;
        let prevAssIndex;

        for (let i = 0; i < snake.tails; i++) {
            prevAssIndex = posIndex;
            if (i > 0) {
                posIndex = prevAssIndex - 10;
            }
            let pos = snake.prevPositions[posIndex];
            // ea tail is 10 index behind its parent
            ctx.fillRect(pos.x, pos.y, snake.width, snake.height);
        }

        ctx.fillStyle = 'blue';
        ctx.fillRect(food.x, food.y, food.width, food.height);
        if (food.isEaten(snake)) {
            food = new Food();
            snake.tails += 1;
            updateScore();
        }

        requestAnimationFrame(gameLoop);
    }
};

let moveSq = (e) => {
    if (e && e.key) {
        if (e.key == 'ArrowDown') {
            snake.direction = DIRECTIONS.DOWN;
        } else if (e.key == 'ArrowUp') {
            snake.direction = DIRECTIONS.UP;
        } else if (e.key == 'ArrowLeft') {
            snake.direction = DIRECTIONS.LEFT;
        } else if (e.key == 'ArrowRight') {
            snake.direction = DIRECTIONS.RIGHT;
        }
    }
};

window.addEventListener('keydown', moveSq);

gameLoop();
