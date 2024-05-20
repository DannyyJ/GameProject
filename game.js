//  ------------ Setup ------------
window.focus;
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
let gameCanvas = document.getElementById("gameCanvas");
let c = gameCanvas.getContext("2d"); // Drawing object
gameCanvas.height = SCREENHEIGHT;
gameCanvas.width = SCREENWIDTH;
// -------------------------------------
let audioElement = document.getElementById("audioElement");

audioElement.autoplay = true;
audioElement.volume = 0; // Sätt volymen till 0 för att tyst spela ljudet
audioElement.pause();
function toggleAudio() {
  if (audioElement.paused) {
    audioElement.play();
  } else {
    audioElement.currentTime = 0;
  }
}

// Player variables
let player = {
  hp: 100,
  x: 200,
  y: 200,
  dx: 3,
  dy: 3,
  speed: 3,
  radius: 20,
  width: 30,
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

let newPlayer = {
  hp: 100,
  x: 900,
  y: 200,
  dx: 3,
  dy: 3,
  speed: 3,
  radius: 20,
  width: 30,
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
let newIsAnimating = false;
let isJumping = false;
let isMoving = false;

//Alla "new" konstander tillhåller player 2

document.addEventListener("keydown", (e) => {
  // console.log("trycker ner", e.key);
  if (isAnimating) {
    return; // Don't allow other actions if animation is ongoing
  }
  if (newIsAnimating) {
    return; // Don't allow other actions if animation is ongoing
  }
  if (e.key === "Shift" && player.dx < player.speed * 2) {
    player.dx *= 2;
  }
  if (e.key === "b" && newPlayer.dx < newPlayer.speed * 2) {
    newPlayer.dx *= 2;
  }
  switch (e.key) {
    case "A":
    case "a":
      if (e.repeat) return;
      player.direction.Left = true;
      spriteAnimation = yOffset;
      break;
    case "D":
    case "d":
      // console.log("Fastright is first:", player.direction.FastRight);
      if (e.repeat) return;
      player.direction.Right = true;
      spriteAnimation = yOffset;
      break;
    case "W":
    case "w":
      player.direction.Up = true;
      isJumping = true;
      isOnGround = false;
      break;
    case "S":
    case "s":
      if (e.repeat) return;
      player.direction.Down = true;
      break;
    case "F":
    case "f":
      if (checkCollision(player, newPlayer)) {
        newPlayer.hp -= 20;
        console.log(newPlayer.hp);
      }
      isAnimating = true;
      spriteAnimation = 3 * yOffset;
      disableMovement1();
      break;
    //player 2 movement:
    case "J":
    case "j":
      if (e.repeat) return;
      newPlayer.direction.Left = true;
      newSpriteAnimation = yOffset;
      break;
    case "L":
    case "l":
      // console.log("Fastright is first:", player.direction.FastRight);
      if (e.repeat) return;
      newPlayer.direction.Right = true;
      newSpriteAnimation = yOffset;
      break;
    case "I":
    case "i":
      newPlayer.direction.Up = true;
      isJumping = true;
      isOnGround = false;
      break;
    case "K":
    case "k":
      if (e.repeat) return;
      newPlayer.direction.Down = true;
      break;
    case "H":
    case "h":
      if (checkCollision(newPlayer, player)) {
        player.hp -= 20;
        console.log(player.hp);
      }
      newIsAnimating = true;
      newSpriteAnimation = 3 * yOffset;
      disableMovement2();
      break;
    default:
      break;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Shift" && player.dx > player.speed) {
    player.dx /= 2;
  }

  if (e.key === "b" && newPlayer.dx > newPlayer.speed) {
    newPlayer.dx /= 2;
  }

  console.log(e.key);
  switch (e.key) {
    case "Shift":
      player.direction.Shift = false;
      player.direction.FastLeft = false;
      player.direction.FastRight = false;
      player.direction.Right = false;
      player.direction.Left = false;
      spriteAnimation = 0;
      player.dx = player.speed;
      console.log("shift");
      break;
    case "B":
    case "b":
      newPlayer.direction.Shift = false;
      newPlayer.direction.FastLeft = false;
      newPlayer.direction.FastRight = false;
      newPlayer.direction.Right = false;
      newPlayer.direction.Left = false;
      newSpriteAnimation = 0;
      newPlayer.dx = newPlayer.speed;
      console.log("b");
    case "A":
    case "a":
      player.direction.Left = false;
      spriteAnimation = 0;
      break;
    case "D":
    case "d":
      player.direction.Right = false;
      spriteAnimation = 0;
      break;
    case "W":
    case "w":
      player.direction.Up = false;
      isJumping = false;
      spriteSheet = spriteSheet1;
      spriteAnimation = 0;
      break;
    case "S":
    case "s":
      player.direction.Down = false;
      break;
    case "F":
    case "f":
      isAnimating = false;
      enableMovement1();
      spriteAnimation = 0;
      break;
    case "J":
    case "j":
      console.log("hej");
      newPlayer.direction.Left = false;
      newSpriteAnimation = 0;
      break;
    case "L":
    case "l":
      newPlayer.direction.Right = false;
      newSpriteAnimation = 0;
      break;
    case "I":
    case "i":
      newPlayer.direction.Up = false;
      isJumping = false;
      newSpriteSheet = redSpriteSheet1;
      newSpriteAnimation = 0;
      break;
    case "K":
    case "k":
      newPlayer.direction.Down = false;
      break;
    case "H":
    case "h":
      newIsAnimating = false;
      enableMovement2();
      newSpriteAnimation = 0;
      break;
    default:
      break;
  }
});

function disableMovement1() {
  if (!player.direction.Shift) {
    player.direction.Left = false;
    player.direction.FastLeft = false;
    player.direction.Right = false;
    player.direction.FastRight = false;
  }
  player.direction.Up = false;
  player.direction.Down = false;
}

function disableMovement2() {
  if (!newPlayer.direction.Shift) {
    newPlayer.direction.Left = false;
    newPlayer.direction.FastLeft = false;
    newPlayer.direction.Right = false;
    newPlayer.direction.FastRight = false;
  }
  newPlayer.direction.Up = false;
  newPlayer.direction.Down = false;
}

function enableMovement1() {
  disableMovement1();
}

function enableMovement2() {
  disableMovement2();
}

// Character sprites:
let spriteSheet1 = new Image();
spriteSheet1.src = "Images/Samurai-sprite-transparant1.png";
let spriteSheet1Width = spriteSheet1.width / 6.575;
let spriteSheet1Heigth = spriteSheet1.height / 5.8;
let widthDivider1 = 6.575;
let heightDivider1 = 5.8;

let spriteSheet2 = new Image();
spriteSheet2.src = "Images/Samurai-sprite-transparant2.png";
let spriteSheet2Width = spriteSheet2.width / 6.575;
let spriteSheet2Height = spriteSheet2.height / 5.8;
let widthDivider2 = 6.2;
let heightDivider2 = 5.4;

let redSpriteSheet1 = new Image();
redSpriteSheet1.src = "Images/Samurai-sprite-transparant1 red.png";
let redSpriteSheet1Width = redSpriteSheet1.width / 6.575;
let redSpriteSheet1Height = spriteSheet1.height / 5.8;

let redSpriteSheet2 = new Image();
redSpriteSheet2.src = "Images/Samurai-sprite-transparant2 red.png";
let redSpriteSheet2Width = redSpriteSheet2.width / 6.575;
let redSpriteSheet2Height = spriteSheet2.height / 5.8;

// Gravity:
const Gravity = 0.5;

// Jumping för min character / spriten
let jumping = true;
// let jumpHeight = 150;
// let jumpVelocity = -10;

let frameIndex = 0.4;
// let frameindexSword = 0.4;
const yOffset = spriteSheet1.height / 5.4;
const totalFrames = 6;
const totalFramesHealth = 2;
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

let newSpriteAnimation = 0;

let spriteSheet = spriteSheet1;

let newSpriteSheet = redSpriteSheet1;

function drawPlayer1(
  spriteSheet,
  heightDivider,
  widthDivider,
  frameIndex,
  spriteAnimation
) {
  do {
    frameIndex = (frameIndex + 1) % totalFrames;
  } while (blankFrames.includes(Math.floor(frameIndex)));

  let spriteX1 = player.x;
  let spriteY1 = player.y;

  c.drawImage(
    spriteSheet,
    frameIndex * (spriteSheet.width / widthDivider), // Beräknar framens x-koordinat
    spriteAnimation, // 0, // 0, // Framens y-koordinat är alltid 0
    spriteSheet.width / widthDivider,
    spriteSheet.height / heightDivider,
    spriteX1, // 0, // Ritar på x-koordinat 0 på canvas
    spriteY1, // 0, // Ritar på y-koordinat 0 på canvas
    (spriteSheet.height / heightDivider) * scale,
    (spriteSheet.width / widthDivider) * scale
  );
}

function drawPlayer2(
  newSpriteSheet,
  heightDivider,
  widthDivider,
  frameIndex,
  spriteAnimation
) {
  do {
    frameIndex = (frameIndex + 1) % totalFrames;
  } while (blankFrames.includes(Math.floor(frameIndex)));

  let spriteX2 = newPlayer.x;
  let spriteY2 = newPlayer.y;

  c.save();
  c.scale(-1, 1); //här flippar vi enemy sprite horizontally

  let flippedX = -spriteX2 - (spriteSheet.width / widthDivider) * scale;

  c.drawImage(
    newSpriteSheet,
    frameIndex * (spriteSheet.width / widthDivider), // Beräknar framens x-koordinat
    spriteAnimation, // 0, // 0, // Framens y-koordinat är alltid 0
    spriteSheet.width / widthDivider,
    spriteSheet.height / heightDivider,
    flippedX, // 0, // Ritar på x-koordinat 0 på canvas
    spriteY2, // 0, // Ritar på y-koordinat 0 på canvas
    (spriteSheet.height / heightDivider) * scale,
    (spriteSheet.width / widthDivider) * scale
  );
  c.restore();
}

//Kolla ifall spelare är i spelare
function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

//Funktion för att player rör sig
function updatePlayerPosition() {
  if (player.dx <= player.speed) {
    spriteSheet = spriteSheet1;
  }

  if (isJumping) {
    spriteSheet = spriteSheet2;
    spriteAnimation = yOffset;
  }
  //Player 1
  if (player.direction.Right && player.dx > player.speed) {
    spriteAnimation = 2 * yOffset;
  }
  if (player.direction.Left && player.dx > player.speed) {
    spriteSheet = spriteSheet2;
    spriteAnimation = yOffset;
  }

  if (
    player.direction.FastRight &&
    player.x + player.width < gameCanvas.width
  ) {
    player.x += player.dx * 3;
    isMoving = true;
  }
  if (player.direction.Right && player.x + player.width < gameCanvas.width) {
    player.x += player.dx;
  }
  if (player.direction.Left && player.direction.FastLeft && player.x > 0) {
    player.x -= player.dx * 3;
    isMoving = true;
  }
  if (player.direction.Left && player.x > 0) {
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
  //Player 2
  if (newPlayer.dx <= newPlayer.speed) {
    newSpriteSheet = redSpriteSheet1;
  }

  if (newPlayer.direction.Right && newPlayer.dx > player.speed) {
    newSpriteSheet = redSpriteSheet2;
    newSpriteAnimation = yOffset;
  }
  if (newPlayer.direction.Left && newPlayer.dx > player.speed) {
    newSpriteAnimation = 2 * yOffset;
  }

  if (
    newPlayer.direction.FastRight &&
    newPlayer.x + newPlayer.width < gameCanvas.width
  ) {
    newPlayer.x += newPlayer.dx * 3;
    isMoving = true;
  }
  if (
    newPlayer.direction.Right &&
    newPlayer.x + newPlayer.width < gameCanvas.width
  ) {
    newPlayer.x += newPlayer.dx;
  }
  if (
    newPlayer.direction.Left &&
    newPlayer.direction.FastLeft &&
    newPlayer.x > 0
  ) {
    newPlayer.x -= newPlayer.dx * 3;
    isMoving = true;
  }
  if (newPlayer.direction.Left && newPlayer.x > 0) {
    newPlayer.x -= newPlayer.dx;
  } else {
    isMoving = false;
  }

  if (
    newPlayer.direction.Up &&
    newPlayer.y + newPlayer.height >= gameCanvas.height - 2
  ) {
    newPlayer.dy -= 10; // Jump height
    isJumping = true;
  } else if (
    newPlayer.direction.Down &&
    newPlayer.y + newPlayer.height < gameCanvas.height
  ) {
    newPlayer.y += newPlayer.dy;
  }
}

function game() {
  requestAnimationFrame(game); // Run gameloop recursively
  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Clear screen

  drawPlayer1(
    spriteSheet,
    heightDivider1,
    widthDivider1,
    frameIndex,
    spriteAnimation
  );

  drawPlayer2(
    newSpriteSheet,
    heightDivider1,
    widthDivider1,
    frameIndex,
    newSpriteAnimation
  );

  //Hantera gravity och så att han inte faller genom marken
  player.y += player.dy;
  player.dy += Gravity;

  newPlayer.y += newPlayer.dy;
  newPlayer.dy += Gravity;

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

  if (newPlayer.y + newPlayer.height > gameCanvas.height) {
    newPlayer.y = gameCanvas.height - newPlayer.height;
    newPlayer.dy = 0;
    isJumping = false;
    isOnGround = true;
  }

  updatePlayerPosition();

  if (player.hp <= 0 || newPlayer.hp <= 0) {
    document.getElementById("conditionalText").classList.remove("hidden");
    document.getElementById("conditionalText").classList.add("visible");
    console.log("död");
    toggleAudio();
  } else {
    document.getElementById("conditionalText").classList.remove("visible");
    document.getElementById("conditionalText").classList.add("hidden");
    console.log("lever");
  }
}

// -------------------------------------
// ------------ Start game ------------
game();
