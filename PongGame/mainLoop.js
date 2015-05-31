var canvas;
var ctx;
var PlayerUP;
var PlayerDOWN;
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    PlayerUP.Render();
    PlayerDOWN.Render();
    requestAnimationFrame(loop);
}
window.onload = function () {
    canvas = document.getElementById('MainCanvas');
    ctx = canvas.getContext('2d');
    PlayerUP = new Player(canvas.height / 2, "blue", 37, 39);
    PlayerDOWN = new Player(canvas.height / 2, "red", 65, 68);
    Keyboard.start();
};
//# sourceMappingURL=mainLoop.js.map