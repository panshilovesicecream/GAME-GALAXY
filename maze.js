const canvas = document.getElementById('maze');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');
let score = 0;
let mazeGenerated = false;

// Maze Dimensions and Configuration
const mazeWidth = canvas.width;
const mazeHeight = canvas.height;
const cellSize = 40; // size of each maze cell
const spriteSize = 40; // size of the sprites (match to your images)
let playerPosition = { x: 0, y: 0 }; // Start position of player sprite
let goalPosition = { x: mazeWidth - cellSize, y: mazeHeight - cellSize }; // Goal position (door)

// Load sprite images
const playerImage = new Image();
const doorImage = new Image();
playerImage.src = 'playrr.png'; // Path to player image
doorImage.src = 'alien.png'; // Path to door image

// Generate a simple maze pattern
function drawMaze() {
  ctx.clearRect(0, 0, mazeWidth, mazeHeight);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;

  // Drawing the maze lines
  for (let i = 0; i < mazeWidth; i += cellSize) {
    for (let j = 0; j < mazeHeight; j += cellSize) {
      // Randomly decide whether to draw horizontal or vertical lines
      if (Math.random() > 0.5) {
        // Draw horizontal line
        ctx.beginPath();
        ctx.moveTo(i, j);
        ctx.lineTo(i + cellSize, j);
        ctx.stroke();
      } else {
        // Draw vertical line
        ctx.beginPath();
        ctx.moveTo(i, j);
        ctx.lineTo(i, j + cellSize);
        ctx.stroke();
      }
    }
  }
}

// Draw sprites (player and door)
function drawSprites() {
  // Draw player sprite
  ctx.drawImage(playerImage, playerPosition.x, playerPosition.y, spriteSize, spriteSize);

  // Draw goal (door) sprite
  ctx.drawImage(doorImage, goalPosition.x, goalPosition.y, spriteSize, spriteSize);
}

// Start Game Function
function startGame() {
  if (!mazeGenerated) {
    drawMaze();
    drawSprites();
    mazeGenerated = true;
  }
  score = 0;
  updateScore();
}

// Update score display
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// Move player sprite with keyboard
window.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'ArrowUp':
      if (playerPosition.y > 0) playerPosition.y -= cellSize;
      break;
    case 'ArrowDown':
      if (playerPosition.y < mazeHeight - cellSize) playerPosition.y += cellSize;
      break;
    case 'ArrowLeft':
      if (playerPosition.x > 0) playerPosition.x -= cellSize;
      break;
    case 'ArrowRight':
      if (playerPosition.x < mazeWidth - cellSize) playerPosition.x += cellSize;
      break;
  }

  // Check if player reached the goal
  if (playerPosition.x === goalPosition.x && playerPosition.y === goalPosition.y) {
    score += 10;
    updateScore();
    alert("You reached the goal!");
    playerPosition = { x: 0, y: 0 }; // Reset position
  }

  // Redraw the maze and sprites after movement
  drawMaze();
  drawSprites();
});

// Start button event listener
startBtn.addEventListener('click', startGame);
