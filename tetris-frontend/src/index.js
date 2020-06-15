/* eslint-disable prefer-destructuring */
const canvas = document.getElementById('grid');
const ctx = canvas.getContext('2d');
let activeShape = null;
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
<<<<<<< HEAD
class Shape {}
=======
class Shape {
    constructor(x = gridSize * 4, y = 0, shape) {
       this.x = x;
       this.y = y;
       this.shape = shape;
       ctx.fillStyle = 'green';
       if (shape === 'line') {
         ctx.fillRect(this.x, this.y, gridSize, gridSize);
         ctx.fillRect(this.x + gridSize * 1, this.y, gridSize, gridSize);
         ctx.fillRect(this.x + gridSize * 2, this.y, gridSize, gridSize);
         ctx.fillRect(this.x + gridSize * 3, this.y, gridSize, gridSize);
       }
     }
}
>>>>>>> b462170507bd3cf7cc05acb510e0d7bd31da396d
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
const testShape = {
  coords: [
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
  ],
};

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

const generateShape = shape => {
  activeShape = shape;
  shape.coords.forEach(coord => {
    grid[coord[0]][coord[1]] = true;
  });
};
const getNewShape = () => {
  generateShape({
    coords: [
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
    ],
  });
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
const fall = shape => {
  shape.coords.forEach(coord => {
    grid[coord[0]][coord[1]] = false;
    coord[0] += 1;
  });
};
const checkBlockBelow = (y, x) => {
  if (y * gridSize < canvas.height - 50 && grid[y + 1][x] === false)
    return true;
  return false;
};
const shapeFall = () => {
  let ableToFall = true;
  activeShape.coords.forEach(coord => {
    if (!checkBlockBelow(coord[0], coord[1])) {
      ableToFall = false;
    }
  });
  if (ableToFall) {
    fall(activeShape);
  } else {
    getNewShape();
  }
};

const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  generateShape(activeShape);
  renderShapes();
  shapeFall();
  drawBoard();
};
const board = new Board();
generateShape({
  coords: [
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
  ],
});
setInterval(() => {
  gameLoop();
}, 700);
