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
              switch (event.keyCode) {
                case 32:
                this.game.togglePause();
                break;
              }            
          }
        }); 

        
    }
  }
  