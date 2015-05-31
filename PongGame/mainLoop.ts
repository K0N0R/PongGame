var canvas;
var ctx: CanvasRenderingContext2D;
var BoardFIRST: Board;

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    BoardFIRST.Render();
    requestAnimationFrame(loop);
}

window.onload = function () {
    canvas = document.getElementById("MainCanvas");
    ctx = canvas.getContext("2d");
    Keyboard.start();
    BoardFIRST = new Board();
    loop();
};