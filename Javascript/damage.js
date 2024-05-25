let damageTimeout;
let playerDamageInterval = null;

//Timer för efter anatal tid som player gör damage
function startDamageTimer() {
  // Starta timer för nästa damage
  damageTimeout = setTimeout(() => {
    takeDamage1();
  }, 500);
}

// Om man släpper "F" eleler "H" ska denna funktion kallas på som resetar timern
function stopDamageTimer() {
  clearTimeout(damageTimeout);
}

// Funktion för om man håller in "F" eller "H" så slår man och gör damage över tid (20 per 500millisekunder)
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
