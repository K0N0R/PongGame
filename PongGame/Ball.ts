class Ball {
    pos = { x: 0, y: 0 };
    movV = { x: 0, y: 0 };
    speed = 15;
    size = 18;
    color = "white";
    wallCollCounter = 0;
    isInMotion = false;
    chosenPlayer: Player;
    constructor(chosenPlayer: Player, posX: number, posY: number) {
        this.chosenPlayer = chosenPlayer;
        this.pos.x = posX;
        this.pos.y = posY;

    }
    Render() {
        this.Motion();
        this.Draw();
    }
    Motion() {
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
    }
    Draw() {
        ctx.beginPath();
        ctx.arc(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
 
 