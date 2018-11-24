var app; 
var car = PIXI.Sprite.fromImage("car.png");
var screenWidth = 300;
var screenHeight = 600;
car.x = 5*30;
car.y = 15*30;
var speed = 4;
var rivals = [];
var button = [];
var game;

var model = {
  createCanvas: function() {
    app = new PIXI.Application(550,600, { backgroundColor: 0x6D421A });
    for (var i = 0; i < 260; i++) {
      var square = PIXI.Sprite.fromImage("empty.jpg");
      square.width = 30;
      square.height = 30;
      square.x = (i % 10) * 30;
      square.y = Math.floor(i / 10) * 30;
      app.stage.addChild(square);
    }
    
    for (var i = 0; i < 4; i++) {
      var circle = new PIXI.Graphics();
      circle.lineStyle(0); 
      circle.beginFill(0xFFB961, 1);
      if (i < 2) {
        circle.drawCircle(420, 300 + i*100, 25); 
        circle.endFill(); 
        if (i === 0) {
          circle.on('pointerdown', onUpClick);
        }
        else {
          circle.on('pointerdown', onDownClick);
        }
      }
      else {
        circle.drawCircle(370 + (i-2)*100, 350, 25); 
        circle.endFill(); 
        if ((i-2) == 0) {
          circle.on('pointerdown', onLeftClick);
        }
        else {
          circle.on('pointerdown', onRightClick);
        }
      }
      circle.interactive = true;
      circle.buttonMode = true;
      app.stage.addChild(circle);
      button.push(circle);
    }
    document.addEventListener('keydown', onKeyDown);
    document.body.appendChild(app.view);
  },
  drawCar: function() {
    app.stage.addChild(car);
  },
  drawRivals: function() {
    for (var i = 0; i < 5; i++){
      var rival = PIXI.Sprite.fromImage("car.png");
      rival.x = Math.floor(Math.random() * 2)*90+60;
      console.log(rival.x);
      rival.y = -Math.floor((Math.random() * 5) + 1)*240-120;
      app.stage.addChild(rival);
      rivals.push(rival);
  }
  }
}

const ticker = new PIXI.ticker.Ticker();
ticker.stop();
//deltaTime = 50;
ticker.add((deltaTime) => {
  for (var i = 0; i < 5; i++){
    if(rivals[i].y < 600) {
    rivals[i].y+=1;
    
  }
    else{
    rivals[i].y = -Math.floor((Math.random() * 5) + 1)*240-120;
    rivals[i].x = Math.floor(Math.random() * 2)*90+60;
    }
  }
});
ticker.start(); 

function onKeyDown(key) {
  // W Key is 87
  // Up arrow is 87
  if (key.keyCode === 87 || key.keyCode === 38) {
    if (car.y > 0 ){
      car.y -= 30;
    }
  }

  // S Key is 83
  // Down arrow is 40
  if (key.keyCode === 83 || key.keyCode === 40) {
    if ( car.y + car.height < screenHeight){
      car.y += 30;
    }
    
  }

  // A Key is 65
  // Left arrow is 37
  if (key.keyCode === 65 || key.keyCode === 37) {
    if (car.x > 60){
      car.x -= 90;
    }
  }

  // D Key is 68
  // Right arrow is 39
  if (key.keyCode === 68 || key.keyCode === 39) {
    if (car.x + car.width < screenWidth-60){
      car.x += 90;
    }
  }
}


function onUpClick() {
  if (car.y > 0 ){
    car.y -= 30;
  }
  
}

function onDownClick() {
  if ( car.y + car.height < screenHeight){
    car.y += 30;
  }
  
}

function onLeftClick() {
 if (car.x > 60){
   car.x -= 90;
 }
  
}

function onRightClick() {
  if (car.x + car.width < screenWidth-60){
    car.x += 90;
  }
  
}

var view = {
	loadGame: function(){
		model.createCanvas();
    model.drawCar();
    model.drawRivals();
   
	}
}


view.loadGame(); 
