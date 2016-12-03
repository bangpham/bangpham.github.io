var mouseDown = false;
var canvasClicked = false;
var onShape = false;
var penMode = true;
var coverFirst = true;
var change;
var isRandomSize = true;


var holdingStage = new createjs.Stage("hold");
var stage;
var stage1 = new createjs.Stage('canvas');
var stage2 = new createjs.Stage('canvas2');
var SIZE = 20;
var SIZES = 10;
var SIZEL = 30;
var fill = "#28E8D5";
var currentShape;
var oldMidX, oldMidY, oldX, oldY;
var coverRect;

var size1, size2;

var currentShape;

var words = ["DOG", "HOUSE", "CAT", "FACE", "BABY", "GIRAFFE", "MONKEY", "CAR", "FLOWER", "TREE", "DOG", "ROSE", "DAISY", "LION", "TEAPOT", "FISH","BIRD", "FRUIT", "PEACOCK", "RABBIT", "BUTTERFLY", "MOTH", "PARROT", "SKYSCRAPER", "CASTLE", "HAT"];


/*******splash screen*********/

$('.enter').click(function () {
    $('#splashscreen').fadeOut(500);
    $('#mainGame').fadeIn("slow");
    init(1);
    timer();
    randomSize();
    document.getElementById('canvas').style.width = size1 + 'px';
    document.getElementById('canvas').style.height = '420px';
    document.getElementById('canvas2').style.width = size2 + 'px';
    document.getElementById('canvas2').style.height = '420px';
    $('.time').show();
});

$('.player2start').click(function () {
    hideMiddlescreen();
});

function goBack() {
    $('#splashscreen').fadeIn(500);
  $('#howToScreen').fadeOut("slow");
}

function hideMiddlescreen() {
    $('#middlescreen').fadeOut(500);
    $('#mainGame').fadeIn("slow");
    changeTurn();
}

function showMiddlescreen() {
  $('#middlescreen').fadeIn("slow");
  $('#mainGame').fadeOut("slow");
}

function showHowToscreen() {
  $('#splashscreen').fadeOut(500);
  $('#howToScreen').fadeIn("slow");
}

function showEndScreen() {
  $('#sidebar').fadeOut("slow");
  $('body').css( { paddingLeft : "15%" } );
  $('#word').text("Here is your Masterpiece!");
$('.time').fadeOut("slow");
$('.restartButton').css( { marginLeft : "200px" } );
$('.time').fadeOut("slow");
}

function restartFromEndScreen(){
    $('#sidebar').show();
  $('body').css( { paddingLeft : "25%" } );
  $('#word').text("");
}

function toggleRandom(){
  if (isRandomSize) {
    $("#toggleRandom").html("RANDOM CANVAS SIZE OFF");
    isRandomSize = false;
  } else {
    $("#toggleRandom").html("RANDOM CANVAS SIZE ON");
    isRandomSize = true;
  }
  

}

$('#howToButton').click(function () {
  showHowToscreen();
});

$('#toggleRandom').click(function () {
  toggleRandom();
});

/*********splash screen*************/


function init(turn){
  holdingStage.removeAllChildren();
  change=turn;
  if(turn == 1){
    $("#word").text(words[randomNum(words.length-1,0)]);
    stage = stage1;
  }else if (turn == 2){
    stage = stage2;
  }



  holdingStage.name = "holdingStage";
  stage.name = "stage";
  var canvas = document.getElementsByTagName('canvas')[0];
  var mainCanvas = document.getElementsByTagName('canvas')[1];

  //medium
  addCircle(canvas.width/2 - (SIZE*1.5), canvas.height/4, SIZE, holdingStage);
  addSquare(canvas.width/2 + (SIZE*1.5), canvas.height/4, SIZE * 2, 5, holdingStage);
  addTriangle(canvas.width/2 + (SIZE * 5), canvas.height/4, SIZE, holdingStage);
  addParallelogram(canvas.width/2 - (SIZE * 5.3), canvas.height/4 + 3, SIZE*2, SIZE, holdingStage);
  addHalfTriangle(canvas.width/2 - (SIZE*5.3), 2*canvas.height/4 + 3, SIZE, holdingStage);
  addTrapezoid(canvas.width/2 - (SIZE * 2), 2*canvas.height/4 + 3, SIZE*2, SIZE, holdingStage);
  addHexagon(canvas.width/2 + (SIZE * 2), 2*canvas.height/4 +3, SIZE, holdingStage);
  addStick(canvas.width/2 + (SIZE * 5), 2*canvas.height/4 + 3, SIZE*1.5, SIZE/2, holdingStage);
  addDiamond(canvas.width/2 - (SIZE * 4), 3*canvas.height/4 + 6, SIZE, holdingStage);
  addRightTriangle(canvas.width/2, 3*canvas.height/4 + 6, SIZE, holdingStage);
  addEllipse(canvas.width/2 + (SIZE * 3), 3*canvas.height/4, SIZE*2, SIZE, holdingStage);


  if (coverFirst) {

    coverRectangle(0, 0, mainCanvas.width, mainCanvas.height, stage2);
    coverFirst = false;
  }

  holdingStage.update();
}

/*****************begin shapes**************************/

function coverRectangle(x, y, w, h, stage){
  coverRect = new createjs.Shape();
  coverRect.graphics.beginFill("#d1bcea").moveTo(-w, h).lineTo(w, h).lineTo(w, -h).lineTo(-w, -h);
  coverRect.x = x;
  coverRect.y = y;
  stage.addChild(coverRect);
  stage.update();
}

//circle
function addCircle(x, y, r, stage) {
  var circle = new createjs.Shape();
  circle.graphics.beginFill(fill).drawCircle(0, 0, r);
  circle.x = x;
  circle.y = y;
  circle.name = "circle";
  circle.on("pressmove",drag);
  circle.on("mousedown", function(evt){
    onShape= true;
  })
  circle.on("pressup", function(evt){
    onShape = false;
  });
  if (stage.name == "holdingStage") {
    circle.on("pressup", addCircleToCanvas);
  }

  if (stage.name == "stage") {

    circle.on("pressmove", function(evt){
      currentShape = circle;
    });
  }

  stage.addChild(circle);
}


//triangle
function addTriangle(x, y, h, stage){
  var triangle = new createjs.Shape();
  triangle.graphics.beginFill(fill).moveTo(0,-h).lineTo(-h, h).lineTo(h, h);
  triangle.x = x;
  triangle.y = y;
  triangle.on("pressmove", drag);
  triangle.on("mousedown", function(evt){
    onShape= true;
  })
  triangle.on("pressup", function(evt){
    onShape = false;
  });
  if (stage.name == "holdingStage") {
    triangle.on("pressup", addTriangleToCanvas);
  }
  if (stage.name == "stage") {
    triangle.on("pressmove", function(evt){
      currentShape = triangle;
    });

    triangle.on("click", function(evt){
      currentShape = triangle;
    });

  }
  
  stage.addChild(triangle);
}



//square
function addSquare(x, y, s, r, stage) {
  var square = new createjs.Shape();
  square.graphics.beginFill(fill).drawRect(0, 0, s, s, r);
  square.x = x - s/2;
  square.y = y - s/2;
  square.name = "square";
  square.on("pressmove",drag);
  square.on("mousedown", function(evt){
    onShape= true;
  })
  square.on("pressup", function(evt){
    onShape = false;
  });
  
  if (stage.name == "holdingStage") {
    square.on("pressup", addSquareToCanvas);
  }

  if (stage.name == "stage") {

    square.on("pressmove", function(evt){
      currentShape = square;
    });

    square.on("click", function(evt){
      currentShape = square;
    });

  }

  stage.addChild(square);
}

function addEllipse(x, y, w, h, stage){
  var ellipse = new createjs.Shape();
  ellipse.graphics.beginFill(fill).drawEllipse(0, 0, w, h);
  ellipse.x = x;
  ellipse.y = y;
  ellipse.name="ellipse";
  ellipse.on("pressmove",drag);
  ellipse.on("mousedown", function(evt){
    onShape= true;
  })
  ellipse.on("pressup", function(evt){
    onShape = false;
  });
  if (stage.name == "holdingStage") {
    ellipse.on("pressup", addEllipseToCanvas);
  }

  if (stage.name == "stage") {

    ellipse.on("pressmove", function(evt){
      currentShape = ellipse;
    });

    ellipse.on("click", function(evt){
      currentShape = ellipse;
    });

  }
  stage.addChild(ellipse);
}

function addParallelogram(x, y, w, h, stage){
  var parallelogram = new createjs.Shape();
  parallelogram.graphics.beginFill(fill).moveTo(-w, h).lineTo(w/2, h).lineTo(w, -h).lineTo(-w/2, -h);
  parallelogram.x = x;
  parallelogram.y = y;
  parallelogram.name="parallelogram";
  parallelogram.on("pressmove",drag);
  parallelogram.on("mousedown", function(evt){
    onShape= true;
  })
  parallelogram.on("pressup", function(evt){
    onShape = false;
  });
  if (stage.name == "holdingStage") {
    parallelogram.on("pressup", addParallelogramToCanvas);
  }

  if (stage.name == "stage") {

    parallelogram.on("pressmove", function(evt){
      currentShape = parallelogram;
    });

    parallelogram.on("click", function(evt){
      currentShape = parallelogram;
    });

  }
  stage.addChild(parallelogram);
}

function addHalfTriangle(x, y, h, stage){
  var halfTriangle = new createjs.Shape();
  halfTriangle.graphics.beginFill(fill).moveTo(0,-h).lineTo(-h, h).lineTo(0, h);
  halfTriangle.x = x;
  halfTriangle.y = y;
  halfTriangle.name="halfTriangle";
  halfTriangle.on("pressmove",drag);
  halfTriangle.on("mousedown", function(evt){
    onShape= true;
  })
  halfTriangle.on("pressup", function(evt){
    onShape = false;
  });
  if (stage.name == "holdingStage") {
    halfTriangle.on("pressup", addHalfTriangleToCanvas);
  }

  if (stage.name == "stage") {

    halfTriangle.on("pressmove", function(evt){
      currentShape = halfTriangle;
    });

    halfTriangle.on("click", function(evt){
      currentShape = halfTriangle;
    });
  }
  stage.addChild(halfTriangle);

}

//trapezoid
function addTrapezoid(x, y, w, h, stage){
  var trapezoid = new createjs.Shape();
  trapezoid.graphics.beginFill(fill).moveTo(-w/2, -h).lineTo(w/2, -h).lineTo(w, h).lineTo(-w, h);
  trapezoid.x = x;
  trapezoid.y = y;
  trapezoid.name="trapezoid";
  trapezoid.on("pressmove",drag);
  trapezoid.on("mousedown", function(evt){
    onShape= true;
  })
  trapezoid.on("pressup", function(evt){
    onShape = false;
  });
  if (stage.name == "holdingStage") {
    trapezoid.on("pressup", addTrapezoidToCanvas);
  }

  if (stage.name == "stage") {

    trapezoid.on("pressmove", function(evt){
      currentShape = trapezoid;
    });

    trapezoid.on("click", function(evt){
      currentShape = trapezoid;
    });
  }
  stage.addChild(trapezoid);
}

//stick
function addStick(x, y, w, h, stage){
  var stick = new createjs.Shape();
  stick.graphics.beginFill(fill).moveTo(-w, h).lineTo(w, h).lineTo(w, -h).lineTo(-w, -h);
  stick.x = x;
  stick.y = y;
  stick.name="stick";
  stick.on("pressmove",drag);
  stick.on("mousedown", function(evt){
    onShape= true;
  })
  stick.on("pressup", function(evt){
    onShape = false;
  });
  if (stage.name == "holdingStage") {
    stick.on("pressup", addStickToCanvas);
  }

  if (stage.name == "stage") {

    stick.on("pressmove", function(evt){
      currentShape = stick;
    });

    stick.on("click", function(evt){
      currentShape = stick;
    });
  }
  stage.addChild(stick);
}

//hexagon
function addHexagon(x, y, h, stage){
  var hexagon = new createjs.Shape();
  hexagon.graphics.beginFill(fill).moveTo(0, -h).lineTo(-h, -h/2).lineTo(-h, h/2).lineTo(0, h).lineTo(h,h/2).lineTo(h,-h/2);
  hexagon.x = x;
  hexagon.y = y;
  hexagon.name="hexagon";
  hexagon.on("pressmove",drag);
  hexagon.on("mousedown", function(evt){
    onShape= true;
  })
  hexagon.on("pressup", function(evt){
    onShape = false;
  });
  if (stage.name == "holdingStage") {
    hexagon.on("pressup", addHexagonToCanvas);
  }

  if (stage.name == "stage") {

    hexagon.on("pressmove", function(evt){
      currentShape = hexagon;
    });

    hexagon.on("click", function(evt){
      currentShape = hexagon;
    });
  }
  stage.addChild(hexagon);
}

//diamond
function addDiamond(x, y, h, stage){
  var diamond = new createjs.Shape();
  diamond.graphics.beginFill(fill).moveTo(0,-h).lineTo(-h*1.5,0).lineTo(0,h).lineTo(h*1.5,0);
  diamond.x = x;
  diamond.y = y;
  diamond.name="diamond";
  diamond.on("pressmove",drag);
  diamond.on("mousedown", function(evt){
    onShape= true;
  })
  diamond.on("pressup", function(evt){
    onShape = false;
  });
  if (stage.name == "holdingStage") {
    diamond.on("pressup", addDiamondToCanvas);
  }

  if (stage.name == "stage") {

    diamond.on("pressmove", function(evt){
      currentShape = diamond;
    });

    diamond.on("click", function(evt){
      currentShape = diamond;
    });
  }
  stage.addChild(diamond);
}

function addRightTriangle(x, y, h, stage){
  var halfTriangle = new createjs.Shape();
  halfTriangle.graphics.beginFill(fill).moveTo(0,-h).lineTo(-h*1.5, h/2).lineTo(h*1.5, h/2);
  halfTriangle.x = x;
  halfTriangle.y = y;
  halfTriangle.name="halfTriangle";
  halfTriangle.on("pressmove",drag);
  halfTriangle.on("mousedown", function(evt){
    onShape= true;
  })
  halfTriangle.on("pressup", function(evt){
    onShape = false;
  });
  if (stage.name == "holdingStage") {
    halfTriangle.on("pressup", addRightTriangleToCanvas);
  }

  if (stage.name == "stage") {

    halfTriangle.on("pressmove", function(evt){
      currentShape = halfTriangle;
    });

    halfTriangle.on("click", function(evt){
      currentShape = halfTriangle;
    });
  }
  stage.addChild(halfTriangle);
}


function addRightTriangleToCanvas(evt){
  var canvas = document.getElementsByTagName('canvas')[1];
  addRightTriangle(40, 25, SIZE, stage);
  stage.update();
}

function addStickToCanvas(evt){

  var canvas = document.getElementsByTagName('canvas')[1];
  addStick(40, 25, SIZE*1.5, SIZE/2, stage); 
  stage.update();
}

function addDiamondToCanvas(evt){
  var canvas = document.getElementsByTagName('canvas')[1];
  addDiamond(40, 25, SIZE, stage);
  stage.update();
}

function addHexagonToCanvas(evt){
  console.log("added hexagon to canvas, why do you care?");
  var canvas = document.getElementsByTagName('canvas')[1];
  addHexagon(40, 25, SIZE, stage);
  stage.update();
}


function addSquareToCanvas(evt){
  var canvas = document.getElementsByTagName('canvas')[1];
  addSquare(40, 25, SIZE*2, 5, stage);
  stage.update();
}

function addTriangleToCanvas(evt){
  var canvas = document.getElementsByTagName('canvas')[1];
  addTriangle(40, 25, SIZE, stage);
  stage.update();
  
}

function addCircleToCanvas(evt){
  var canvas = document.getElementsByTagName('canvas')[1];
  addCircle(40, 25, SIZE, stage);
  stage.update();
}

function addEllipseToCanvas(evt){
  var canvas = document.getElementsByTagName('canvas')[1];
  addEllipse(40, 25, SIZE*2, SIZE, stage);;
  stage.update();
}

function addParallelogramToCanvas(evt){
  var canvas = document.getElementsByTagName('canvas')[1];
  addParallelogram(40, 25, SIZE*2, SIZE, stage);
  stage.update();
}

function addHalfTriangleToCanvas(evt){
  var canvas = document.getElementsByTagName('canvas')[1];
  addHalfTriangle(40, 25, SIZE, stage);
  stage.update();
}

function addTrapezoidToCanvas(evt){
  var canvas = document.getElementsByTagName('canvas')[1];
  addTrapezoid(40, 25, SIZE*2, SIZE, stage);
  stage.update();
}




function drag(evt) {
  onShape = true;
  // target will be the container that the event listener was added to
  if(evt.target.name == "square" || evt.target.name == "stick") {
    evt.target.x = evt.stageX - SIZE;
    evt.target.y = evt.stageY - SIZE;
  }
  else  {
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;
  }

  // make sure to redraw the stage to show the change
  stage.update();   
}


function changeColor(color){
  var canvas = document.getElementsByTagName('canvas')[0];
  fill = color;
  holdingStage.removeAllChildren();

  //medium
  addCircle(canvas.width/2 - (SIZE*1.5), canvas.height/4, SIZE, holdingStage);
  addSquare(canvas.width/2 + (SIZE*1.5), canvas.height/4, SIZE * 2, 5, holdingStage);
  addTriangle(canvas.width/2 + (SIZE * 5), canvas.height/4, SIZE, holdingStage);
  addParallelogram(canvas.width/2 - (SIZE * 5.3), canvas.height/4 + 3, SIZE*2, SIZE, holdingStage);
  addHalfTriangle(canvas.width/2 - (SIZE*5.3), 2*canvas.height/4 + 3, SIZE, holdingStage);
  addTrapezoid(canvas.width/2 - (SIZE * 2), 2*canvas.height/4 + 3, SIZE*2, SIZE, holdingStage);
  addHexagon(canvas.width/2 + (SIZE * 2), 2*canvas.height/4 +3, SIZE, holdingStage);
  addStick(canvas.width/2 + (SIZE * 5), 2*canvas.height/4 + 3, SIZE*1.5, SIZE/2, holdingStage);
  addDiamond(canvas.width/2 - (SIZE * 4), 3*canvas.height/4 + 6, SIZE, holdingStage);
  addRightTriangle(canvas.width/2, 3*canvas.height/4 + 6, SIZE, holdingStage);
  addEllipse(canvas.width/2 + (SIZE * 3), 3*canvas.height/4, SIZE*2, SIZE, holdingStage);
    
  holdingStage.update();
}

function rotate(){
  currentShape.rotation = currentShape.rotation + 45;
  stage.update();
}

function removeShape(){
  stage.removeChild(currentShape);
  stage.update();
}


/*****************end shapes**************************/


/*******************save picture*********************************/

function savePicture() {

    window.open(stage.toDataURL()); // convert to image and open a window
}

/******************end save picture*******************************/


function changeTurn() {
  remove();
  init(2);
  var mainCanvas = document.getElementsByTagName('canvas')[2];
  coverRectangle(0, 0, mainCanvas.width-15, mainCanvas.height, stage1);
  timer();
}

function remove(){
  stage2.removeChild(coverRect);
  stage2.update();
}

var end = false;
function endGame(){
  stage = new createjs.Stage();
  init(0);
  stage1.removeChild(coverRect);
  stage1.update();
  end=true;
showEndScreen();
}

/***timer***/

var time, start;

function startTimer(duration, display){
      start = Date.now();
        var diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 

        if (diff <= 0) {
        start = Date.now() + 1000;
        clearInterval(time);
        if(change == 1){
          showMiddlescreen();
        }else if(change == 2){
          endGame();
        }
    }

    };
    // we don't want to wait a full second before the timer starts
    timer();
    time = setInterval(timer, 1100);

    
}

function endTimer(){
  start = Date.now() + 1000;
  clearInterval(time);
  if(change == 1){
    showMiddlescreen();
  }else if(change == 2){
    endGame();
  }
}

function timer() {
    var fiveMinutes = 60*5,
    display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};

function restart(){
  endTimer();
    restartFromEndScreen();
  $('#splashscreen').fadeIn("slow");
  $('#mainGame').hide();
  $('#middlescreen').hide();
  coverFirst = true;
    fill = "#28E8D5";
  stage1.removeAllChildren();
  stage1.update();
  stage2.removeAllChildren();
  stage2.update();
}

function randomSize(){
  if (isRandomSize) {
  size1 = randomNum(740,200);
  size2 = 940-size1;
  } else {
  size1 = 470
  size2 = 470  
  }
}


/*******timer end*******/

function randomNum(max, min) {
    var ind = Math.floor(Math.random() * (max - min + 1)) + min;

    return ind;
}





