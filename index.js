const canvas = document.getElementById("can");
const ctx = canvas.getContext("2d");

let score = 0;

class Directions {
  RIGHT = "right";
  LEFT = "left";
  UP = "up";
  DOWN = "down";
}

const DIRECTIONS = new Directions();

let generateRandCoor = () => {
  const x = Math.floor(Math.random() * canvas.width);
  const y = Math.floor(Math.random() * canvas.height);
  return { x, y };
};

class Snake {
  direction = DIRECTIONS.RIGHT;
  x = 50;
  y = 50;
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

let gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";

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
    snake.x = canvas.width / 2;
    snake.y = canvas.height / 2;
  }
  ctx.fillRect(snake.x, snake.y, snake.width, snake.height);

  for (let i = 0; i < snake.tails; i++) {
    ctx.fillRect(snake.x + 100, snake.y + 100, snake.width, snake.height);
  }

  ctx.fillStyle = "blue";
  ctx.fillRect(food.x, food.y, food.width, food.height);
  if (food.isEaten(snake)) {
    food = new Food();
    score++;
    snake.tails += 1;
    document.getElementById("score").innerHTML = `Score: ${score}`;
  }

  requestAnimationFrame(gameLoop);
};

let moveSq = (e) => {
  if (e && e.key) {
    if (e.key == "ArrowDown") {
      snake.direction = DIRECTIONS.DOWN;
    } else if (e.key == "ArrowUp") {
      snake.direction = DIRECTIONS.UP;
    } else if (e.key == "ArrowLeft") {
      snake.direction = DIRECTIONS.LEFT;
    } else if (e.key == "ArrowRight") {
      snake.direction = DIRECTIONS.RIGHT;
    }
  }
};

window.addEventListener("keydown", moveSq);

gameLoop();
