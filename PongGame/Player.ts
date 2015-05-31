class Player {
    Score = 0;
    name = "";
    pos = { x: 350, y: 0 };
    movX = 0;
    color = "black";
    pushBall = 0;
    steerLeft = 0;
    steerRight = 0;
    sizeX = 0;
    sizeY = 0;
    constructor(name: string, posY: number, color: string, pushBall: number, steerLeft: number, steerRight: number, sizeX: number, sizeY: number) {
        this.name = name;
        this.pos.y = posY;
        this.color = color;
        this.pushBall = pushBall;
        this.steerLeft = steerLeft;
        this.steerRight = steerRight;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    public Render() {
        this.CheckingMovmentKey();
        this.pos.x += this.movX;
        this.CheckCollision();
        this.ScoreDrawer();
        this.Draw();
    }
    private ScoreDrawer() {
        
        ctx.fillStyle = "white";
        ctx.font = "bold 50px Six Caps";
        ctx.fillText(this.Score.toString(), 350 , canvas.height / 2 - 2*this.sizeY);
        
    }


    private CheckingMovmentKey() {
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

    }
    private CheckCollision() {
        if (this.pos.x > canvas.width - this.sizeX / 2) {
            this.pos.x = canvas.width - this.sizeX / 2;
            this.movX = -this.movX / 2;
        }
        if (this.pos.x < this.sizeX / 2) {
            this.pos.x = this.sizeX / 2;
            this.movX = -this.movX / 2;
        }
    }

    private Draw() {

        ctx.beginPath();
        ctx.rect(this.pos.x - this.sizeX / 2, this.pos.y - this.sizeY / 2, this.sizeX, this.sizeY);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
 
