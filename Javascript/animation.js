import { updatePlayerPosition } from "./updatePlayerPosition.js";

// Sprites:
let spriteSheet1 = new Image();
spriteSheet1.src = "Images/Samurai-sprite-transparant1.png";
let widthDivider1 = 6.575;
let heightDivider1 = 5.8;
spriteSheet1.onload = function () {
  let spriteSheet1Width = spriteSheet1.width / 6.575;
  let spriteSheet1Height = spriteSheet1.height / 5.8;
};

let spriteSheet2 = new Image();
spriteSheet2.src = "Images/Samurai-sprite-transparant2.png";
let widthDivider2 = 6.2;
let heightDivider2 = 5.4;
spriteSheet2.onload = function () {
  let spriteSheet2Width = spriteSheet2.width / 6.575;
  let spriteSheet2Height = spriteSheet2.height / 5.8;
};

let redSpriteSheet1 = new Image();
redSpriteSheet1.src = "Images/Samurai-sprite-transparant1 red.png";
let redSpriteSheet1Width = redSpriteSheet1.width / 6.575;
let redSpriteSheet1Height = spriteSheet1.height / 5.8;

let redSpriteSheet2 = new Image();
redSpriteSheet2.src = "Images/Samurai-sprite-transparant2 red.png";
let redSpriteSheet2Width = redSpriteSheet2.width / 6.575;
let redSpriteSheet2Height = spriteSheet2.height / 5.8;

let frameIndex = 0.4;
const yOffset = spriteSheet1.height / 5.4;
let newSpriteAnimation = 0;
let newSpriteSheet = spriteSheet2;

const totalFrames = 6;
const scale = 1;
const blankFrames = [4, 5];

export function drawPlayer1(
  c,
  player,
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

export function drawPlayer2(
  c,
  player,
  spriteSheet,
  heightDivider,
  widthDivider,
  frameIndex,
  spriteAnimation
) {
  do {
    frameIndex = (frameIndex + 1) % totalFrames;
  } while (blankFrames.includes(Math.floor(frameIndex)));

  let spriteX2 = player.x;
  let spriteY2 = player.y;

  c.save();
  c.scale(-1, 1); //här flippar vi enemy sprite horizontallt

  let flippedX = -spriteX2 - (spriteSheet.width / widthDivider) * scale;

  c.drawImage(
    spriteSheet,
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
