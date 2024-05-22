window.focus;
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
let mainCanvas = document.getElementById("mainCanvas");
mainCanvas.height = SCREENHEIGHT;
mainCanvas.width = SCREENWIDTH;
window.sessionStorage.clear()
let gameCanvas = document.getElementById("gameCanvas");

window.onload = function () {
  const START_BTN = document.getElementById("STARTBTN");
  const CHOOSE = document.getElementById("CHOOSE");
  const BACK_BTN = document.getElementById("BACK");
  const P1 = document.getElementById("P1");

  START_BTN.addEventListener("click", function (event) {
    event.preventDefault(); // Förhindra standardbeteendet för länkar
    CHOOSE.style.display = "block";
    START_BTN.style.display = "none";
  });

  BACK_BTN.addEventListener("click", function (event) {
    event.preventDefault(); // Förhindra standardbeteendet för länkar
    CHOOSE.style.display = "none";
    P1.style.display = "none";
    START_BTN.style.display = "block";
  });

  document.getElementById("1P").addEventListener("click", function (event) {
    event.preventDefault(); // Förhindra standardbeteendet för länkar
    CHOOSE.style.display = "none";
    P1.style.display = "block";
  });
};
const hardbutton = document.getElementById("HARD");
hardbutton.addEventListener("click", function () {
  window.sessionStorage.setItem("background", 'url("Images/dojo.gif")');
});
