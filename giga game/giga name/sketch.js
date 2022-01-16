//variables for different characters are created
var ss;
var bgm;
//var Nemo ,   background, turtle, fish, shark ,seahorse ;

var giga, bird1 ,bird2, bird3, bird4, background;
var gigaImg, bird1Img, bird2Img, bird3Img , bird4Img, backgroundImage;

//var nemoIMG,  turtleIMG, fishIMG, sharkIMG ,seahorseIMG, backgroundImage;
var speed;

var health;
var health1,health2,health3;
var health1Image;

var GameOver,GameoverImage,gom,hrtm;
var gmover,gmoverIMG;

var gigaLogo, gigaLogoImg;
var start,startIMG;
var Score_,score;

//speed given to the game
speed = 3;



function preload(){
  
  //here images for all sprites are loaded
  backgroundImage = loadImage("images/background 1.jpg");
  GameoverImage = loadImage("images/gamover.png");
  gmoverIMG = loadImage("images/gameover2.png");

  gigaImg = loadAnimation('images/Giga1.png', 'images/Giga2.png', 'images/Giga3.png', 'images/Giga4.png', 'images/Giga5.png', 'images/Giga6.png', 'images/Giga7.png', 'images/Giga8.png');

  bird1Img = loadAnimation('images/Bird1.png', 'images/Bird2.png', 'images/Bird3.png', 'images/Bird4.png');
  bird2Img = loadAnimation('images/ABird1.png', 'images/ABird2.png', 'images/ABird3.png', 'images/ABird4.png');
  bird3Img = loadAnimation('images/CBird1.png', 'images/CBird2.png', 'images/CBird3.png', 'images/CBird4.png');
  bird4Img = loadAnimation('images/DBird1.png', 'images/DBird2.png', 'images/DBird3.png', 'images/DBird4.png');

 health1Image = loadImage("images/health.png");


  gigaLogoImg = loadImage("images/gigalogo.png");
  startIMG = loadImage("images/start (2).png");
 
//sounds for game are loaded
  bgm=loadSound("music/bgmusic.mp3");
  gom=loadSound("music/gameend.wav");
  hrtm=loadSound("music/gamestart.wav");

}





function setup() {
  //canvas for the game is created
  createCanvas(1000, 470);

  //as the game starts the score is already 1
score = 1


  //creating background
  background = createSprite(0,0,600,600);
  background.addImage(backgroundImage);
  background.scale = 1.2

  //creating logo
  gigaLogo = createSprite(500,150,20,20);
  gigaLogo.addImage(gigaLogoImg);
  gigaLogo.scale = 1;

//playing character is created
  giga = createSprite(900,220,20,50);
  giga.addAnimation("smiling",gigaImg); 
  giga.scale = 0.6;


  //health that is lifelines are created and images are added to it


  health1=createSprite(200,50,20,20)
health1.addImage(health1Image);
health1.scale = 0.2

health2=createSprite(230,50,20,20)
health2.addImage(health1Image);
health2.scale = 0.2

health3=createSprite(260,50,20,20)
health3.addImage(health1Image);
health3.scale = 0.2

score = 1


//start sprite is created

start = createSprite(480,350,20,20);
start.addImage(startIMG);
start.scale = 0.15



//creating gameover sign
GameOver= createSprite(500,240,20,20)
    GameOver.addImage(GameoverImage);
    GameOver.scale = 0.2;

    gmover = createSprite(500,340,20,20)
    gmover.addImage(gmoverIMG)
gmover.scale=0.03

//as the game starts the health at first is 7
  health=7;
 





   //making groups for each obstacle
  bird1= new Group();
  bird2= new Group();
  bird3= new Group();
  bird4= new Group();





}




function draw() {



//visible
// at first game over sign is not visible
GameOver.visible = false;
gmover.visible = false;



//it tells us the conditon of how to make the lifelines work
if(health>6){
health1.visible = false;
health2.visible = false;
health3.visible = false;



//start
//as the game starts the name of the game becomes invisible
if(mousePressedOver(start)){

  gigaLogo.visible = false;
// in the starting of game value of health is given as 6 and background music starts playing
  health = 6
  bgm.play()
} //unless the game does not get start, nemo will be invisible
giga.visible = false;
}


  // moving background
  background.velocityX = 3 

  //as the position of background goes out of screen after 99, the background image again comes at 
  //a position of its actual width by 6 so the background appears continuous
  if (background.x > 900){
    background.x = background.width/6;
  }


  //gamestate
  //it tell that till the time score is in between 0 to 7 let the value of score be shown

  if (health> 0 && health < 7){

console.log(score);


//collide

//if the bird1 which is an pbstacle hits the giga, reduce the lifeline by 2
if(bird1.collide(giga)){
  health = health-2
  bird1.destroyEach()
  hrtm.play();
  
}

//if the bird2 which is an obstacle hits the giga, reduce the lifeline by 2
if(bird2.collide(giga)){
  health = health-2
  bird2.destroyEach()
  hrtm.play();
}

//if the bird3 which is an obstacle hits the giga, reduce the lifeline by 2
//and after it hits destroy the obstacle and play another music which gives the feedback
if(bird3.collide(giga)){

  health = health-2
  bird3.destroyEach()
  hrtm.play();
}

//if the turtle which is an obstacle hits the nemo, reduce the lifeline by 2
if(bird4.collide(giga)){
  health = health-2
  bird4.destroyEach()
  hrtm.play();
}


//normally as the game progresses let the 3 lifelines and the nemo be visible for the entire game unless 
//stated
    giga.visible = true;
    health1.visible = true;
    health2.visible = true;
    health3.visible = true;

//speed
//as the game moves further after every freame count of 100 increase the speed of the game by 1
//so that the game becomes more engaging
if (World.frameCount % 100 ==0){
speed = speed+1;
}

//let the game over sign and start be invisible unless stated
GameOver.visible = false;
gmover.visible=false;
start.visible = false;





//mobilty to nemo
//nemo moves only with up and down arrow key along the y axis itself
if(keyDown("up_arrow")&& giga.y>0){
  giga.y =giga.y -10
}
if(keyDown("down_arrow")&& giga.y<470){
  giga.y = giga.y +10
}  


//random obstacle
//let oblstacle that are fish, shark, seahorse and turtle generate randomly
var select_obstacle = Math.round(random(1,4));
  //after every 100 frme count any one obstacle is generated
  if (World.frameCount % 100 == 0) {
    if (select_obstacle == 1) {
    obstacle_1();
    } else if (select_obstacle == 2) {
      obstacle_2();
    } else if (select_obstacle == 3) {
      obstacle_3();
    } else {
     obstacle_4();
    }
  }


//same as he above obstacle group property
//at a time 2 obstacles together can be formed
var select_obstacle2 = Math.round(random(1,4));
  if (World.frameCount % 100 == 0) {
    if (select_obstacle2 == 1) {
    obstacle_1();
    } else if (select_obstacle2 == 2) {
      obstacle_2();
    } else if (select_obstacle2 == 3) {
      obstacle_3();
    } else {
     obstacle_4();
    }
  }


//removed health if collide


//if the nemo collides with first obstacle deduct 1 lifeline that is 1st lifeline
if(health<6 && health == 4){
health3.visible = false;


}





//if the nemo collides with second obstacle deduct 1 more lifeline that is 2nd lifeline
if(health<4 && health ==2){
  health2.visible=false;

 health3.visible=false;


  }

  
//if the nemo collides with third obstacle deduct 1 more lifeline that is 3rd lifeline
//game gets over so the game over music is played
 if(health<2 && health ==0){
      health1.visible=false;
      health2.visible=false;
      health3.visible=false;

      gom.play();

      

  }

      

 






  }
  else{
    //gameover state as lifeline are over
    if(health <1){
//game over sign gets diplayed
//background stops moving
GameOver.visible = true;
gmover.visible = true;
    background.velocityX = 0

//restart function if the player clicks on the restart icon
//score start from 0 health comes back to 6 and background starts moving
    if(mousePressedOver(gmover)){
score=0;
health=6;
speed=3



//all the three lifelines are restored again
health1.visible = true;
health2.visible = true;
health3.visible = true;

health1.scale = 0.2;
health2.scale = 0.2;
health3.scale = 0.2;

    }
    }


  } 

//to show sprites on the screen
  drawSprites();
if(health<7 ){

  //text for score
//properties to diplay the text for score
fill("white");

textSize(18);
//as the frame count gets completely divisible by 60 the value for score gets on adding to the original 
//score at the moment 
    score = score + Math.round(getFrameRate()/60);
  text("Score: ", 500,50);

  //if all lifelines are secured display score
  if(health<7 && health>0){
    
fill("white");

textSize(18);


  text(score, 555,50);
  }
  else{
    if(health==0){
      fill("white");

textSize(18);


  text("0", 555,50);
    }
  }

}




}         



//diffrent functions needed for the game

//property for turtle obstacle
function obstacle_1() {
  var bird1_ = createSprite(0,Math.round(random(20, 470)), 10, 10);
 bird1_.addAnimation("flying",bird1Img);
  bird1_.velocityX = speed;
  bird1_.lifetime = 300;
  bird1_.scale = 0.5;
  bird1.add(bird1_);

}
//property for fish obstacle
function obstacle_2() {
  var bird2_ = createSprite(0,Math.round(random(20, 470)), 10, 10);
  bird2_.addAnimation("flapping",bird2Img);
  bird2_.velocityX = speed;
  bird2_.lifetime = 300;
  bird2_.scale = 0.5;
  bird2.add(bird2_);
  

}
//property for shark obstacle
function obstacle_3() {
  var bird3_ = createSprite(0,Math.round(random(20, 470)), 10, 10);
  bird3_.addAnimation("winging",bird3Img);
  bird3_.lifetime = 300;
  bird3_.scale = 0.5;
  bird3_.velocityX = speed;
  bird3.add(bird3_);

}
//property for seahorse obstacle
function obstacle_4() {
  //position of the obstacle is generated randomly
  var bird4_ = createSprite(0,Math.round(random(20, 470)), 1, 1);
  bird4_.addAnimation("soaring",bird4Img);
  bird4_.lifetime = 300;
  bird4_.velocityX = speed;
  bird4_.scale = 0.5;
  bird4.add(bird4_);

}



