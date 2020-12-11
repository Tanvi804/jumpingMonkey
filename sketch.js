var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup , position;
var score=0;
var survivalTime=0;

function preload()
{
 monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png"  ,"sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png ")
        
 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
 
}

function setup()
{
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10)
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
    
  foodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() 
{
  createCanvas(400,400);
  background("lightblue");
    
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if (keyDown("space") && monkey.y>=300)
  {
    monkey.velocityY=-18;
  }
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  bananas();
  obstacles();
  
  if (foodGroup.isTouching(monkey))
  {
    foodGroup.destroyEach();
  }
  
  //console.log(frameCount)
 
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime,100,50);
}

function bananas() 
{ 
  if (World.frameCount % 80 == 0) 
  {
    banana = createSprite(400, 200, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
   
    banana.y = Math.round(random(120,200));
    banana.velocityX=-6;
    banana.setLifetime=400/6;
    monkey.depth = banana.depth;
    banana.depth = monkey.depth + 1;
    foodGroup.add(banana);  
 }
}

function obstacles() 
{
  if (World.frameCount % 300 == 0) 
  {
    obstacle = createSprite(400,300, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    
    obstacle.y=317;
    obstacle.velocityX=-6;
    obstacle.setLifetime=400/6;
    obstacleGroup.add(obstacle);
 }
}




