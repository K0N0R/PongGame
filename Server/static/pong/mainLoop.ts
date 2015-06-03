var canvas;
var ctx: CanvasRenderingContext2D;
var Game1: Game;
var socket: SocketIOClient.Socket;

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