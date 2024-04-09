//  ------------ Setup ------------
window.focus;
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
let gameCanvas = document.getElementById("gameCanvas");
let c = gameCanvas.getContext("2d"); // Drawing object
gameCanvas.height = SCREENHEIGHT;
gameCanvas.width = SCREENWIDTH;
// -------------------------------------
// Player variables
let player = {
  x: 200,
  y: 200,
  dx: 6,
  dy: 6,
  radius: 20,
  width: 200,
  height: 200,
  direction: {
    Right: false,
    Left: false,
    Up: false,
    Down: false,
  },
};

// -------------------------------------
// ------------ Player movement ------------
let isAnimating = false;

document.addEventListener("keydown", (e) => {
  if (isAnimating) {
    return; // Don't allow other actions if animation is ongoing
  }
  switch (e.key) {
    case "a":
      if (e.repeat) return;
      player.direction.Left = true;
      spriteAnimation = yOffset;
      break;
    case "d":
      if (e.repeat) return;
      player.direction.Right = true;
      spriteAnimation = yOffset;
      break;
    case "w":
      if (e.repeat) return;
      player.direction.Up = true;
      break;
    case "s":
      if (e.repeat) return;
      player.direction.Down = true;
      break;
    case "f":
      isAnimating = true;
      spriteAnimation = 3 * yOffset;
      disableMovement();
      break;
    default:
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "a":
      player.direction.Left = false;
      spriteAnimation = 0;
      break;
    case "d":
      player.direction.Right = false;
      spriteAnimation = 0;
      break;
    case "w":
      player.direction.Up = false;
      break;
    case "s":
      player.direction.Down = false;
      break;
    case "f":
      isAnimating = false;
      enableMovement();
      spriteAnimation = 0;
      break;
    default:
      break;
  }
});

function disableMovement() {
  player.direction.Left = false;
  player.direction.Right = false;
  player.direction.Up = false;
  player.direction.Down = false;
}

function enableMovement() {
  disableMovement();
}

// Character sprite:
let spriteSheet1 = new Image();
spriteSheet1.src = "Samurai-sprite-transparant1.png";
let spriteSheet1Width = spriteSheet1.width / 6.575;
let spriteSheet1Heigth = spriteSheet1.height / 5.8;

let frameIndex = 0.4;
// let frameindexSword = 0.4;
const yOffset = spriteSheet1.height / 5.4;
const totalFrames = 6;
const totalFramesSword = 4;
const scale = 1.25;
const blankFrames = [4, 5];

let lastTimestamp = 0,
  maxFPS = 15,
  timestep = 1000 / maxFPS;

function draw(timestamp) {
  //if-sats för "throttling". För att det inte ska bli för hög FPS
  if (timestamp - lastTimestamp < timestep) {
    // Vi ska vänta med att rita så vi avbryter funktionen.
    requestAnimationFrame(draw);
    return;
  }
  // OK, dags att rita!
  lastTimestamp = timestamp;

  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Tömmer canvasen

  // Ritar den frame som är på frameIndex med skalan i scale

  // Se till att frameIndex inte blir högre än antalet frames. Börja om på frame 0 i så fall.
  do {
    frameIndex = (frameIndex + 1) % totalFrames;
  } while (blankFrames.includes(Math.floor(frameIndex)));
  // frameindexSword = (frameIndex + 1) % totalFramesSword;
  requestAnimationFrame(draw);
}

spriteSheet1.onload = requestAnimationFrame(draw);
// bild = document.createElement("img");
// bild.src = "The rock.png";
// bild.classList.add("image100x100");
// playerImage.onload = () => {
//   game();
// };

// -------------------------------------
// ------------ Animation ------------

spriteAnimation = 0;

function game() {
  requestAnimationFrame(game); // Run gameloop recursively
  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Clear screen

  let spriteX = player.x;
  let spriteY = player.y;

  // c.fillRect(player.x, player.y, player.width, player.height); // Draw player
  // c.fillstyle = "red";
  c.drawImage(
    spriteSheet1,
    frameIndex * spriteSheet1Width, // Beräknar framens x-koordinat
    spriteAnimation, // 0, // 0, // Framens y-koordinat är alltid 0
    spriteSheet1Width,
    spriteSheet1Heigth,
    spriteX, // 0, // Ritar på x-koordinat 0 på canvas
    spriteY, // 0, // Ritar på y-koordinat 0 på canvas
    spriteSheet1Heigth * scale,
    spriteSheet1Width * scale
  );

  if (
    player.direction.Right == true &&
    player.x + player.width < gameCanvas.width
  ) {
    player.x += player.dx;
  } else if (player.direction.Left == true && player.x > 0) {
    player.x -= player.dx;
  } else if (player.direction.Up == true && player.y > 0) {
    player.y -= player.dy;
  } else if (
    player.direction.Down == true &&
    player.y + player.height < gameCanvas.height
  ) {
    player.y += player.dy;
  }

  // c.beginPath();
  // c.drawImage(playerImage, player.x, player.y, player.width, player.height);
  // c.stroke();
}

// -------------------------------------
// ------------ Start game ------------
game();
