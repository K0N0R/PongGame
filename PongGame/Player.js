var Player = (function () {
    function Player(posY, color, steerLeft, steerRight) {
        this.pos = { x: 600, y: 0 };
        this.movX = 0;
        this.color = "black";
        this.steerLeft = 1;
        this.steerRight = 1;
        this.pos.y = posY;
        this.color = color;
        this.steerLeft = steerLeft;
        this.steerRight = steerRight;
    }
    Player.prototype.Render = function () {
        this.pos.x += this.movX;
        this.CheckCollision();
        this.Draw();
    };
    Player.prototype.Motion = function () {
        if (Keyboard.keys[this.steerLeft]) {
            this.movX = -10;
        }
        if (Keyboard.keys[this.steerRight]) {
            this.movX = 10;
        }
    };
    Player.prototype.CheckCollision = function () {
        if (this.pos.x > canvas.width - 50) {
            this.pos.x = canvas.width - 50;
            this.movX = -this.movX;
        }
        if (this.pos.x < 50) {
            this.pos.x = 50;
            this.movX = -this.movX;
        }
    };
    Player.prototype.Draw = function () {
        ctx.beginPath();
        ctx.rect(this.pos.x, this.pos.y, 100, 20);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    };
    return Player;
})();
//# sourceMappingURL=Player.js.map