var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisible_block,invisbleblock_group;
var gameState="play"
var sound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  sound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  
invisibleblock_group=new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  
  sound.loop();
}

function draw(){
  background(0);
  
  
    if(gameState==="play"){
      
       if(tower.y > 400){
      tower.y = 300
    }
   spawndoors();
      
      if(invisibleblock_group.isTouching(ghost)||ghost.y>600){
        
        ghost.destroy();
        gameState="end";
      }
  
      
      if(climbersGroup.isTouching(ghost)){
        ghost.velocityY=0;
      }
      
      
   if(keyDown("space")){
     ghost.velocityY=-5;
     
     
   }
   ghost.velocityY=ghost.velocityY+0.2;
  
    if(keyDown("LEFT_ARROW")){
      ghost.x=ghost.x-3;
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x=ghost.x+3;
    }
    
    drawSprites();
  
      
      
      
}
  
  if(gameState==="end"){
    
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("gameover",230,250);
    
  }
      
    }
    
   
  
function spawndoors() {
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {
    var door = createSprite(200,-50);
    door.x = Math.round(random(120,400));
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGroup.add(door);
    var climber = createSprite(200,10);
    climber.x = door.x;
    climber.scale=0.8;
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    
    invisible_block=createSprite(200,15,climber.width,2);
     invisible_block.x=door.x;
    invisible_block.velocityY=1;
    invisible_block.debug=true;
    invisibleblock_group.add(invisible_block);
    invisible_block.lifetime=800;
    
    
  }
}



