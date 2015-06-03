class User {
    id: string;
    nick: string;
    cameraPos = { x: 175, y: 0 };
    constructor(id: string, nick: string) {
        this.id = id;
        this.nick = nick;
    }
    Render(translator) {
        this.Draw(translator);
    }
    ChceckBoard() {
        for (var i = 0; i < Game1.numOfBoards; i++) {
            if (this.cameraPos.x > Game1.Boards[i].posX && this.cameraPos.x < Game1.Boards[i].posX + Game1.Boards[i].Width) {
                return Game1.Boards[i].id;
            }
        }
    }

    SelectBoard() {
        if (Keyboard.keys[13]) {
            socket.emit("UserSelectBoard", { BoardID: this.ChceckBoard(),UserID:this.id});
        }
    }

    Draw(translator) {
        ctx.beginPath();
        ctx.rect(this.cameraPos.x - ctx.measureText(this.nick).width+30 / 2, this.cameraPos.y+translator-25, ctx.measureText(this.nick).width+30, 35);
        ctx.fillStyle = "black";
        ctx.lineWidth = 5;
        ctx.fill();
        ctx.beginPath();
        ctx.font = '30px Calibri';
        ctx.fillStyle = 'white';
        ctx.fillText(this.nick, this.cameraPos.x - ctx.measureText(this.nick).width+30 / 2, this.cameraPos.y + translator);
    }
}