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
    function Board(Width, Height, posX) {
        this.UPPlayerID = 0;
        this.DOWNPlayerID = 0;
        this.Width = Width;
        this.Height = Height;
        this.posX = posX;
        this.PlayerUP = new Player(this.posX + this.Width / 2, 50, "white", 40, 37, 39, 100, 20, 1);
        this.PlayerDOWN = new Player(this.posX + this.Width / 2, this.Height - 50, "white", 83, 65, 68, 100, -20, -1);
        this.GetRandomPlayerForBall();
    }
    Board.prototype.GetRandomPlayerForBall = function () {
        var PlayerChoose = [this.PlayerUP, this.PlayerDOWN];
        var randomPlayer = Math.round(Math.random());
        this.BallFIRST = new Ball(PlayerChoose[randomPlayer], PlayerChoose[randomPlayer].pos.x + 9, PlayerChoose[randomPlayer].pos.y + 9 + PlayerChoose[randomPlayer].sizeY * 1.5);
    };
    Board.prototype.Render = function () {
        this.Draw();
        this.PlayerUP.Render();
        this.PlayerDOWN.Render();
        this.BallFIRST.Render();
        this.ScoreDrawer();
        this.CheckBallCollision();
        this.CheckPlayerCollision();
        this.RemoveBall();
    };
    Board.prototype.CheckBallCollision = function () {
        if ((this.BallFIRST.pos.x > this.posX + this.Width - this.BallFIRST.size) || (this.BallFIRST.pos.x < this.posX + 1.5 * this.BallFIRST.size)) {
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
    Board.prototype.CheckPlayerCollision = function () {
        if (this.PlayerUP.pos.x > this.posX + this.Width - this.PlayerUP.sizeX / 2) {
            this.PlayerUP.pos.x = this.posX + this.Width - this.PlayerUP.sizeX / 2;
            this.PlayerUP.movX = -this.PlayerUP.movX / 2;
        }
        if (this.PlayerUP.pos.x < this.posX + this.PlayerUP.sizeX / 2) {
            this.PlayerUP.pos.x = this.posX + this.PlayerUP.sizeX / 2;
            this.PlayerUP.movX = -this.PlayerUP.movX / 2;
        }
        if (this.PlayerDOWN.pos.x > this.posX + this.Width - this.PlayerDOWN.sizeX / 2) {
            this.PlayerDOWN.pos.x = this.posX + this.Width - this.PlayerDOWN.sizeX / 2;
            this.PlayerDOWN.movX = -this.PlayerDOWN.movX / 2;
        }
        if (this.PlayerDOWN.pos.x < this.posX + this.PlayerDOWN.sizeX / 2) {
            this.PlayerDOWN.pos.x = this.posX + this.PlayerDOWN.sizeX / 2;
            this.PlayerDOWN.movX = -this.PlayerDOWN.movX / 2;
        }
    };
    Board.prototype.ScoreDrawer = function () {
        ctx.font = '50px Calibri';
        ctx.fillText(this.PlayerUP.Score.toString(), this.posX + this.Width / 2, this.Height / 2 - 2 * this.PlayerUP.sizeY);
        ctx.fillText(this.PlayerDOWN.Score.toString(), this.posX + this.Width / 2, this.Height / 2 - 2 * this.PlayerDOWN.sizeY);
    };
    Board.prototype.RemoveBall = function () {
        if ((this.BallFIRST.pos.y > this.Height + 50)) {
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
    Board.prototype.Draw = function () {
        ctx.beginPath();
        ctx.rect(this.posX, 0, this.Width, this.Height);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        ctx.stroke();
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
var Game = (function () {
    function Game(numOfBoards) {
        this.Boards = new Array();
        this.UserWrapper1 = new UserWrapper;
        this.numOfBoards = numOfBoards;
        canvas.width = 350 + 700 * this.numOfBoards;
        this.AddBoardToGame();
    }
    Game.prototype.AddBoardToGame = function () {
        for (var i = 0; i < this.numOfBoards; i++) {
            this.Boards.push(new Board(700, 800, 350 + 700 * i));
        }
    };
    Game.prototype.AddUsersAsPlayersToBoard = function (BoardID, PlayerID) {
        var CurrBoard = this.GetBoardById(BoardID);
        if (CurrBoard.UPPlayerID === 0) {
            CurrBoard.UPPlayerID = PlayerID;
            CurrBoard.PlayerUP.id = PlayerID;
        }
        else if (CurrBoard.DOWNPlayerID === 0) {
            CurrBoard.DOWNPlayerID = PlayerID;
            CurrBoard.PlayerDOWN.id = PlayerID;
        }
    };
    Game.prototype.Render = function () {
        this.UserWrapper1.Render();
        for (var i = 0; i < this.numOfBoards; i++) {
            this.Boards[i].Render();
        }
    };
    Game.prototype.GetBoardById = function (id) {
        for (var i = 0; i < this.UserWrapper1.Users.length; i++) {
            if (this.Boards[i].id === id) {
                return this.Boards[i];
            }
        }
    };
    return Game;
})();
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
var Game1;
var socket;
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Game1.Render();
    requestAnimationFrame(loop);
}
window.onload = function () {
    canvas = document.getElementById("MainCanvas");
    ctx = canvas.getContext("2d");
    socket = io.connect();
    Network(socket);
    Keyboard.start();
    Game1 = new Game(10);
    loop();
};
function Network(socket) {
    socket.on('PlayerJoin', function (data) {
        console.log("PlayerJoin");
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].nick);
            Game1.UserWrapper1.AdUsersToGame(data[i].id, data[i].nick);
        }
    });
    socket.on('PlayerLeave', function (data) {
        console.log("PlayerLeave");
        Game1.UserWrapper1.DeleteUsersFromGame(data);
    });
}
var Player = (function () {
    function Player(posX, posY, color, pushBall, steerLeft, steerRight, sizeX, sizeY, Ydirection) {
        this.pos = { x: 0, y: 0 };
        this.Score = 0;
        this.movX = 0;
        this.pos.x = posX;
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
        this.CheckingMovmentKey();
        this.pos.x += this.movX;
        this.movX *= 0.9;
        this.Draw();
    };
    Player.prototype.CheckingMovmentKey = function () {
        if (Keyboard.keys[this.steerLeft]) {
            if (this.movX === -10) {
                this.movX = -10;
            }
            else {
                this.movX -= 1.7;
            }
            socket.emit('PlayerMovmentChange', { PlayerId: this.id, posX: this.pos.x });
        }
        if (Keyboard.keys[this.steerRight]) {
            if (this.movX === 10) {
                this.movX = 10;
            }
            else {
                this.movX += 1.7;
            }
        }
        socket.emit('PlayerMovmentChange', { PlayerId: this.id, posX: this.pos.x });
    };
    Player.prototype.Draw = function () {
        ctx.beginPath();
        ctx.rect(this.pos.x - this.sizeX / 2, this.pos.y - this.sizeY / 2, this.sizeX, this.sizeY);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.beginPath();
        ctx.font = '10px Calibri';
        ctx.fillStyle = 'black';
        ctx.fillText(this.nick, this.pos.x - ctx.measureText(this.nick).width / 2, this.pos.y);
    };
    return Player;
})();
var User = (function () {
    function User(id, nick) {
        this.cameraPos = { x: 175, y: 0 };
        this.id = id;
        this.nick = nick;
    }
    User.prototype.Render = function (translator) {
        this.Draw(translator);
    };
    User.prototype.Draw = function (translator) {
        ctx.beginPath();
        ctx.rect(this.cameraPos.x - ctx.measureText(this.nick).width + 30 / 2, this.cameraPos.y + translator - 25, ctx.measureText(this.nick).width + 30, 35);
        ctx.fillStyle = "black";
        ctx.lineWidth = 5;
        ctx.fill();
        ctx.beginPath();
        ctx.font = '30px Calibri';
        ctx.fillStyle = 'white';
        ctx.fillText(this.nick, this.cameraPos.x - ctx.measureText(this.nick).width + 30 / 2, this.cameraPos.y + translator);
    };
    return User;
})();
var UserWrapper = (function () {
    function UserWrapper() {
        this.Users = new Array();
    }
    UserWrapper.prototype.Render = function () {
        console.log(this.Users.length);
        this.Draw();
        for (var i = 0; i < this.Users.length; i++) {
            this.Users[i].Render((50 * i) + 50);
        }
    };
    UserWrapper.prototype.AdUsersToGame = function (id, nick) {
        this.Users.push(new User(id, nick));
    };
    UserWrapper.prototype.DeleteUsersFromGame = function (id) {
        for (var i = 0; i < this.Users.length; i++) {
            if (this.Users[i].id === id) {
                this.Users.splice(i, 1);
            }
        }
    };
    UserWrapper.prototype.Draw = function () {
        ctx.beginPath();
        ctx.rect(0, 0, 350, 800);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    };
    return UserWrapper;
})();
