class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
     
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
  
    cars = [car1, car2];


    passedFinish= false;
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();


    player.getFinishedPlayers();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
 
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
    
        index = index + 1 ;

        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       
       
        if (index === player.index){

          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;

    
        }  
        //Player's name below the car
        fill("black")
        noStroke();
        textAlign(CENTER);
                textSize(20);
                text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 75);
      }
    

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && passedFinish!==true){
      player.distance +=10
      player.update();
    }

    if(player.distance > 500 && passedFinish===false){
      Player.updateFinishedPlayers();
      player.rank= finishedPlayers;
      player.update();
      passedFinish= true;
     
    }
   
    drawSprites();
  }


  displayRanks(){
    camera.position.x =0;
    camera.position.y = 0;
     
    imageMode(CENTER);
    Player.getPlayerInfo();

    image(goldbadge, displayWidth/-4, -100 + displayHeight/9, 225, 270);
    image(silverbadge, displayWidth/4, -100 + displayHeight/10, 225, 270);
   
    textAlign(CENTER);
    textSize(50);
    for(var plr in allPlayers){
      if(allPlayers[plr].rank === 1){
        text("1st :  "+allPlayers[plr].name,displayWidth/-4, displayHeight/9 + 73);
      }
      else{
        text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
      }
    }
  }
}
