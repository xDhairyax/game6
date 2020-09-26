var player,playerImg;
var bg;
var enemy,enemyImg;
var ground;
var upArrow,rightArrow,leftArrow,downArrow,shootBullet;
var bullet,bulletImg;
var count=0;
var gameState=1;
var kills=0;
var enemiesGroup,bulletGroup;
var bg2,bg3;
var boss1,boss2,boss3;
var boss1Bullet;
var boss1bulletGroup;
var boss2bullet;
var boss2bulletGroup;
var damage=0;
var boss;
var lives=3;
var boss3bulletGroup;

function preload(){
  playerImg=loadImage("images/player.png");
  bg=loadImage("images/bg.jpeg");
  enemyImg=loadImage("images/enemies.png");
  bulletImg=loadImage("images/normalBullet.jpg");
  bg2=loadImage("images/bg2.gif");
  boss1=loadImage("images/boss1.jpeg");
  bossBullet=loadImage("images/SMbullet.png");
  bg3=loadImage("images/bg3.jpeg");
  boss2=loadImage("images/boss2.jpeg");
  boss3=loadImage("images/boss3.jpeg");

}


function setup(){
  createCanvas(displayWidth-20,displayHeight-20);

  ground=createSprite(displayWidth/2,displayHeight-200,displayWidth,20);
  ground.visible=false;
  

  player=createSprite(100,displayHeight-250,50,50);
  player.addImage("player",playerImg);
  player.scale=0.25;


 /* upArrow=createButton("JUMP");
upArrow.position(displayWidth-400,displayHeight-300);
upArrow.mousePressed(()=>{
  player.y=player.y-50;

});

downArrow=createButton("DOWN");
downArrow.position(displayWidth-400,displayHeight-250);
downArrow.mousePressed(()=>{
  player.y=player.y+50;
})

 rightArrow=createButton("RIGHT");
  rightArrow.position(displayWidth-350,displayHeight-270);
  rightArrow.mousePressed(()=>{
    player.x=player.x+40;
  })

  leftArrow=createButton("LEFT");
  leftArrow.position(displayWidth-450,displayHeight-270);
  leftArrow.mousePressed(()=>{
    player.x=player.x-40;
  })*/

  shootBullet=createButton("SHOOT");
  shootBullet.position(displayWidth-400,displayHeight-350);
  shootBullet.mousePressed(()=>{
    bulletGroup.setVelocityXEach(50);
    bulletGroup.setVisibleEach(true);
  })

  boss=createSprite(displayWidth-300,displayHeight-500,50,50);
  boss.addImage("bossIMAGE",boss1);

  enemiesGroup=new Group();
  bulletGroup=new Group();
  boss1bulletGroup=new Group();
  boss2bulletGroup=new Group();
  boss3bulletGroup=new Group();

}


function draw(){

  upArrow=createButton("JUMP");
  upArrow.position(displayWidth-400,displayHeight-300);
  upArrow.mousePressed(()=>{
    player.y=player.y-50;
  
  });

  downArrow=createButton("DOWN");
downArrow.position(displayWidth-400,displayHeight-250);
downArrow.mousePressed(()=>{
  player.y=player.y+50;
})

 rightArrow=createButton("RIGHT");
  rightArrow.position(displayWidth-350,displayHeight-270);
  rightArrow.mousePressed(()=>{
    player.x=player.x+40;
  })

  leftArrow=createButton("LEFT");
  leftArrow.position(displayWidth-450,displayHeight-270);
  leftArrow.mousePressed(()=>{
    player.x=player.x-40;
  })

  createBullet();

  
  
  if(gameState===1){
  background(bg);

  boss.visible=false;

  textSize(50);
  text("LIVES:"+lives,400,200);

  textSize(50);
  stroke(255);
  text("KILLS:"+kills,displayWidth/2,200);
  //camera.position.x=player.x;
  //camera.position.y=displayHeight/2;
player.collide(ground);
enemiesGroup.collide(ground);
//if(keyIsDown(UP_ARROW)){
 // bulletGroup.visible=true;
  //bulletGroup.velocityX=50;
//}
if(enemiesGroup.isTouching(bulletGroup)){
  enemiesGroup.destroyEach();
  bulletGroup.destroyEach();
  kills=kills+1;
}
if(enemiesGroup.isTouching(player)){
 lives=lives-1;
}
if(lives===0){
  gameState=7;
}
spawnEnemy();


if(kills>1){
  gameState=2;
}
  }

  if(gameState===2){
    background(bg);
    boss.visible=true;

    var ground1=createSprite(displayWidth/2,displayHeight-200,displayWidth,20);
    ground1.visible=false;

  //  player.x=200;
   // player.y=600;
    boss.collide(ground);

    textSize(50);
  text("LIVES:"+lives,400,200);


    Boss1Bullet();
  // boss1bulletGroup.collide(ground);
   // if(boss1bulletGroup.isTouching(ground)){
     // boss1bulletGroup.destroyEach();
    //}
 
    if(boss1bulletGroup.isTouching(player)){
      boss1bulletGroup.destroyEach();
     // player.destroy();
     // gameState=7;
      lives=lives-1;
    }

    if(lives===0){
      gameState=7;
    }

    //write condition of gameState going to 3
    if(bulletGroup.isTouching(boss)){
      damage=damage+1;
      bulletGroup.destroyEach();
    }

    if(damage===10){
      boss.destroy();
      boss1bulletGroup.destroyEach();
      gameState=3;
    }

    upArrow=createButton("JUMP");
  upArrow.position(displayWidth-400,displayHeight-300);
  upArrow.mousePressed(()=>{
    player.y=player.y-50;
  console.log(player.y);
  });

  downArrow=createButton("DOWN");
downArrow.position(displayWidth-400,displayHeight-250);
downArrow.mousePressed(()=>{
  player.y=player.y+50;
})

 rightArrow=createButton("RIGHT");
  rightArrow.position(displayWidth-350,displayHeight-270);
  rightArrow.mousePressed(()=>{
    player.x=player.x+40;
  })

  leftArrow=createButton("LEFT");
  leftArrow.position(displayWidth-450,displayHeight-270);
  leftArrow.mousePressed(()=>{
    player.x=player.x-40;
  })

  }

  if(gameState===3){
    background(bg);
   
    ground=createSprite(displayWidth/2,displayHeight-200,displayWidth,20);
    ground.visible=false;

    textSize(50);
  text("LIVES:"+lives,400,200);


    textSize(50);
    stroke(255);
    text("KILLS:"+kills,displayWidth/2,200);

    spawnEnemy();
    text("COUNT"+count,400,100);
    enemiesGroup.collide(ground);
  
    enemiesGroup.setVelocityXEach(-15);
    enemiesGroup.setVelocityYEach(10);
    if(enemiesGroup.isTouching(bulletGroup)){
      enemiesGroup.destroyEach();
      bulletGroup.destroyEach();
      kills=kills+1;
    }

      if(kills>15){
        gameState=4;
      }
    
    if(enemiesGroup.isTouching(player)){
     // player.destroy;
      lives=lives-1;
    }

    if(lives===0){
      gameState=7;
    }

    upArrow=createButton("JUMP");
    upArrow.position(displayWidth-400,displayHeight-300);
    upArrow.mousePressed(()=>{
      player.y=player.y-50;
    console.log(player.y);
    });
  
    downArrow=createButton("DOWN");
  downArrow.position(displayWidth-400,displayHeight-250);
  downArrow.mousePressed(()=>{
    player.y=player.y+50;
  })
  
   rightArrow=createButton("RIGHT");
    rightArrow.position(displayWidth-350,displayHeight-270);
    rightArrow.mousePressed(()=>{
      player.x=player.x+40;
    })
  
    leftArrow=createButton("LEFT");
    leftArrow.position(displayWidth-450,displayHeight-270);
    leftArrow.mousePressed(()=>{
      player.x=player.x-40;
    })

  }

if(gameState===4){
  background(boss2);
    
  Boss2Bullet();

  textSize(50);
  text("LIVES:"+lives,400,200);

  if(boss2bulletGroup.isTouching(player)){
    boss2bulletGroup.destroyEach();
    //player.destroy();
    lives=lives-1;
  }

  //write condition of gameState going to 5
if(lives===0){
  gameState=7;
}

upArrow=createButton("JUMP");
upArrow.position(displayWidth-400,displayHeight-300);
upArrow.mousePressed(()=>{
  player.y=player.y-50;
console.log(player.y);
});

downArrow=createButton("DOWN");
downArrow.position(displayWidth-400,displayHeight-250);
downArrow.mousePressed(()=>{
player.y=player.y+50;
})

rightArrow=createButton("RIGHT");
rightArrow.position(displayWidth-350,displayHeight-270);
rightArrow.mousePressed(()=>{
  player.x=player.x+40;
})

leftArrow=createButton("LEFT");
leftArrow.position(displayWidth-450,displayHeight-270);
leftArrow.mousePressed(()=>{
  player.x=player.x-40;
})

if(bulletGroup.isTouching(boss2)){
  damage=damage+1;
}
if(damage===10){
  boss2.destroy();
  gameState=5;
}


}

if(gameState===5){
  background(bg);

  ground=createSprite(displayWidth/2,displayHeight-200,displayWidth,20);
  ground.visible=false;

  spawnEnemy();

  textSize(50);
  text("LIVES:"+lives,400,200);

    textSize(50);
    stroke(255);
    text("KILLS:"+kills,displayWidth/2,200);

  if(enemiesGroup.isTouching(player)){
    lives=lives-1;
  }

  if(lives===0){
    gameState=7;
  }

  if(enemiesGroup.isTouching(bulletGroup)){
    enemiesGroup.destroyEach();
    bulletGroup.destroyEach();
    kills=kills+1;
  }

  if(kills>20){
    text("YOU WIN",400,400);
    gameState=8;
    }
  }

  upArrow=createButton("JUMP");
    upArrow.position(displayWidth-400,displayHeight-300);
    upArrow.mousePressed(()=>{
      player.y=player.y-50;
    console.log(player.y);
    });
  
    downArrow=createButton("DOWN");
  downArrow.position(displayWidth-400,displayHeight-250);
  downArrow.mousePressed(()=>{
    player.y=player.y+50;
  })
  
   rightArrow=createButton("RIGHT");
    rightArrow.position(displayWidth-350,displayHeight-270);
    rightArrow.mousePressed(()=>{
      player.x=player.x+40;
    })
  
    leftArrow=createButton("LEFT");
    leftArrow.position(displayWidth-450,displayHeight-270);
    leftArrow.mousePressed(()=>{
      player.x=player.x-40;
    })

  /*if(gameState===6){
    background(boss3);

    Boss3Bullet();

    textSize(50);
    text("LIVES:"+lives,400,200);
    
  
    if(boss3bulletGroup.isTouching(player)){
      boss3bulletGroup.destroyEach();
      //player.destroy();
      lives=lives-1;
    }

  if(lives===0){
    gameState=7;
  }

    upArrow=createButton("JUMP");
    upArrow.position(displayWidth-400,displayHeight-300);
    upArrow.mousePressed(()=>{
      player.y=player.y-50;
    console.log(player.y);
    });
  
    downArrow=createButton("DOWN");
  downArrow.position(displayWidth-400,displayHeight-250);
  downArrow.mousePressed(()=>{
    player.y=player.y+50;
  })
  
   rightArrow=createButton("RIGHT");
    rightArrow.position(displayWidth-350,displayHeight-270);
    rightArrow.mousePressed(()=>{
      player.x=player.x+40;
    })
  
    leftArrow=createButton("LEFT");
    leftArrow.position(displayWidth-450,displayHeight-270);
    leftArrow.mousePressed(()=>{
      player.x=player.x-40;
    })

    if(bulletGroup.isTouching(boss3)){
      damage=damage+1;
    }
    if(damage===10){
      boss3.destroy();
     text("YOU WIN",400,400);
     textSize(500);
    }

  }*/

  if(gameState===7){
  bulletGroup.destroyEach();
  enemiesGroup.destroyEach();
  textSize(50);
  text("GAME OVER",400,400);
  textSize(50); 
  text("YOU LOSE",400,450);
     
  }

  if(gameState===8){
    bulletGroup.destroyEach();
    enemiesGroup.destroyEach();
    textSize(50);
    text("YOU WIN",400,400);
  }

  drawSprites();
}

function Boss3Bullet(){
  if(frameCount % 100===0){
    var Bbullet3=createSprite(400,400,30,30);
    Bbullet3.addImage("bulletss1",bossBullet);
    Bbullet3.scale=0.3;

    Bbullet.velocityY=10;
    //Bbullet3.lifetime=180;

    boss3bulletGroup.add(Bbullet3);
  }
}

function Boss2Bullet(){
  if(frameCount % 100===0){
    var Bbullet2=createSprite(400,400,30,30);
    Bbullet2.addImage("bullets1",bossBullet);
    Bbullet2.scale=0.3;

    Bbullet2.velocityY=10;

   // Bbullet2.lifetime=180;

    boss2bulletGroup.add(Bbullet2);

  }
}

function Boss1Bullet(){
  if(frameCount % 50===0){
  var Bbullet=createSprite(600,550,30,30);
  Bbullet.addImage("bullets",bossBullet);
  Bbullet.scale=0.3

  Bbullet.velocityX=-20;

  Bbullet.lifetime=500;

  var rand=Math.round(random(1,2));
  if(rand===1){
    Bbullet.x=600;
    Bbullet.y=450;
    Bbullet.velocityY=10;
  }else{
    Bbullet.x=600;
    Bbullet.y=700;
   
  }
  Bbullet.collide(ground);

  boss1bulletGroup.add(Bbullet);

}
}

function spawnEnemy(){
if(frameCount % 50===0 && count<10){
var enemy=createSprite(displayWidth,displayHeight-250,50,50);
  enemy.addImage("enemy",enemyImg);
  enemy.scale=0.7;
 count++
//enemy.velocityX=-(15+(count/2));
enemy.velocityX=-15;
enemy.velocityY=10;
 var rand=Math.round(random(1,3));
 if(rand===1){
   enemy.y=150;
 }
 else if(rand===2){
   enemy.y=displayHeight/2;
 }
 else{
 enemy.y=displayHeight-250;
 }
enemiesGroup.add(enemy);
}
}

function createBullet(){
  var bullet=createSprite(100,displayHeight-250,50,50);
  bullet.addImage("gun",bulletImg);
  bullet.x=player.x;
  bullet.y=player.y;
  bullet.visible=false;
  bullet.scale=0.1;

  bulletGroup.add(bullet);
}
