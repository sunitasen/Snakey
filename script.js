const submit_button=document.getElementById("submit_button");
const start_button = document.getElementById("start_button");
const restart_button = document.getElementById("restart_button");
const user_screen=document.getElementsByClassName("user-screen")[0];//user name that has to be displayed on the top of the game screen
const score_screen=document.getElementsByClassName("score-screen")[0];// score plate at the top
const canvas=document.getElementsByClassName("canvas")[0];
const status=document.getElementsByClassName("status")[0];
const text = document.getElementById("text");
const wrongInput = document.getElementById("wrongInput");
let userName=document.getElementById("username");
let user = document.getElementsByClassName("username")[1];
const modal_1=document.getElementsByClassName("modal-1")[0]; // The first page
const modal_2= document.getElementsByClassName("modal-2")[0]; // The second page
const modal_3= document.getElementsByClassName("modal-3")[0]; // The losing status page


let gameOn=true;  //flag to know when we have to start the game
let btnP;  //this is to set the game interval
let temp_interval;
let points=0;
let positionX=10;
let positionY=10;
let tcX=60;//the tiles count in x direction
let tcY=27;//the tiles count in y direction
let gs=20;//grid size
let TargetX=15;
let TargetY=15;
let xv=0;
let yv=0;//velocity in x and y direction
let snake=[];
let tail = 3;
let firstTime=true;
let direction="right";
let isReverseDirection =false;
let keyPressed=false;

userName.innerHTML = text.value;
modal_2.style.display="none";
modal_3.style.display="none";


const onNameSubmit = () =>{
    if(text.value!=""){
        userName.innerHTML = text.value;
        console.log(userName);
        modal_1.style.display="none";
        modal_2.style.display="block";
    }else{
        wrongInput.innerHTML = "come on! Enter your name";
    }
}

const keyPush=(evt)=>{
    switch(evt.keyCode) {
        case 37:
         if(direction==="right"){

          isReverseDirection=true;

         }else{

            xv=-1;yv=0;
            direction="left";

          }
          break;
        case 38:
          if(direction==="down"){

              isReverseDirection=true;

            }else{

              xv=0;yv=-1;
              direction="up";
             

           }
            break;
        case 39:
         if(direction==="left"){

            isReverseDirection=true;

          }else
            {

             xv=1;yv=0;
             direction="right";
            

          }
            break;
        case 40:
          if(direction==="up"){

          isReverseDirection=true;
          }else{

           xv=0;yv=1;
           direction="down";
          

          }
            break;
    }
    keyPressed=true;
}

//function to create random target
const newTarget=()=>{

    TargetX=Math.floor(Math.random()*tcX);
    TargetY=Math.floor(Math.random()*tcY);
}

//function that displays the snake
const updateField= ()=>{
 
    for(let i=0;i<snake.length;i++){

          ctx.fillStyle="white";
          ctx.fillRect(snake[i].x*gs,snake[i].y*gs,gs-2,gs-2);//for border because stroke rect is not working
       i
          if(firstTime){

              if(snake[i].x==positionX && snake[i].y==positionY){
                    tail = 3;//
                    firstTime=false;
               }
          }
     }
}

const LostGame=(positionX,positionY,snake)=>{

    let temp=0;

     //conditon1- if the head crooses the border
    if(positionX<-1 || positionY<-1 || positionX>tcX || positionY>tcY)
    {
      temp=1;
      
    }

     //condition2- if the user touches any part of its tail-for this i have to check each part of its tail and compare

    if(keyPressed === true && tail>5){

           for(let i=1;i<snake.length;i++){

              if(snake[i].x==snake[0].x && snake[i].y==snake[0].y) {
                 temp=1;
            
               }
          }
      }

return(temp);
}

const stop=()=>{
 
    positionX=positionY=10;
    xv=yv=0;
    points=0;
    keyPressed=false;
    tail=3;
    direction=undefined;
    clearInterval(temp_interval);

}


//function to stop the game after colloisons with the walls
const stopGame=()=>{

   gameOn=false;
   user.innerHTML=text.value;
   status.innerHTML=` Your final score is:${points}`;
   modal_3.style.animation="moveInLeft 1s ease-out";
   modal_3.style.display="block";
   stop();

}




const startGame = () => {

    btnP=1;
    //canvas=document.querySelector("canvas");
    ctx=canvas.getContext("2d");

    if(gameOn===true){

        document.addEventListener("keydown",keyPush);
        temp_interval= setInterval(game,1000 *btnP /10);

    }

}

const set=()=>{

    gameOn=true;
    startGame();
    btnP =btnP*10;
}

const onGameStart = () => {
    set();
    user_screen.innerHTML="Hey "+text.value;

  user_screen.innerHTML="Hey , "+text.value;
  score_screen.innerHTML="Score:"+points;
  canvas.style.display="block";
  modal_2.style.display="none";
}

const onGameRestart =() =>
{
  set();
  modal_3.style.display="none";
  score=0;
  score_screen.innerHTML="Score:"+points;

}


//function for game

const game=()=>{

    if(gameOn===true){

       positionX+=xv;
       positionY+=yv;



             if(LostGame(positionX,positionY,snake)){

                stopGame();

               }

               //defining the canvas
               ctx.fillStyle="black";
               ctx.fillRect(0,0,canvas.width,canvas.height);
               updateField();
               snake.push({x:positionX,y:positionY});

                   while(snake.length>tail){

                        snake.shift();

                     }


                     //snake hits the target
                    if(TargetX==positionX && TargetY==positionY) {

                               points++;
                               score_screen.innerHTML="Score:"+points;
                               tail++;
                               newTarget();

                     }

                 ctx.fillStyle="yellow";
                 ctx.fillRect(TargetX*gs,TargetY*gs,gs-2,gs-2);

       }
}



submit_button.addEventListener("click",onNameSubmit);
start_button.addEventListener("click",onGameStart);
restart_button.addEventListener("click",onGameRestart);
