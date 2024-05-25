let damageTimeout;
let playerDamageInterval = null;

//Timer för efter anatal tid som player gör damage
function startDamageTimer() {
  // Starta timer för nästa damage
  damageTimeout = setTimeout(() => {
    takeDamage1();
  }, 500); // Här är hur många millisekunder
}

// Om man släpper "F" eleler "H" ska denna funktion kallas på som resetar timern
function stopDamageTimer() {
  clearTimeout(damageTimeout);
}

// Funktion för om man håller in "F" eller "H" så slår man och gör damage över tid (20 hp per 500millisekunder)
function startDamageInterval(player) {
  playerDamageInterval = setInterval(() => {
    player.hp -= 20;
    console.log(player.hp);
  }, 500); // Här är hur många millisekunder
}

// Ifall man håller in så clearar man intervallet med damage som görs här.
function stopDamageInterval() {
  clearInterval(playerDamageInterval);
}

export {
  startDamageTimer,
  stopDamageTimer,
  startDamageInterval,
  stopDamageInterval,
};
