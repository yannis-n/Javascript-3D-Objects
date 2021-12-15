import { getCursorPosition } from "../src/helper.js";

export default class InputHandler {
    constructor(game, GAMESTATE) {
          this.game = game
          this.GAMESTATE = GAMESTATE  
    }

    init(){
      addEventListener('mousemove', event => {
        let position = getCursorPosition(this.game.canvas, event)
        this.game.mouse.x = position.x;
        this.game.mouse.y = position.y;
      });

      document.addEventListener("click", event => {
        if (this.game.gamestate === this.GAMESTATE.MENU) {
          let position = getCursorPosition(this.game.canvas, event)
          this.game.checkPlayButtonClick(position.x, position.y);
        }
      });

  
        
        document.addEventListener("click", event => {
          if (this.game.gamestate === this.GAMESTATE.RUNNING) {
            let position = getCursorPosition(this.game.canvas, event)
            this.game.handleUnitClick(position.x, position.y);
          }
        });

        document.addEventListener("keydown", event => {
          if (this.game.gamestate === this.GAMESTATE.RUNNING) {
            const isNumber = /^[0-9]$/i.test(event.key)
            if (isNumber){
              this.game.fillNumber(event.key)
            }else{
              switch (event.keyCode) {

        
                case 27:
                  game.togglePause();
                  break;
        

              }
            }
          }
        });

        
    }
  }
  