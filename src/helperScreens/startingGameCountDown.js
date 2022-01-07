const script = [
    'ready',
    'set',
    'go'
];
  
  export default class StartingGameCountDown {
      constructor(game) {
        this.game = game
        this.script = script
        // let markup = this.createHTML();
        let canvas = document.getElementById("gameScreen");
        this.canvas = canvas
        this.gameCountDown = document.createElement("div");
        this.gameCountDown.id = 'game-countdown'
        // this.gameCountDown.innerHTML = markup
        canvas.parentNode.insertBefore(this.gameCountDown, canvas);

    

        this.hidden = function(){
          return this.gameCountDown.style.opacity == 0;
        }


        // this.eventHandler()
  
      }
  
      // createHTML() {
      //   return `
      //   <span>${script[0]}</span>
      //   `;
      // }

      start(){
        var gameCountDown = this
        var script = this.script
        const GAME = this.game
        var i = 0;
      

        // function countDownLoop() {         //  create a loop function
        //   setTimeout(function() {   //  call a 3s setTimeout when the loop is called
        //     gameCountDown.gameCountDown.innerHTML = `<span>${script[i]}</span>`
        //     gameCountDown.show()
        //     gameCountDown.hide()
        //     if (i < script.length - 1) {           //  if the counter < 10, call the loop function
        //       countDownLoop();             //  ..  again which will trigger another 
        //     }else{
        //       GAME.updateGameState(GAME.GAMESTATE.RUNNING)

        //     }
        //     i++;                    //  increment the counter
        //   }.bind(this), 2000)
        // }
        
        // countDownLoop();                   //  start the loop

        function timer(ms) { return new Promise(res => setTimeout(res, ms)); }
        async function show() { // 3
          gameCountDown.show()
          await timer(800);
        }

        async function hide() { // 3
          gameCountDown.hide()
          await timer(800);
        }

        async function countDownLoop() {
          for(let i = 0; i < script.length; i+= 1) {
            gameCountDown.gameCountDown.innerHTML = `<span>${script[i]}</span>`
            await show();
            await hide();
          }
          await timer(500);

          GAME.updateGameState(GAME.GAMESTATE.RUNNING)

        }

        countDownLoop();

      }
  

  
      show(element = this.gameCountDown){ 
        setTimeout(() => {
          element.style.opacity = 1;

        }, 400);
      }

      hide(element = this.gameCountDown){ 
        setTimeout(() => {
          element.style.opacity = 0;
        }, 400);  
      }
    
    }
    