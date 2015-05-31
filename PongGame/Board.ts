class Board {
    PlayerUP: Player;
    PlayerDOWN: Player;
    BallFIRST: Ball;

    constructor() {
        this.PlayerUP = new Player( 50, "white", 40, 37, 39, 100, 20, 1);
        this.PlayerDOWN = new Player(750, "white", 83, 65, 68, 100, -20, -1);
        this.GetRandomPlayerForBall();
    }

    GetRandomPlayerForBall() {
        var PlayerChoose = [this.PlayerUP, this.PlayerDOWN];
        var randomPlayer = Math.round(Math.random());
        this.BallFIRST = new Ball(PlayerChoose[randomPlayer],
            PlayerChoose[randomPlayer].pos.x + 9,
            PlayerChoose[randomPlayer].pos.y + 9 + PlayerChoose[randomPlayer].sizeY * 1.5);
    }

    CheckBallCollision() {
        if ((this.BallFIRST.pos.x > canvas.width - this.BallFIRST.size) || (this.BallFIRST.pos.x < this.BallFIRST.size / 2)) {
            this.BallFIRST.wallCollCounter++;
            this.BallFIRST.movV.x = -this.BallFIRST.movV.x * 2.5;
            this.BallFIRST.movV.y = this.BallFIRST.movV.y * 2.5;
        }

        if ((this.BallFIRST.pos.x < (this.PlayerUP.pos.x + this.PlayerUP.sizeX / 2) + 1.5 * this.BallFIRST.size) &&
            (this.BallFIRST.pos.x > (this.PlayerUP.pos.x - this.PlayerUP.sizeX / 2) - this.BallFIRST.size / 2) &&
            (this.BallFIRST.pos.y < (this.PlayerUP.pos.y + this.PlayerUP.sizeY / 2) + this.BallFIRST.size) &&
            (this.BallFIRST.pos.y > (this.PlayerUP.pos.y - this.PlayerUP.sizeY / 2) - this.BallFIRST.size)) {
            this.BallFIRST.wallCollCounter = 0;
            this.BallFIRST.pos.y += 5;
            this.BallFIRST.movV.y = this.BallFIRST.movV.y * -2;
            this.BallFIRST.speed *= 1.01;
            this.BallFIRST.movV.x = this.BallFIRST.movV.x + this.PlayerUP.movX * 0.1;
        }
        if ((this.BallFIRST.pos.x < (this.PlayerDOWN.pos.x + this.PlayerDOWN.sizeX / 2) + 1.5 * this.BallFIRST.size) &&
            (this.BallFIRST.pos.x > (this.PlayerDOWN.pos.x - this.PlayerDOWN.sizeX / 2) - this.BallFIRST.size / 2) &&
            (this.BallFIRST.pos.y > (this.PlayerDOWN.pos.y + this.PlayerDOWN.sizeY / 2) - this.BallFIRST.size / 2) &&
            (this.BallFIRST.pos.y < (this.PlayerDOWN.pos.y - this.PlayerDOWN.sizeY / 2) + this.BallFIRST.size)) {

            this.BallFIRST.wallCollCounter = 0;

            this.BallFIRST.pos.y -= 5;
            this.BallFIRST.movV.y = this.BallFIRST.movV.y * -2;
            this.BallFIRST.speed *= 1.01;
            this.BallFIRST.movV.x = this.BallFIRST.movV.x + this.PlayerDOWN.movX * 0.1;
        }

    }

    RemoveBall() {
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
    }

    Render() {
        this.PlayerUP.Render();
        this.PlayerDOWN.Render();
        this.BallFIRST.Render();
        this.CheckBallCollision();
        this.RemoveBall();
    }

}