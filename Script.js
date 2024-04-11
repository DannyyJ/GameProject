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
  dx: 3,
  dy: 3,
  speed: 3,
  radius: 20,
  width: 200,
  height: 200,
  direction: {
    Right: false,
    FastRight: false,
    Left: false,
    FastLeft: false,
    Up: false,
    Down: false,
    Shift: false,
  },
};

// -------------------------------------
// ------------ Player movement ------------
let isAnimating = false;
let isJumping = false;
let isMoving = false;

document.addEventListener("keydown", (e) => {
  // console.log("trycker ner", e.key);
  if (isAnimating) {
    return; // Don't allow other actions if animation is ongoing
  }
  console.log(player.dx);
  if (e.key === "Shift" && player.dx < player.speed * 2) {
    player.dx *= 2;
  }
  // if (player.direction.Shift == true) {
  //   console.log("Håller ner shift och trycker", e.key);
  // If Shift key is pressed, increase player's movement speed
  // console.log(e.key);

  switch (e.key) {
    case "a":
      if (e.repeat) return;
      player.direction.Left = true;
      spriteAnimation = yOffset;
      break;
    case "d":
      // console.log("Fastright is first:", player.direction.FastRight);
      if (e.repeat) return;
      player.direction.Right = true;
      spriteAnimation = yOffset;
      break;
    case "w":
      player.direction.Up = true;
      isJumping = true;
      spriteAnimation = yOffset;
      spriteSheet = spriteSheet2;
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
  // if (e.key == "Shift") {
  //   player.direction.Shift = false;
  // }

  // if (player.direction.Shift == true) {
  //   disableMovement();
  // }
  if (e.key === "Shift" && player.dx > player.speed) {
    player.dx /= 2;
  }
  if (player.direction.Left == true) {
    spriteAnimation = yOffset;
  }
  if (player.direction.Right == true) {
    spriteAnimation = yOffset;
  }
  switch (e.key) {
    case "Shift":
      player.direction.Shift = false;
      player.direction.FastLeft = false;
      player.direction.FastRight = false;
      player.direction.Right = false;
      player.direction.Left = false;
      spriteAnimation = 0;
      player.dx = player.speed;
      break;
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
  if (!player.direction.Shift) {
    player.direction.Left = false;
    player.direction.FastLeft = false;
    player.direction.Right = false;
    player.direction.FastRight = false;
  }
  player.direction.Up = false;
  player.direction.Down = false;
}

function enableMovement() {
  disableMovement();
}

// Character sprites:
let spriteSheet1 = new Image();
spriteSheet1.src = "Samurai-sprite-transparant1.png";
let spriteSheet1Width = spriteSheet1.width / 6.575;
let spriteSheet1Heigth = spriteSheet1.height / 5.8;
let widthDivider1 = 6.575;
let heightDivider1 = 5.8;

let spriteSheet2 = new Image();
spriteSheet2.src = "Samurai-sprite-transparant2.png";
let spriteSheet2Width = spriteSheet2.width / 6.575;
let spriteSheet2Height = spriteSheet2.height / 5.8;
let widthDivider2 = 6.2;
let heightDivider2 = 5.4;

// Gravity:
const Gravity = 0.5;

// Jumping för min character / spriten
let jumping = false;
// let jumpHeight = 150;
// let jumpVelocity = -10;

let frameIndex = 0.4;
// let frameindexSword = 0.4;
const yOffset = spriteSheet1.height / 5.4;
const totalFrames = 6;
const scale = 1;
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

  frameIndex = (frameIndex + 1) % totalFrames;
  // Ritar den frame som är på frameIndex med skalan i scale

  // Se till att frameIndex inte blir högre än antalet frames. Börja om på frame 0 i så fall.
  // frameindexSword = (frameIndex + 1) % totalFramesSword;
  requestAnimationFrame(draw);
}

spriteSheet1.onload = requestAnimationFrame(draw);

// -------------------------------------
// ------------ Animation ------------

let spriteAnimation = 0;

let spriteSheet = spriteSheet1;

function drawPlayer(spriteSheet, heightDivider, widthDivider, frameIndex) {
  do {
    frameIndex = (frameIndex + 1) % totalFrames;
  } while (blankFrames.includes(Math.floor(frameIndex)));

  let spriteX = player.x;
  let spriteY = player.y;

  c.drawImage(
    spriteSheet,
    frameIndex * (spriteSheet.width / widthDivider), // Beräknar framens x-koordinat
    spriteAnimation, // 0, // 0, // Framens y-koordinat är alltid 0
    spriteSheet.width / widthDivider,
    spriteSheet.height / heightDivider,
    spriteX, // 0, // Ritar på x-koordinat 0 på canvas
    spriteY, // 0, // Ritar på y-koordinat 0 på canvas
    (spriteSheet.height / heightDivider) * scale,
    (spriteSheet.width / widthDivider) * scale
  );
}
function updatePlayerPosition() {
  if (player.direction.Right && player.dx > player.speed) {
    spriteAnimation = 2 * yOffset;
  }
  if (player.direction.Left && player.dx > player.speed) {
    spriteSheet = spriteSheet2;
    spriteAnimation = yOffset;
  }
  if (player.dx <= player.speed) {
    spriteSheet = spriteSheet1;
  }
  if (
    player.direction.FastRight &&
    player.x + player.width < gameCanvas.width
  ) {
    player.x += player.dx * 3;
    isMoving = true;
  } else if (
    player.direction.Right &&
    player.x + player.width < gameCanvas.width
  ) {
    player.x += player.dx;
  } else if (
    player.direction.Left &&
    player.direction.FastLeft &&
    player.x > 0
  ) {
    player.x -= player.dx * 3;
    isMoving = true;
  } else if (player.direction.Left && player.x > 0) {
    player.x -= player.dx;
  } else {
    isMoving = false;
  }

  if (
    player.direction.Up &&
    player.y + player.height >= gameCanvas.height - 2
  ) {
    player.dy -= 10; // Jump height
    isJumping = true;
  } else if (
    player.direction.Down &&
    player.y + player.height < gameCanvas.height
  ) {
    player.y += player.dy;
  }
}

function game() {
  requestAnimationFrame(game); // Run gameloop recursively
  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Clear screen

  drawPlayer(spriteSheet, heightDivider1, widthDivider1, frameIndex);

  //Hantera gravity och så att han inte faller genom marken
  player.y += player.dy;
  player.dy += Gravity;

  if (player.y + player.height >= gameCanvas.height - 2) {
    isJumping = false; // Player is no longer jumping
  }
  //En liten kollision manick som bestämmer vad som händer när träffar marken
  if (player.y + player.height > gameCanvas.height) {
    player.y = gameCanvas.height - player.height;
    player.dy = 0;
    isJumping = false;
    isOnGround = true;
  }

  if (isJumping) {
    spriteSheet = spriteSheet2;
    spriteAnimation = 0;
  }
  updatePlayerPosition();
}

// -------------------------------------
// ------------ Start game ------------
game();
