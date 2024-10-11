const canvas = document.getElementById("can");
const ctx = canvas.getContext("2d");

const BLOCK_WIDTH = 50;
const BLOCK_HEIGHT = 50;

class Directions {
    RIGHT = "right";
    LEFT = "left";
    UP = "up";
    DOWN = "down";
}
/*
create rects in every square of the canvas as possible
480000 total pixels / 100 pixels of a block

*/
function drawBlock() {
    const colors = ['black', 'yellow', 'blue', 'green', 'red']
    // colors[Math.floor(Math.random() * colors.length)]
    for (let x = 0; x < 800; x += 50) {
        for (let y = 0; y < 600; y += 50) {
            // ctx.fillStyle = 'black';
            ctx.beginPath()
            ctx.rect(x, y, BLOCK_HEIGHT, BLOCK_WIDTH);
            ctx.stroke();
        }
    }
}

console.log((canvas.height * canvas.width) / 250);
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBlock();
    requestAnimationFrame(gameLoop);
}

gameLoop();
