/* eslint-disable prefer-destructuring */
const canvas = document.getElementById('grid');
const ctx = canvas.getContext('2d');
let activeShape = null;
let isPaused = false;
const gridSize = 50;
document.addEventListener('keydown', e => {
  switch (e.key) {
    // case 'ArrowDown':
    //     moveShape()
    //   console.log('down');
    //   break;
    // case 'ArrowUp':
    //   console.log('up');
    //   break;
    case 'ArrowRight':
      moveShape(0, 1);
      break;
    case 'ArrowLeft':
      moveShape(0, -1);
      break;
    case 'ArrowUp':
      rotateShape(activeShape);
      break;
    case ' ':
      e.preventDefault();
      isPaused = !isPaused;
      break;
    default:
      break;
  }
});
const grid = [];

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
// const rotateXCoord = (px, py, ox, oy) =>
//   Math.cos(90) * (px - ox) - Math.sin(90) * (-py - -oy) + ox;
// const rotateYCoord = (px, py, ox, oy) =>
//   Math.sin(90) * (px - ox) + Math.cos(90) * (-py - -oy) + -oy;
// const rotateShape = shape => {
//   shape.forEach(coord => {
//     const newX = Math.abs(
//       rotateYCoord(coord[1], coord[0], shape[0][1], shape[0][0])
//     );
//     const newY = Math.abs(
//       rotateXCoord(coord[1], coord[0], shape[0][1], shape[0][0])
//     );
//     console.log();

//     console.log(coord[1], coord[0]);
//     console.log(newX, newY);
//     coord[0] = newY;
//     coord[1] = newX;
//   });
// };
const generateShape = shape => {
  shape.forEach(coord => {
    grid[coord[0]][coord[1]] = true;
  });
};
const getNewShape = () => {
  fetch('http://localhost:3000/api')
    .then(resp => resp.json())
    .then(data => {
      // console.log(data);
      const coords = JSON.parse(`[${data.coordinates}]`);
      activeShape = coords;
      generateShape(activeShape);
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
const moveShape = (y, x) => {
  let canStraif = true;
  activeShape.forEach(coord => {
    if (!(coord[1] + x >= 0 && (coord[1] + x) * 50 <= canvas.width - 50)) {
      canStraif = false;
    }
  });
  if (canStraif) {
    activeShape.forEach(coord => {
      coord[0] += y;
      coord[1] += x;
    });
  }
};
const fall = shape => {
  shape.forEach(coord => {
    grid[coord[0]][coord[1]] = false;
    coord[0] += 1;
  });
};

const checkBlockBelow = (y, x) => {
  let pieceBelow = false;
  activeShape.forEach(coord => {
    if (coord[0] === y + 1 && coord[1] === x) {
      pieceBelow = true;
    }
  });
  if (
    (y * gridSize < canvas.height - 50 && grid[y + 1][x] === false) ||
    pieceBelow === true
  ) {
    // !activeShape.includes(`[${y + 1}, ${x}]`)
    return true;
  }

  return false;
};
const shapeFall = () => {
  let ableToFall = true;
  activeShape.forEach(coord => {
    if (!checkBlockBelow(coord[0], coord[1])) {
      ableToFall = false;
    }
  });
  if (ableToFall) {
    fall(activeShape);
  } else {
    setTimeout(getNewShape(), 200);
  }
};
const checkForFullLine = () => {
  // loop through grid and check if we have any lines that are all true
  for (let i = 0; i < grid.length; i += 1) {
    let isRowFull = true;
    for (let x = 0; x < grid[i].length; x += 1) {
      if (grid[i][x] !== true) {
        isRowFull = false;
      }
    }
    if (isRowFull) {
      for (let y = i; y > 1; y -= 1) {
        for (let x = 0; x < grid[i].length; x += 1) {
          grid[y][x] = grid[y - 1][x];
        }
      }
    }
  }
};
const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  generateShape(activeShape);
  renderShapes();
  shapeFall();
  checkForFullLine();
  drawBoard();
};
const board = new Board();
getNewShape();
setInterval(() => {
  if (!isPaused) {
    gameLoop();
  }
}, 200);
