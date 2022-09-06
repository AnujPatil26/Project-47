var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var t1, t2, t3;
var track1pic, track2, track3;
var score = 0;
var river,fish,stone1,stone2,stone3;
var arrow1,arrow2,arrow3;
function preload() {

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

  backgroundImage = loadImage("./assets1/background.png");
  car1_img = loadImage("../assets1/car1.png");
  car2_img = loadImage("../assets1/car2.png");
  track = loadImage("../pics/track.png");
  track1 = loadImage("../assets1/track.jpg");
  fuelImage = loadImage("./assets1/fuel.png");
  powerCoinImage = loadImage("./assets1/goldCoin.png");
  obstacle1Image = loadImage("./assets1/obstacle1.png");
  obstacle2Image = loadImage("./assets1/obstacle2.png");
  lifeImage = loadImage("./assets1/life.png");
  blastimage = loadImage("./assets1/blast.png")
  fbg = loadImage("../pics/footpath.jpg");
  train = loadImage("../pics/train.png");
  riverimg = loadImage("../pics/river.png");
  fishImg = loadImage("./assets1/fish.png");
  stoneImg = loadImage("../pics/stone.png");
  arrowImg = loadImage("../pics/arrow.png");

}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(width / 2, -height * 4, width, height * 6)
  bg.addImage(track1)
  bg.scale = 1.1


  track3pic = createSprite(width/2,-1500) 
  track3pic.addImage(track)
  track3pic.scale = 2;
  t3 = createSprite(0, -1500);
  t3.addImage(train)
  track2pic = createSprite(width/2,-1200) 
  track2pic.addImage(track)
  track2pic.scale = 2;
  t2 = createSprite(width - 100, -1200)
  t2.mirrorX(-1)
  t2.addImage(train)

  track1pic = createSprite(width/2,-900)
  track1pic.addImage(track)
  track1pic.scale = 2
  t1 = createSprite(0, -900);
  t1.addImage(train)


  river = createSprite(width/2,-2500)
  river.addImage(riverimg);
  river.scale = 2.5;
  river2 = createSprite(width/2,-2700)
  river2.addImage(riverimg);
  river2.scale = 2.5;

  stone1 = createSprite(748,-3310);
  stone1.addImage(stoneImg);
  stone1.scale = 0.5;
  stone2 = createSprite(0,-3310);
  stone2.addImage(stoneImg);
  stone1.scale = 0.5;
  stone3 = createSprite(0,-3310);
  stone3.addImage(stoneImg);
  stone1.scale = 0.5;

  arrow1 = createSprite(748,-3900);
  arrow1.addImage(arrowImg);
  arrow1.scale = 0.5;
  arrow2 = createSprite(0,-3950);
  arrow2.addImage(arrowImg);
  arrow2.scale = 0.5;
  arrow3 = createSprite(0,-4000);
  arrow3.addImage(arrowImg);
  arrow3.scale = 0.5;


  //creating the player sprite
  player = createSprite(width / 2, displayHeight - 300, 50, 50);
  player.addImage(car1_img)
  player.scale = 0.1
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)


  //creating sprites to depict lives remaining
  heart1 = createSprite(displayWidth - 150, 40, 20, 20)
  heart1.visible = false
  heart1.addImage("heart1", heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth - 100, 40, 20, 20)
  heart2.visible = false
  heart2.addImage("heart2", heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth - 150, 40, 20, 20)
  heart3.addImage("heart3", heart3Img)
  heart3.scale = 0.4

 
  

  //creating group for zombies    
  zombieGroup = new Group();
  coinGroup = new Group();
  fishGroup = new Group();
}

function draw() {
  background(0);
  
  
  camera.position.y = player.position.y;

  console.log("Y="+ player.y);
  console.log("X="+ player.x);
 
  if(player.y >-650){
    t1.velocityX = 5;
    t2.velocityX = -5.5;
    t3.velocityX = 6;
  
  }
  if(t3.x>width+200){
    t3.x = -200;
  }
  if(t2.x<-200){
    t2.x = width+200;
  }
  if(t1.x >width+200){
    t1.x = -200
  }
  if(player.y>600){
    player.y = 600
  }
 coins();
 fishesR();
 fishesL();
  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW")) {
    player.y = player.y - 30
  }
  if (keyDown("DOWN_ARROW")) {
    player.y = player.y + 30
  }
  if (keyDown("LEFT_ARROW")) {
    player.x = player.x - 30
  }
  if (keyDown("RIGHT_ARROW")) {
    player.x = player.x + 30
  }



  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {

    player.addImage(car2_img)


  }

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(car1_img)
  }


  //destroy zombie when player touches it
  if (coinGroup.isTouching(player)) {


    for (var i = 0; i < coinGroup.length; i++) {

      if (coinGroup[i].isTouching(player)) {
        coinGroup[i].destroy();
        score = score+1;
        console.log("points"+score);
      }
    }
  }
  
  
 
  //calling the function to spawn zombies
  //enemy();

  drawSprites();

}


//creating function to spawn zombies
function enemy() {
  if (frameCount % 50 === 0) {

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500, 1100), random(100, 500), 40, 40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug = true
    zombie.setCollider("rectangle", 0, 0, 400, 400)

    zombie.lifetime = 400
    zombieGroup.add(zombie)
  }

}
function coins(){
  if(frameCount % 50 ===0){
    coin = createSprite(random(30,width-200),random(-2000,-2250))
    coin.addImage( powerCoinImage);
    coin.scale = 0.1;
    coin.lifetime = 500;
    coinGroup.add(coin);

  }
}

function fishesR(){
  if(frameCount % 50 ===0){
    fish = createSprite(random(1320,1480),random(-2770,-2410));
    fish.velocityX = -5.5;
    fish.addImage(fishImg);
    fish.scale = 0.4;
    fish.lifetime = 600;
    fishGroup.add(fish);

  }
}

function fishesL(){
  if(frameCount % 50 ===0){
    fish = (random(8.5,160),random(-2770,-2410));
    fish.velocityX = -5.5;
    fish.scale = 0.4;
    fish.lifetime = 600;


  }
}
