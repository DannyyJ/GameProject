//Funktion för hur spelare ska röra sig när vissa values blir true eller false.

export function updatePlayerPosition(
  player,
  newPlayer,
  spriteSheet,
  newSpriteSheet,
  spriteAnimation,
  newSpriteAnimation,
  yOffset,
  gameCanvas,
  isJumping,
  isMoving,
  spriteSheet1,
  spriteSheet2,
  redSpriteSheet1,
  redSpriteSheet2
) {
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
  } else if (player.direction.Right) {
    spriteAnimation = yOffset;
  } else if (player.direction.Left) {
    spriteAnimation = yOffset; // or another value based on your animation
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
  return {
    spriteAnimation,
    newSpriteAnimation,
    spriteSheet,
    newSpriteSheet,
  };
}
