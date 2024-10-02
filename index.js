const canvas = document.getElementById('can');
const ctx = canvas.getContext('2d');
ctx.font = '25px OCR A Std, monospace';
ctx.fillStyle = 'white';

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
    direction = null;
    x = 70;
    y = 70;
    prevPositions = [];
    height = 30;
    width = 30;
    speed = 4;
    tails = 0;
    lives = 3;
    constructor() {}
}

let snake = new Snake();

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

let food = new Food();

class Barrier {
    x = null;
    y = null;
    w = null;
    h = null;
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    isColliding = () => {
        return (
            this.x < snake.x + snake.width &&
            this.x + this.w > snake.x &&
            this.y < snake.y + snake.height &&
            this.y + this.h > snake.y
        );
    };
}

class Level {
    barriers = [];
    number = 1;
    constructor() {}
}

let updateScore = () => {
    snake.tails += 1;
};

let drawScore = () => {
    const score = `Score: ${snake.tails}`;
    ctx.fillText(score, 650, 585);
};

let drawLives = () => {
    const lives = `Lives: ${snake.lives}`;
    ctx.fillText(lives, 650, 30);
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
    }
    snake.x += snake.speed;
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
    // last 500 positions
    snake.prevPositions.push({ x: snake.x, y: snake.y });
    if (snake.prevPositions.length > 500) {
        snake.prevPositions.shift();
    }
};

let createHorB = (x, y) => {
    let b1 = new Barrier(x, y, 200, 20);
    ctx.fillRect(b1.x, b1.y, b1.w, b1.h);
    return b1;
};

let createVirtB = (x, y) => {
    let b1 = new Barrier(x, y, 20, 200);
    ctx.fillRect(b1.x, b1.y, b1.w, b1.h);
    return b1;
};

let createLevel = () => {
    let b1 = createHorB(30, 30);
    let b2 = createVirtB(30, 30);
    let b3 = createHorB(300, 100);
    let b4 = createVirtB(100, 300);
    const barrs = [b1, b2, b3, b4];
    if (barrs.some((b) => b.isColliding())) {
        snake.lives--;
        snake.x = 70;
        snake.y = 70;
        snake.direction = null;
    }
    /*
    theres gotta be a better way to do this
    I need the x,y coor of all the parts of the map that aren't allowed
    but how,
    do I rethink the map in its entirety?
    do I type out each individual x,y that's off limits?
    if I do create objects for each wall, then I can use the starting x, y 
    and the height and width to calc all the bad x, y coor that it generates
    similar to the isEaten function on the Food
    offlimits parts of the map.
    Color all those white.
    Then I can detect if player collides with those boundaries.
    */
};

let drawLevel = () => {};

function gameLoop() {
    if (this.paused) {
        ctx.fillText('Paused', 10, 20);
    }
    if (!this.paused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (cat) {
            createLevel();
            setPrevPositions();
            moveSnake();
            handleBoundary();
            tailLogic();
            drawFoodAndUpdateScore();
        }
    }
    drawLives();
    drawScore();
    requestAnimationFrame(gameLoop);
}

gameLoop();
