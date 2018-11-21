function rect(color, x, y, width, height )
{
    this.color = color;
    this.x = x ;
    this.y = y ;
    this.width = width;
    this.height = height;
    this.draw = function()
    {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
function playerMove(e) {
    var y = e.pageY
    if (player.height / 2 + 10 < y && y < game.height - player.height / 2 - 10) {
        player.y = y - player.height / 2;
    }
}
function startGame() {
    if (!start) {
        ball.vX = -2;
        ball.vY = 2;
        start = true;
    }
}
function aiMove() {
    var y;
    // делаем скорость оппонента зависимой от скорости шарика
    switch (ball.vY) {
    case 2:
        vY = 2;
        break;
    case 3:
        vY = 3;
        break;
    case 4:
        vY = 4;
        break;
    case 5:
        vY = 5;
        break;
    case 6:
        vY = 5;
        break;
    case 7:
        vY = 6;
        break;
    case 8:
        vY = 6;
        break;
    case 9:
        vY = 6;
        break;
    case 0:
        vY = 0;
        break;
    }

    if (ball.y < ai.y + ai.height / 2) {
        y = ai.y - vY;
    }
    if (ball.y > ai.y + ai.height / 2) {
        y = ai.y + vY;
    }
    if (10 < y && y < game.height - ai.height - 10) {
        ai.y = y;
    }
}


function collision(objA, objB) {
    if (objA.x+objA.width  > objB.x && objA.x < objB.x+objB.width && objA.y+objA.height > objB.y &&
        objA.y < objB.y+objB.height) {
            return true;
        }
        else {
            return false;
            }
    }
function draw() {
    game.draw();

    context.font = 'bold 128px courier';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillStyle = '#ccc';
    context.font = "50px Verdana"
    context.fillText(ai.scores, 100, 0);
    context.fillText(player.scores, game.width-100, 0);
    for (var i = 10; i < game.height; i += 45) 
   {
        context.fillStyle = "#ccc";
        context.fillRect(game.width/2 - 10, i, 5, 35);
    }
    
    ai.draw(); 
    player.draw(); 
    ball.draw(); 
}
function update() {
    aiMove();
    if (ball.y<0 || ball.y+ball.height > game.height) {
        ball.vY = -ball.vY;
    }
    if (ball.x<0) { 
        ball.vX = -ball.vX;
        player.scores ++;
    }
    if (ball.x+ball.width>game.width) {
        ball.vX = -ball.vX;
        ai.scores ++;
    }
    if ((collision(ai, ball) && ball.vX<0) || (collision(player, ball) && ball.vX>0)){
        if ((collision(ai, ball) && ball.vX < 0) || (collision(player, ball) && ball.vX > 0)) {
            if (ball.vX < 9 && -9 < ball.vX) {
                if (ball.vX < 0) {
                    ball.vX--;
                } else {
                    ball.vX++;
                }
                if (ball.vY < 0) {
                    ball.vY--;
                } else {
                    ball.vY++;
                }
            }
            ball.vX = -ball.vX;
        }
    }
    ball.x += ball.vX;
    ball.y += ball.vY;

}
function play(){
    draw();
    update();
}
function init() {
    start = false;
    //game field
    game = new rect("#000", 0, 0, 600, 400);
    //player rackets
    ai = new rect("#1000a0", 10, game.height / 2 - 40, 20, 80);
    player = new rect("#a00000", game.width - 30, game.height / 2 - 40, 20, 80);
    //number of points
    ai.scores = 0;
    player.scores = 0;
    //ball
    ball = new rect("#fff", 40, game.height / 2 - 10, 20, 20);
    ball.vX = 0;
    ball.vY = 0;
    canvas = document.getElementById("canvas");
    canvas.width =  game.width; 
    canvas.height =  game.height;
    context = canvas.getContext('2d');
    canvas.onmousemove = playerMove;
    canvas.onclick = startGame;
    setInterval(play, 1000 / 50);
}
init();