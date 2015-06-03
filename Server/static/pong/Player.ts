class Player {
    steerLeft; steerRight; sizeX; sizeY; Ydirection; color; pushBall;
    pos = { x: 0, y: 0 };
    Score = 0;
    movX = 0;
    nick: string;
    id: string;
    constructor(posX: number, posY: number, color: string, pushBall: number, steerLeft: number, steerRight: number, sizeX: number, sizeY: number, Ydirection: number) {
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

    public Render() {
        this.CheckingMovmentKey();
        this.pos.x += this.movX;
        this.movX *= 0.9;
        this.Draw();
    }

    private CheckingMovmentKey() {
        if (Keyboard.keys[this.steerLeft]) {
            if (this.movX === -10) {
                this.movX = -10;
            }
            else {
                this.movX -= 1.7;
            } socket.emit('PlayerMovmentChange', { PlayerId: this.id, posX: this.pos.x });
        }
        if (Keyboard.keys[this.steerRight]) {
            if (this.movX === 10) {
                this.movX = 10;
            }
            else {
                this.movX += 1.7;
            }
        } socket.emit('PlayerMovmentChange', { PlayerId: this.id, posX: this.pos.x });
    }

    private Draw() {
        ctx.beginPath();
        ctx.rect(this.pos.x - this.sizeX / 2, this.pos.y - this.sizeY / 2, this.sizeX, this.sizeY);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.beginPath();
        ctx.font = '10px Calibri';
        ctx.fillStyle = 'black';
        ctx.fillText(this.nick, this.pos.x - ctx.measureText(this.nick).width / 2, this.pos.y);
    }
}
 
