var Ball = (function () {
    function Ball(chosenPlayer, posX, posY) {
        this.pos = { x: 0, y: 0 };
        this.movV = { x: 0, y: 0 };
        this.speed = 15;
        this.size = 18;
        this.color = "white";
        this.wallCollCounter = 0;
        this.isInMotion = false;
        this.chosenPlayer = chosenPlayer;
        this.pos.x = posX;
        this.pos.y = posY;
    }
    Ball.prototype.Render = function () {
        this.Motion();
        this.Draw();
    };
    Ball.prototype.Motion = function () {
        if (this.isInMotion) {
            this.movV = NormalizeVectorLength(this.movV);
            this.pos.x += this.movV.x * this.speed;
            this.pos.y += this.movV.y * this.speed;
        }
        else {
            this.pos.x = this.chosenPlayer.pos.x + 9;
            if ((Keyboard.keys[this.chosenPlayer.pushBall])) {
                this.movV.x = this.chosenPlayer.movX * 0.5;
                this.movV.y = this.chosenPlayer.Ydirection * this.speed;
                this.isInMotion = true;
            }
        }
    };
    Ball.prototype.Draw = function () {
        ctx.beginPath();
        ctx.arc(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    return Ball;
})();
var Board = (function () {
    function Board() {
        this.PlayerUP = new Player(50, "white", 40, 37, 39, 100, 20, 1);
        this.PlayerDOWN = new Player(750, "white", 83, 65, 68, 100, -20, -1);
        this.GetRandomPlayerForBall();
    }
    Board.prototype.GetRandomPlayerForBall = function () {
        var PlayerChoose = [this.PlayerUP, this.PlayerDOWN];
        var randomPlayer = Math.round(Math.random());
        this.BallFIRST = new Ball(PlayerChoose[randomPlayer], PlayerChoose[randomPlayer].pos.x + 9, PlayerChoose[randomPlayer].pos.y + 9 + PlayerChoose[randomPlayer].sizeY * 1.5);
    };
    Board.prototype.CheckBallCollision = function () {
        if ((this.BallFIRST.pos.x > canvas.width - this.BallFIRST.size) || (this.BallFIRST.pos.x < this.BallFIRST.size / 2)) {
            this.BallFIRST.wallCollCounter++;
            this.BallFIRST.movV.x = -this.BallFIRST.movV.x * 2.5;
            this.BallFIRST.movV.y = this.BallFIRST.movV.y * 2.5;
        }
        if ((this.BallFIRST.pos.x < (this.PlayerUP.pos.x + this.PlayerUP.sizeX / 2) + 1.5 * this.BallFIRST.size) && (this.BallFIRST.pos.x > (this.PlayerUP.pos.x - this.PlayerUP.sizeX / 2) - this.BallFIRST.size / 2) && (this.BallFIRST.pos.y < (this.PlayerUP.pos.y + this.PlayerUP.sizeY / 2) + this.BallFIRST.size) && (this.BallFIRST.pos.y > (this.PlayerUP.pos.y - this.PlayerUP.sizeY / 2) - this.BallFIRST.size)) {
            this.BallFIRST.wallCollCounter = 0;
            this.BallFIRST.pos.y += 5;
            this.BallFIRST.movV.y = this.BallFIRST.movV.y * -2;
            this.BallFIRST.speed *= 1.01;
            this.BallFIRST.movV.x = this.BallFIRST.movV.x + this.PlayerUP.movX * 0.1;
        }
        if ((this.BallFIRST.pos.x < (this.PlayerDOWN.pos.x + this.PlayerDOWN.sizeX / 2) + 1.5 * this.BallFIRST.size) && (this.BallFIRST.pos.x > (this.PlayerDOWN.pos.x - this.PlayerDOWN.sizeX / 2) - this.BallFIRST.size / 2) && (this.BallFIRST.pos.y > (this.PlayerDOWN.pos.y + this.PlayerDOWN.sizeY / 2) - this.BallFIRST.size / 2) && (this.BallFIRST.pos.y < (this.PlayerDOWN.pos.y - this.PlayerDOWN.sizeY / 2) + this.BallFIRST.size)) {
            this.BallFIRST.wallCollCounter = 0;
            this.BallFIRST.pos.y -= 5;
            this.BallFIRST.movV.y = this.BallFIRST.movV.y * -2;
            this.BallFIRST.speed *= 1.01;
            this.BallFIRST.movV.x = this.BallFIRST.movV.x + this.PlayerDOWN.movX * 0.1;
        }
    };
    Board.prototype.RemoveBall = function () {
        if ((this.BallFIRST.pos.y > 850)) {
            this.PlayerUP.Score++;
            this.GetRandomPlayerForBall();
        }
        if ((this.BallFIRST.pos.y < -50)) {
            this.PlayerDOWN.Score++;
            this.GetRandomPlayerForBall();
        }
        if ((this.BallFIRST.wallCollCounter > 3)) {
            this.GetRandomPlayerForBall();
        }
    };
    Board.prototype.Render = function () {
        this.PlayerUP.Render();
        this.PlayerDOWN.Render();
        this.BallFIRST.Render();
        this.CheckBallCollision();
        this.RemoveBall();
    };
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
var BoardFIRST;
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    BoardFIRST.Render();
    requestAnimationFrame(loop);
}
window.onload = function () {
    canvas = document.getElementById("MainCanvas");
    ctx = canvas.getContext("2d");
    Keyboard.start();
    BoardFIRST = new Board();
    loop();
};
var Player = (function () {
    function Player(posY, color, pushBall, steerLeft, steerRight, sizeX, sizeY, Ydirection) {
        this.pos = { x: 350, y: 0 };
        this.Score = 0;
        this.movX = 0;
        this.pos.y = posY;
        this.color = color;
        this.pushBall = pushBall;
        this.steerLeft = steerLeft;
        this.steerRight = steerRight;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.Ydirection = Ydirection;
    }
    Player.prototype.Render = function () {
        console.log(this.pos.x);
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
        console.log(this.pos.x);
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
        console.log(this.pos.x);
        ctx.beginPath();
        ctx.rect(this.pos.x - this.sizeX / 2, this.pos.y - this.sizeY / 2, this.sizeX, this.sizeY);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    return Player;
})();
