var app; 
var car = PIXI.Sprite.fromImage("car.png");
car.x = 5*30;
car.y = 15*30;
var speed = 4;
var rivals = [];
var button = [];
var game;

var model = {
  createCanvas: function() {
    app = new PIXI.Application(600,600, { backgroundColor: 0x6D421A });
    for (var i = 0; i < 260; i++) {
      var square = PIXI.Sprite.fromImage("empty.jpg");
      square.width = 30;
      square.height = 30;
      square.x = (i % 13) * 30;
      square.y = Math.floor(i / 13) * 30;
      app.stage.addChild(square);
    }
    
    for (var i = 0; i < 4; i++) {
      var circle = new PIXI.Graphics();
      circle.lineStyle(0); 
      circle.beginFill(0xFFB961, 1);
      if (i < 2) {
        circle.drawCircle(500, 300 + i*100, 25); 
        circle.endFill(); 
        if (i == 0) {
          circle.on('pointerdown', controller.onClick);
          console.log("top");
        }
        else {
          circle.on('pointerdown', onBottomClick);
        }
      }
      else {
        circle.drawCircle(450 + (i-2)*100, 350, 25); 
        circle.endFill(); 
        if ((i-2) == 0) {
          circle.on('pointerdown', onLeftClick);
        }
        else {
          circle.on('pointerdown', onRightClick);
        }
      }
      circle.buttonMode = true;
      console.log(circle);
      app.stage.addChild(circle);
      button.push(circle);
    }
    document.body.appendChild(app.view);
  },
  drawCar: function() {
    app.stage.addChild(car);
  },
  drawRivals: function() {
    var rival = PIXI.Sprite.fromImage("car.png");
    rival.x = 60;
    rival.y = 120;
    app.stage.addChild(rival);
    rivals.push(rival);
  }
}

function onBottomClick() {
  car.y -= 30;
}

function onLeftClick() {
  car.y -= 30;
}

function onRightClick() {
  car.y -= 30;
}

var view = {
	loadGame: function(){
		model.createCanvas();
    model.drawCar();
    model.drawRivals();
    console.log("fsdfsd")
	}
}

var controller = {
  onClick: function() {
      console.log("top-click");
        car.y -= 30;
        view.loadGame(); 
  }
}

view.loadGame(); 