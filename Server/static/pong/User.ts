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