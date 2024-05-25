let damageTimeout;
let playerDamageInterval = null;

//Timer för efter anatal tid som player gör damage
function startDamageTimer() {
  // Starta timer
  damageTimeout = setTimeout(() => {
    takeDamage1();
  }, 500);
}

function stopDamageTimer() {
  // Clear the timeout if the "F" key is released before the 500 milliseconds
  clearTimeout(damageTimeout);
}

function startDamageInterval(player) {
  // Start an interval to repeatedly deal damage every 500 milliseconds
  playerDamageInterval = setInterval(() => {
    player.hp -= 20; // Deal damage to the player
    console.log(player.hp);
  }, 500);
}

function stopDamageInterval() {
  // Clear the interval when the "F" key is released
  clearInterval(playerDamageInterval);
}

export {
  startDamageTimer,
  stopDamageTimer,
  startDamageInterval,
  stopDamageInterval,
};
