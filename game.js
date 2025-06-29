// Create the full HTML structure using JS
document.documentElement.innerHTML = ''; // Clear any existing content
document.title = 'Car Drifting Game';

// Add basic styles
const style = document.createElement('style');
style.textContent = `
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #111;
  }
  canvas {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
  }
`;
document.head.appendChild(style);

// Create canvas
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Resize canvas to fill screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Car setup
const car = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 50,
  height: 30,
  angle: 0,
  speed: 0,
  maxSpeed: 10,
  acceleration: 0.3,
  friction: 0.98,
};

const keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// Game loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Speed control
  if (keys['ArrowUp']) {
    car.speed = Math.min(car.speed + car.acceleration, car.maxSpeed);
  } else if (keys['ArrowDown']) {
    car.speed = Math.max(car.speed - car.acceleration, -car.maxSpeed);
  } else {
    car.speed *= car.friction;
  }

  // Turning
  if (keys['ArrowLeft']) car.angle -= 0.05;
  if (keys['ArrowRight']) car.angle += 0.05;

  // Move car
  car.x += car.speed * Math.cos(car.angle);
  car.y += car.speed * Math.sin(car.angle);

  // Wrap around screen
  if (car.x > canvas.width) car.x = 0;
  if (car.x < 0) car.x = canvas.width;
  if (car.y > canvas.height) car.y = 0;
  if (car.y < 0) car.y = canvas.height;

  // Draw car
  ctx.save();
  ctx.translate(car.x, car.y);
  ctx.rotate(car.angle);
  ctx.fillStyle = 'red';
  ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
  ctx.restore();

  requestAnimationFrame(update);
}

update();
