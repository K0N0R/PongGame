var Ball = (function () {
    function Ball(chosenPlayerName, posX, posY) {
        this.pos = { x: 0, y: 0 };
        this.movV = { x: 0, y: 0 };
        this.speed = 15;
        this.size = 18;
        this.color = "white";
        this.wallCollCounter = 0;
        this.isInMotion = false;
        this.chosenPlayerName = "";
        this.chosenPlayerName = chosenPlayerName;
        this.pos.x = posX;
        this.pos.y = posY;
    }
    Ball.Render = function () {
        if (Ball.Balls.length < 1) {
            var PlayerChoose = [PlayerUP, PlayerDOWN];
            var randomPlayer = Math.round(Math.random());
            Ball.Balls.push(new Ball(PlayerChoose[randomPlayer].name, PlayerChoose[randomPlayer].pos.x + 9, PlayerChoose[randomPlayer].pos.y + 9 + PlayerChoose[randomPlayer].sizeY * 1.5));
        }
        Ball.Motion(Ball.Balls[0].chosenPlayerName);
        Ball.CheckCollision();
        Ball.Draw();
        Ball.Remove();
    };
    Ball.Remove = function () {
        for (var i = 0; i < Ball.Balls.length; i++) {
            if ((Ball.Balls[i].pos.y > 850)) {
                PlayerUP.Score++;
                Ball.Balls.splice(i, 1);
                break;
            }
            if ((Ball.Balls[i].pos.y < -50)) {
                PlayerDOWN.Score++;
                Ball.Balls.splice(i, 1);
                break;
            }
            if ((Ball.Balls[i].wallCollCounter > 3)) {
                Ball.Balls.splice(i, 1);
            }
        }
    };
    Ball.Motion = function (name) {
        for (var i = 0; i < Ball.Balls.length; i++) {
            if (Ball.Balls[i].isInMotion) {
                Ball.Balls[i].movV = NormalizeVectorLength(Ball.Balls[i].movV);
                Ball.Balls[i].pos.x += Ball.Balls[i].movV.x * Ball.Balls[i].speed;
                Ball.Balls[i].pos.y += Ball.Balls[i].movV.y * Ball.Balls[i].speed;
            }
            else {
                if (name === "down") {
                    Ball.Balls[i].pos.x = PlayerDOWN.pos.x + 9;
                    if ((Keyboard.keys[PlayerDOWN.pushBall])) {
                        Ball.Balls[i].movV.x = PlayerDOWN.movX * 0.5;
                        Ball.Balls[i].movV.y = -1 * Ball.Balls[i].speed;
                        Ball.Balls[i].isInMotion = true;
                    }
                }
                if (name === "up") {
                    Ball.Balls[i].pos.x = PlayerUP.pos.x + 9;
                    if (Keyboard.keys[PlayerUP.pushBall]) {
                        Ball.Balls[i].movV.x = PlayerUP.movX * 0.3;
                        Ball.Balls[i].movV.y = Ball.Balls[i].speed;
                        Ball.Balls[i].isInMotion = true;
                    }
                }
            }
        }
    };
    Ball.CheckCollision = function () {
        for (var i = 0; i < Ball.Balls.length; i++) {
            if ((Ball.Balls[i].pos.x > canvas.width - Ball.Balls[i].size) || (Ball.Balls[i].pos.x < Ball.Balls[i].size / 2)) {
                Ball.Balls[i].wallCollCounter++;
                Ball.Balls[i].movV.x = -Ball.Balls[i].movV.x * 2.5;
                Ball.Balls[i].movV.y = Ball.Balls[i].movV.y * 2.5;
            }
            if ((Ball.Balls[i].pos.x < (PlayerUP.pos.x + PlayerUP.sizeX / 2) + 1.5 * Ball.Balls[i].size) && (Ball.Balls[i].pos.x > (PlayerUP.pos.x - PlayerUP.sizeX / 2) - Ball.Balls[i].size / 2) && (Ball.Balls[i].pos.y < (PlayerUP.pos.y + PlayerUP.sizeY / 2) + Ball.Balls[i].size) && (Ball.Balls[i].pos.y > (PlayerUP.pos.y - PlayerUP.sizeY / 2) - Ball.Balls[i].size)) {
                Ball.Balls[i].wallCollCounter = 0;
                Ball.Balls[i].pos.y += 5;
                Ball.Balls[i].movV.y = Ball.Balls[i].movV.y * -2;
                Ball.Balls[i].speed *= 1.01;
                Ball.Balls[i].movV.x = Ball.Balls[i].movV.x + PlayerUP.movX * 0.1;
            }
            if ((Ball.Balls[i].pos.x < (PlayerDOWN.pos.x + PlayerDOWN.sizeX / 2) + 1.5 * Ball.Balls[i].size) && (Ball.Balls[i].pos.x > (PlayerDOWN.pos.x - PlayerDOWN.sizeX / 2) - Ball.Balls[i].size / 2) && (Ball.Balls[i].pos.y > (PlayerDOWN.pos.y + PlayerDOWN.sizeY / 2) - Ball.Balls[i].size / 2) && (Ball.Balls[i].pos.y < (PlayerDOWN.pos.y - PlayerDOWN.sizeY / 2) + Ball.Balls[i].size)) {
                Ball.Balls[i].wallCollCounter = 0;
                Ball.Balls[i].pos.y -= 5;
                Ball.Balls[i].movV.y = Ball.Balls[i].movV.y * -2;
                Ball.Balls[i].speed *= 1.01;
                Ball.Balls[i].movV.x = Ball.Balls[i].movV.x + PlayerDOWN.movX * 0.1;
            }
        }
    };
    Ball.Draw = function () {
        for (var i = 0; i < Ball.Balls.length; i++) {
            ctx.beginPath();
            ctx.arc(Ball.Balls[i].pos.x - Ball.Balls[i].size / 2, Ball.Balls[i].pos.y - Ball.Balls[i].size / 2, Ball.Balls[i].size, 0, 2 * Math.PI, false);
            ctx.fillStyle = Ball.Balls[i].color;
            ctx.fill();
        }
    };
    Ball.Balls = new Array();
    return Ball;
})();
var Board = (function () {
    function Board() {
        this.playerUP = new Player("up", 50, "white", 40, 37, 39, 100, 20);
        this.playerDOWN = new Player("down", 750, "white", 83, 65, 68, 100, -20);
        this.ball = new Ball();
    }
    return Board;
})();
function GetAngleFromVector(v) {
    return Math.atan2(v.y, v.x) + Math.PI / 2;
}
function NormalizeVectorFromPoints(v1, v2) {
    var Vlength = GetDistance(v1, v2);
    return { x: (v1.x - v2.x) / Vlength, y: (v1.y - v2.y) / Vlength };
}
function GetDistance(p1, p2) {
    var vx = p1.x - p2.x;
    var vy = p1.y - p2.y;
    var Vlength = Math.sqrt(vx * vx + vy * vy);
    return Vlength;
}
function NormalizeVectorLength(p) {
    var Vlength = Math.sqrt(p.x * p.x + p.y * p.y);
    return { x: p.x / Vlength, y: p.y / Vlength };
}
var Keyboard = (function () {
    function Keyboard() {
    }
    Keyboard.start = function () {
        window.onkeydown = function keypress(evt) {
            Keyboard.keys[evt.keyCode] = true;
        };
        window.onkeyup = function keypress(evt) {
            Keyboard.keys[evt.keyCode] = false;
        };
    };
    Keyboard.keys = new Array(200);
    return Keyboard;
})();
var canvas;
var ctx;
var PlayerUP;
var PlayerDOWN;
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    PlayerUP.Render();
    PlayerDOWN.Render();
    Ball.Render();
    requestAnimationFrame(loop);
}
window.onload = function () {
    canvas = document.getElementById("MainCanvas");
    ctx = canvas.getContext("2d");
    Keyboard.start();
    PlayerUP = new Player("up", 50, "white", 40, 37, 39, 100, 20);
    PlayerDOWN = new Player("down", 750, "white", 83, 65, 68, 100, -20);
    loop();
};
var Player = (function () {
    function Player(name, posY, color, pushBall, steerLeft, steerRight, sizeX, sizeY) {
        this.Score = 0;
        this.name = "";
        this.pos = { x: 350, y: 0 };
        this.movX = 0;
        this.color = "black";
        this.pushBall = 0;
        this.steerLeft = 0;
        this.steerRight = 0;
        this.sizeX = 0;
        this.sizeY = 0;
        this.name = name;
        this.pos.y = posY;
        this.color = color;
        this.pushBall = pushBall;
        this.steerLeft = steerLeft;
        this.steerRight = steerRight;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }
    Player.prototype.Render = function () {
        this.CheckingMovmentKey();
        this.pos.x += this.movX;
        this.CheckCollision();
        this.ScoreDrawer();
        this.Draw();
    };
    Player.prototype.ScoreDrawer = function () {
        ctx.fillStyle = "white";
        ctx.font = "bold 50px Six Caps";
        ctx.fillText(this.Score.toString(), 350, canvas.height / 2 - 2 * this.sizeY);
    };
    Player.prototype.CheckingMovmentKey = function () {
        if (Keyboard.keys[this.steerLeft]) {
            if (this.movX === -10) {
                this.movX = -10;
            }
            else {
                this.movX -= 1.5;
            }
        }
        else if (Keyboard.keys[this.steerRight]) {
            if (this.movX === 10) {
                this.movX = 10;
            }
            else {
                this.movX += 1.5;
            }
        }
        else {
            this.movX *= 0.85;
        }
    };
    Player.prototype.CheckCollision = function () {
        if (this.pos.x > canvas.width - this.sizeX / 2) {
            this.pos.x = canvas.width - this.sizeX / 2;
            this.movX = -this.movX / 2;
        }
        if (this.pos.x < this.sizeX / 2) {
            this.pos.x = this.sizeX / 2;
            this.movX = -this.movX / 2;
        }
    };
    Player.prototype.Draw = function () {
        ctx.beginPath();
        ctx.rect(this.pos.x - this.sizeX / 2, this.pos.y - this.sizeY / 2, this.sizeX, this.sizeY);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    return Player;
})();
