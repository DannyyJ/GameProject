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
