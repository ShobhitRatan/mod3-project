/* eslint-disable prefer-destructuring */
const canvas = document.getElementById('grid');
const ctx = canvas.getContext('2d');
const gridSize = 50;

const grid = [];
const emptyLine = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];
class Shape {
  //   constructor(x = gridSize * 4, y = 0, shape) {
  //     this.x = x;
  //     this.y = y;
  //     this.shape = shape;
  //     ctx.fillStyle = 'green';
  //     if (shape === 'line') {
  //       ctx.fillRect(this.x, this.y, gridSize, gridSize);
  //       ctx.fillRect(this.x + gridSize * 1, this.y, gridSize, gridSize);
  //       ctx.fillRect(this.x + gridSize * 2, this.y, gridSize, gridSize);
  //       ctx.fillRect(this.x + gridSize * 3, this.y, gridSize, gridSize);
  //     }
  //   }
}
class Board {
  constructor() {
    for (let x = 0; x <= canvas.height; x += 50) {
      grid.push([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]);
    }
  }
}
const testShape = [
  ['X', 'X', 'X', 'X', true, true, true, true, 'X', 'X', 'X', 'X'],
  ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
];
function drawBoard() {
  for (let x = 0; x <= canvas.height; x += 50) {
    ctx.moveTo(0, x);
    ctx.lineTo(canvas.width, x);
  }
  for (let i = 0; i <= canvas.width; i += 50) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
  }

  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.strokeStyle = 'black';
  ctx.stroke();
}
console.log(grid);

const generateShape = shape => {
  grid[0] = shape[0];
  grid[1] = shape[1];
  //   const newShape = new Shape(gridSize * 4, 0, 'line');
};
const renderShapes = () => {
  ctx.fillStyle = 'green';

  for (let i = 0; i < grid.length; i += 1) {
    for (let x = 0; x < grid[i].length; x += 1) {
      if (grid[i][x] === true) {
        ctx.fillRect(x * 50, i * 50, gridSize, gridSize);
      }
    }
  }
};

const shapeFall = i => {
  if (i + 1 < canvas.height / 50) {
    grid[i + 1] = grid[i];
    grid[i] = emptyLine;
  }
};

const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  renderShapes();
  drawBoard();
};
generateShape(testShape);
const board = new Board();
setInterval(() => {
  gameLoop();
}, 500);
