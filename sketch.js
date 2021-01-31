//Create variables here
var database;
var dogImg , happyDogImg;
var foodS,foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value" , readStock);
  foodStock.set(30);
  
  dog = createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
}


function draw() {  
 background ("green");
 if(foodS !== undefined){
   textSize(20);
   fill(225);
   text("Note : Press DOWN ARROW to feed the DOG milk",20,50);
   text("food Remaining : "+ foodS,150,150);

   if(keyDown(DOWN_ARROW)){
     writeStock(foodS);
     dog.addImage(happyDogImg);
   }
   else{
     dog.addImage(dogImg);
   }
 
   if(foodS === 0){
     foodS = 30;
   }
  }
  drawSprites();
}

function writeStock(x){
 if(x<=0){
   x = 0;
 }
 else{
   x = x-1
 }
 database.ref("/").update({
   Food:x
 });
}

function readStock(data){
  foodS = data.val();
}