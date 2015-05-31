var canvas;
var ctx: CanvasRenderingContext2D;
var PlayerUP: Player;
var PlayerDOWN: Player;

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    PlayerUP.Render();
    PlayerDOWN.Render();
    Ball.Render();
    requestAnimationFrame(loop);
}

window.onload = function () {
    canvas = document.getElementById("MainCanvas");
    ctx = canvas.getContext("2d");
    Keyboard.start();
    PlayerUP = new Player("up",50, "white", 40, 37, 39, 100, 20);
    PlayerDOWN = new Player("down",750, "white", 83, 65, 68, 100, -20);
    loop();
};