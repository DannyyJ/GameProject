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
class Player {
  constructor(hp, x, y, dx, dy, speed, radius, width, height) {
    this.hp = hp;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.speed = speed;
    this.radius = radius;
    this.width = width;
    this.height = height;
    this.direction = {
      Right: false,
      FastRight: false,
      Left: false,
      FastLeft: false,
      Up: false,
      Down: false,
      Shift: false,
    };
  }
}

// Så här fungerar detta:
//Player(liv, vart spelaren är horizontellt, vertikalt, hastigheten horizontellt, vertikalt, speed variabel,
// radius på spriten, bredden, höjden)
let player = new Player(100, 200, 200, 3, 3, 3, 20, 30, 200);
let newPlayer = new Player(100, 900, 200, 3, 3, 3, 20, 30, 200);

//Hp för player 1
function displayPlayer1HP() {
  const player1Display = document.getElementById("player1Display");

  const player1Text = `${player.hp}Hp`;

  player1Display.textContent = player1Text;

  player1Display.style.left = `${player.x + 60}px`;
  player1Display.style.top = `${player.y - player.height / 2 + 130}px`;
}
//Hp för player 2
function displayPlayer2HP() {
  const player2Display = document.getElementById("player2Display");

  const player2Text = `${newPlayer.hp}Hp`;

  player2Display.textContent = player2Text;

  player2Display.style.left = `${newPlayer.x + 120}px`;
  player2Display.style.top = `${newPlayer.y - newPlayer.height / 2 + 130}px`;
}

// -------------------------------------
// ------------ Player movement ------------
let isAnimating = false;
let newIsAnimating = false;
let isJumping = false;
let isMoving = false;

//Alla "new" konstander tillhåller player 2

document.addEventListener("keydown", (e) => {
  if (isAnimating) {
    return; // Om animation håller på, låt inte player göra något
  }
  if (newIsAnimating) {
    return; // Om animation håller på, låt inte player göra något
  }
  if (e.key === "Shift" && player.dx < player.speed * 2) {
    player.dx *= 2;
  }
  if (e.key === "b" && newPlayer.dx < newPlayer.speed * 2) {
    newPlayer.dx *= 2;
  }
  //player 1:
  switch (e.key) {
    case "A":
    case "a":
      if (e.repeat) return;
      player.direction.Left = true;
      spriteAnimation = yOffset;
      break;
    case "D":
    case "d":
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
    //player 2:
    case "J":
    case "j":
      if (e.repeat) return;
      newPlayer.direction.Left = true;
      newSpriteAnimation = yOffset;
      break;
    case "L":
    case "l":
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

// Sprites:
let spriteSheet1 = new Image();
spriteSheet1.src = "Images/Samurai-sprite-transparant1.png";
let widthDivider1 = 6.575;
let heightDivider1 = 5.8;
spriteSheet1.onload = function () {
  let spriteSheet1Width = spriteSheet1.width / 6.575;
  let spriteSheet1Height = spriteSheet1.height / 5.8;
  console.log("SpriteSheet1 Width: ", spriteSheet1.width);
  console.log("SpriteSheet1 Height: ", spriteSheet1.height);
  console.log("Calculated SpriteSheet1 Width: ", spriteSheet1Width);
  console.log("Calculated SpriteSheet1 Height: ", spriteSheet1Height);
};

let spriteSheet2 = new Image();
spriteSheet2.src = "Images/Samurai-sprite-transparant2.png";
let widthDivider2 = 6.2;
let heightDivider2 = 5.4;
spriteSheet2.onload = function () {
  let spriteSheet2Width = spriteSheet2.width / 6.575;
  let spriteSheet2Height = spriteSheet2.height / 5.8;
  console.log("SpriteSheet2 Width: ", spriteSheet2.width);
  console.log("SpriteSheet2 Height: ", spriteSheet2.height);
  console.log("Calculated SpriteSheet2 Width: ", spriteSheet2Width);
  console.log("Calculated SpriteSheet2 Height: ", spriteSheet2Height);
};

let redSpriteSheet1 = new Image();
redSpriteSheet1.src = "Images/Samurai-sprite-transparant1 red.png";
let redSpriteSheet1Width = redSpriteSheet1.width / 6.575;
let redSpriteSheet1Height = spriteSheet1.height / 5.8;

let redSpriteSheet2 = new Image();
redSpriteSheet2.src = "Images/Samurai-sprite-transparant2 red.png";
let redSpriteSheet2Width = redSpriteSheet2.width / 6.575;
let redSpriteSheet2Height = spriteSheet2.height / 5.8;

console.log(spriteSheet1.height);

// Gravity:
const Gravity = 0.5;

// Jumping för min character / spriten
let jumping = true;

let frameIndex = 0.4;
const yOffset = spriteSheet1.height / 5.4;
const totalFrames = 6;
const scale = 1;
const blankFrames = [4, 5];

let lastTimestamp = 0,
  maxFPS = 15,
  timestep = 1000 / maxFPS;

function draw(timestamp) {
  // if sats för att det inte ska bli för hög FPS
  if (timestamp - lastTimestamp < timestep) {
    // Väntar på att starta animationen
    requestAnimationFrame(draw);
    return;
  }
  // Här ritar man
  lastTimestamp = timestamp;

  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Canvasen tömms här

  frameIndex = (frameIndex + 1) % totalFrames;
  // Ritar den frame som är på frameIndex med skalan i scale

  // Se till att frameIndex inte blir högre än antalet frames. Börja om på frame 0 i så fall.
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
    frameIndex * (spriteSheet.width / widthDivider), // Beräknar framens x koordinat
    spriteAnimation, // vilken animation som spelaren ska ta på sig
    spriteSheet.width / widthDivider,
    spriteSheet.height / heightDivider,
    spriteX1, // Ritar på x-koordinat 0 på canvas
    spriteY1, // Ritar på y-koordinat 0 på canvas
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
  c.scale(-1, 1); //här flippar vi enemy sprite horizontallt

  let flippedX = -spriteX2 - (spriteSheet.width / widthDivider) * scale;

  c.drawImage(
    newSpriteSheet,
    frameIndex * (spriteSheet.width / widthDivider), // Beräknar framens x koordinat
    spriteAnimation, // vilken animation som spelaren ska ta på sig
    spriteSheet.width / widthDivider,
    spriteSheet.height / heightDivider,
    flippedX, // Ritar på x-koordinat 0 på canvas
    spriteY2, // Ritar på y-koordinat 0 på canvas
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
    player.dy -= 10; // Jump höjd för player 1
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
    newPlayer.dy -= 10; // Jump höjd för player 2
    isJumping = true;
  } else if (
    newPlayer.direction.Down &&
    newPlayer.y + newPlayer.height < gameCanvas.height
  ) {
    newPlayer.y += newPlayer.dy;
  }
}

function game() {
  requestAnimationFrame(game); // Gör att spelet körs om och om och om och om igen :)
  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Rensar skärmen.

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

  displayPlayer1HP();
  displayPlayer2HP();

  if (newPlayer.hp <= 0) {
    document.getElementById("conditionalText1").classList.remove("hidden");
    document.getElementById("conditionalText1").classList.add("visible");
    toggleAudio();
  } else {
    document.getElementById("conditionalText1").classList.remove("visible");
    document.getElementById("conditionalText1").classList.add("hidden");
  }
  if (player.hp <= 0) {
    document.getElementById("conditionalText2").classList.remove("hidden");
    document.getElementById("conditionalText2").classList.add("visible");
    toggleAudio();
  } else {
    document.getElementById("conditionalText2").classList.remove("visible");
    document.getElementById("conditionalText2").classList.add("hidden");
  }
}

// -------------------------------------
// ------------ Start game ------------

gameCanvas.style.backgroundImage = window.sessionStorage.getItem("background");
game();
