class Ball {
    pos = { x: 0, y: 0 };
    movV = { x: 0, y: 0 };
    speed = 15;
    size = 18;
    color = "white";
    wallCollCounter = 0;
    isInMotion = false;
    chosenPlayerName = "";
    static Balls = new Array<Ball>();
    constructor(chosenPlayerName: string, posX: number, posY: number) {
        this.chosenPlayerName = chosenPlayerName;
        this.pos.x = posX;
        this.pos.y = posY;

    }

    static Render() {
        if (Ball.Balls.length < 1) {
            var PlayerChoose = [PlayerUP, PlayerDOWN];
            var randomPlayer = Math.round(Math.random());
            Ball.Balls.push(new Ball(
                PlayerChoose[randomPlayer].name,
                PlayerChoose[randomPlayer].pos.x + 9,
                PlayerChoose[randomPlayer].pos.y + 9 + PlayerChoose[randomPlayer].sizeY * 1.5));

        }
        Ball.Motion(Ball.Balls[0].chosenPlayerName);

        Ball.CheckCollision();
        Ball.Draw();
        Ball.Remove();

    }
    static Remove() {
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
    }

    static Motion(name: string) {
        for (var i = 0; i < Ball.Balls.length; i++) {
            if (Ball.Balls[i].isInMotion) {
                Ball.Balls[i].movV = NormalizeVectorLength(Ball.Balls[i].movV);
                Ball.Balls[i].pos.x += Ball.Balls[i].movV.x * Ball.Balls[i].speed;
                Ball.Balls[i].pos.y += Ball.Balls[i].movV.y * Ball.Balls[i].speed;
            }
            else {

                if (name === "down") {
                    Ball.Balls[i].pos.x = PlayerDOWN.pos.x + 9
                    if ((Keyboard.keys[PlayerDOWN.pushBall])) {
                        Ball.Balls[i].movV.x = PlayerDOWN.movX * 0.5;
                        Ball.Balls[i].movV.y = -1 * Ball.Balls[i].speed;
                        Ball.Balls[i].isInMotion = true;
                    }
                }

                if (name === "up") {
                    Ball.Balls[i].pos.x = PlayerUP.pos.x + 9
                    if (Keyboard.keys[PlayerUP.pushBall]) {
                        Ball.Balls[i].movV.x = PlayerUP.movX * 0.3;
                        Ball.Balls[i].movV.y = Ball.Balls[i].speed;
                        Ball.Balls[i].isInMotion = true;
                    }
                }
            }
        }
    }

    static CheckCollision() {
        for (var i = 0; i < Ball.Balls.length; i++) {
            if ((Ball.Balls[i].pos.x > canvas.width - Ball.Balls[i].size) || (Ball.Balls[i].pos.x < Ball.Balls[i].size /2)) {
                Ball.Balls[i].wallCollCounter++;
                Ball.Balls[i].movV.x = -Ball.Balls[i].movV.x * 2.5;
                Ball.Balls[i].movV.y = Ball.Balls[i].movV.y * 2.5;
            }

            if ((Ball.Balls[i].pos.x < (PlayerUP.pos.x + PlayerUP.sizeX / 2) + 1.5 * Ball.Balls[i].size) &&
                (Ball.Balls[i].pos.x > (PlayerUP.pos.x - PlayerUP.sizeX / 2) - Ball.Balls[i].size / 2) &&
                (Ball.Balls[i].pos.y < (PlayerUP.pos.y + PlayerUP.sizeY / 2) + Ball.Balls[i].size) &&
                (Ball.Balls[i].pos.y > (PlayerUP.pos.y - PlayerUP.sizeY / 2) - Ball.Balls[i].size)) {
                Ball.Balls[i].wallCollCounter = 0;
                Ball.Balls[i].pos.y += 5;
                Ball.Balls[i].movV.y = Ball.Balls[i].movV.y * -2;
                Ball.Balls[i].speed *= 1.01;
                Ball.Balls[i].movV.x = Ball.Balls[i].movV.x + PlayerUP.movX * 0.1;
            }
            if ((Ball.Balls[i].pos.x < (PlayerDOWN.pos.x + PlayerDOWN.sizeX / 2) + 1.5 * Ball.Balls[i].size) &&
                (Ball.Balls[i].pos.x > (PlayerDOWN.pos.x - PlayerDOWN.sizeX / 2) - Ball.Balls[i].size / 2) &&
                (Ball.Balls[i].pos.y > (PlayerDOWN.pos.y + PlayerDOWN.sizeY / 2) - Ball.Balls[i].size / 2) &&
                (Ball.Balls[i].pos.y < (PlayerDOWN.pos.y - PlayerDOWN.sizeY / 2) + Ball.Balls[i].size)) {

                Ball.Balls[i].wallCollCounter = 0;

                Ball.Balls[i].pos.y -= 5;
                Ball.Balls[i].movV.y = Ball.Balls[i].movV.y * -2;
                Ball.Balls[i].speed *= 1.01;
                Ball.Balls[i].movV.x = Ball.Balls[i].movV.x + PlayerDOWN.movX * 0.1;
            }
        }
    }

    static Draw() {
        for (var i = 0; i < Ball.Balls.length; i++) {
            ctx.beginPath();
            ctx.arc(Ball.Balls[i].pos.x - Ball.Balls[i].size / 2, Ball.Balls[i].pos.y - Ball.Balls[i].size / 2, Ball.Balls[i].size, 0, 2 * Math.PI, false);
            ctx.fillStyle = Ball.Balls[i].color;
            ctx.fill();
        }
    }
}
 
 