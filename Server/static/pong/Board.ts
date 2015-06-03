class Board {
    PlayerUP: Player;
    PlayerDOWN: Player;
    BallFIRST: Ball;
    Width: number;
    Height: number;
    posX: number;
    id: string;
    UPPlayerID= 0;
    DOWNPlayerID= 0;
    constructor(Width: number, Height: number, posX: number) {
        this.Width = Width;
        this.Height = Height;
        this.posX = posX;
        this.PlayerUP = new Player(this.posX + this.Width / 2, 50, "white", 40, 37, 39, 100, 20, 1);
        this.PlayerDOWN = new Player(this.posX + this.Width / 2, this.Height - 50, "white", 83, 65, 68, 100, -20, -1);
        this.GetRandomPlayerForBall();
    }
    
    GetRandomPlayerForBall() {
        var PlayerChoose = [this.PlayerUP, this.PlayerDOWN];
        var randomPlayer = Math.round(Math.random());
        this.BallFIRST = new Ball(PlayerChoose[randomPlayer],
            PlayerChoose[randomPlayer].pos.x + 9,
            PlayerChoose[randomPlayer].pos.y + 9 + PlayerChoose[randomPlayer].sizeY * 1.5);
    }
    Render() {
        this.Draw();
        this.PlayerUP.Render();
        this.PlayerDOWN.Render();
        this.BallFIRST.Render();
        this.ScoreDrawer();
        this.CheckBallCollision();
        this.CheckPlayerCollision();
        this.RemoveBall();
    }
    CheckBallCollision() {
        if ((this.BallFIRST.pos.x > this.posX + this.Width - this.BallFIRST.size) || (this.BallFIRST.pos.x < this.posX + 1.5 * this.BallFIRST.size)) {
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
    CheckPlayerCollision() {
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
    }
    ScoreDrawer() {
        ctx.font = '50px Calibri';
        ctx.fillText(this.PlayerUP.Score.toString(), this.posX + this.Width / 2, this.Height / 2 - 2 * this.PlayerUP.sizeY);
        ctx.fillText(this.PlayerDOWN.Score.toString(), this.posX + this.Width / 2, this.Height / 2 - 2 * this.PlayerDOWN.sizeY);
    }

    RemoveBall() {
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
    }

    Draw() {
        ctx.beginPath();
        ctx.rect(this.posX, 0, this.Width, this.Height);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        ctx.stroke();
    }
}