const canvas = document.getElementById('can');
const ctx = canvas.getContext('2d');
ctx.font = '25px OCR A Std, monospace';

let cat;
let loadCat = () => {
    let img = new Image();
    img.style.width = '100px';
    img.style.height = '100px';
    img.addEventListener('load', () => {
        cat = img;
    });
    img.src = 'cat.jpg';
    document.getElementsByTagName('body')[0].appendChild(img);
    img.style.display = 'none';
};
window.addEventListener('load', loadCat);

let mouse;
let loadMouse = () => {
    let img = new Image();
    img.style.width = '100px';
    img.style.height = '100px';
    img.addEventListener('load', () => {
        mouse = img;
    });
    img.src = 'mouse.jpg';
    document.getElementsByTagName('body')[0].appendChild(img);
    img.style.display = 'none';
};
window.addEventListener('load', loadMouse);

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
    direction = DIRECTIONS.DOWN;
    x = 50;
    y = 50;
    prevPositions = [];
    height = 30;
    width = 30;
    speed = 4;
    tails = 0;
    constructor() {}
}

class Food {
    x = null;
    y = null;
    height = 25;
    width = 25;
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
    snake.tails += 1;
};

let drawScore = () => {
    const score = `Score: ${snake.tails}`;
    ctx.fillText(score, 650, 585);
};

window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() == 'p') {
        this.paused = !this.paused;
    }
});

window.addEventListener('keydown', (e) => {
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
});

let handleBoundary = () => {
    let isLeft = snake.direction == DIRECTIONS.LEFT;
    let isRight = snake.direction == DIRECTIONS.RIGHT;
    let isDown = snake.direction == DIRECTIONS.DOWN;
    let isUp = snake.direction == DIRECTIONS.UP;

    if (snake.x <= 0 && isLeft) {
        snake.x = 800;
    } else if (snake.x >= 790 && isRight) {
        snake.x = 0;
    } else if (snake.y >= 590 && isDown) {
        snake.y = 0;
    } else if (snake.y <= 0 && isUp) {
        snake.y = 590;
    }
};

let tailLogic = () => {
    /*
    follow logic 

    head snake x,y
    head snake keeps track of its last 100 positions
    each tail should be x number of positions behind the head
    use length of snake last pos array to find where tail should be 

    TODO this fails after about 50 points
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
        ctx.drawImage(cat, pos.x, pos.y, snake.width, snake.height);
    }
};

let moveSnake = () => {
    let isLeft = snake.direction == DIRECTIONS.LEFT;
    let isRight = snake.direction == DIRECTIONS.RIGHT;
    let isDown = snake.direction == DIRECTIONS.DOWN;
    let isUp = snake.direction == DIRECTIONS.UP;

    if (isUp) {
        snake.y -= snake.speed;
    } else if (isDown) {
        snake.y += snake.speed;
    } else if (isLeft) {
        snake.x -= snake.speed;
    } else if (isRight) {
        snake.x += snake.speed;
    }
    ctx.drawImage(cat, snake.x, snake.y, snake.width, snake.height);
};

let drawFoodAndUpdateScore = () => {
    ctx.drawImage(mouse, food.x, food.y, food.width, food.height);
    if (food.isEaten(snake)) {
        food = new Food();
        updateScore();
    }
};
let setPrevPositions = () => {
    // this array should be limited in some way
    snake.prevPositions.push({ x: snake.x, y: snake.y });
    if (snake.prevPositions.length > 500) {
        snake.prevPositions.shift();
    }
};
function gameLoop() {
    if (this.paused) {
        ctx.fillText('Paused', 10, 20);
    }
    if (!this.paused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (cat) {
            setPrevPositions();
            moveSnake();
            handleBoundary();
            tailLogic();
            drawFoodAndUpdateScore();
        }
    }
    drawScore();
    requestAnimationFrame(gameLoop);
}

gameLoop();
