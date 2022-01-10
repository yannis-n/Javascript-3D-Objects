import Menu from "../../src/helperScreens/menu.js";
import LoadingBar from "../../src/helperScreens/loadingBar.js";
import MenuBar from "../../src/helperScreens/menuBar.js";
import StartingGameCountDown from "../../src/helperScreens/startingGameCountDown.js";
import AssessementSymbols from "../../src/helperScreens/assessementSymbols.js";

export function createMenu(game, gameWidth, gameHeight){
        return new Menu(game, gameWidth, gameHeight)
}

export function createAssessementSymbols(game){
        return new AssessementSymbols(game)
}

export function createLoadingBar(game){
        return new LoadingBar(game)
}

export function createMenuBar(game){
        return new MenuBar(game)
}

export function createStartingGameCountDown(game){
        return new StartingGameCountDown(game)
}

export function updateGameStateForHelperScreens(game, GAMESTATE){
        
    if (game.gamestate === GAMESTATE.LOADING){

        if (game.helperScreens.loadingBar.loaded()){
          game.helperScreens.loadingBar.hide()
        //       if (game.helperScreens.loadingBar.hidden()){
                game.updateGameState(GAMESTATE.MENU)
                
        //       }     
        }
      }

      if (game.gamestate === GAMESTATE.MENU) {
        if (game.helperScreens.menu.hidden()){
                game.helperScreens.menu.show()
        }
      }

      if (game.gamestate === GAMESTATE.PAUSED) {
        if (game.helperScreens.menu.hidden()){
              game.helperScreens.menu.pause()
        }

        // if (!game.helperScreens.menuBar.hidden()){
        //         game.helperScreens.menuBar.hide ()
        //   }
      }

      if (game.gamestate === GAMESTATE.RUNNING) {
        if (game.helperScreens.menuBar.hidden()){
              game.helperScreens.menuBar.show()
        }
      }

        if ( game.levelCompleted() ) {
                // this is where we should check if the sum is correct
                if (game.gamestate === GAMESTATE.RUNNING) {
                        game.updateGameState(GAMESTATE.ASSESSINGLEVEL)
                        
                        if (game.correctAndWrongAssessement){

                        // this determines how long the crossmark or checkmark will remain in frame
                        game.counter = 50;
                        
                        if (game.correctAssessement()){
                        let checkmark = document.getElementById("screen-checkmark")
                        console.log(checkmark)
                        checkmark.style.display = 'block';
                        setTimeout(() => {
                                checkmark.style.zIndex = '3';
                                checkmark.classList.add("grow-checkmark");
                        }, 5);
                        } else{
                        let crossmark = document.getElementById("screen-crossmark")
                        crossmark.style.display = 'block';
                        setTimeout(() => {
                                crossmark.style.zIndex = '3';
                                crossmark.classList.add("grow-crossmark");
                        }, 5);
                        game.wrongAnswer = true;
                        }
                        
                        // if (game.soundOn){
                        //   setTimeout(() => {
                        //     var audio = new Audio('media/audio/frouts.wav');
                        //     audio.play(); 
                        //   }, 1000); 
                        // }
                        
                        }
                }
        }
        
        if (game.gamestate === GAMESTATE.ASSESSINGLEVEL) {
                if (game.correctAndWrongAssessement){

                        if (game.counter == 0){
                                game.updateGameState(GAMESTATE.LEVELDONE)
                                game.refreshAnswers()
                        
                                // expicitly reset the checkmark or crossmark
                                if (game.wrongAnswer){
                                let crossmark = document.getElementById("screen-crossmark")
                                crossmark.style.display = 'none';
                                crossmark.classList.remove("grow-crossmark");
                                }else{
                                let checkmark = document.getElementById("screen-checkmark")
                                checkmark.style.display = 'none';
                                checkmark.classList.remove("grow-checkmark");
                                }       
                        }
                        game.counter -= 1;
                }else{
                  game.updateGameState(GAMESTATE.LEVELDONE)

                }
        }

        // this is used to load the rendered for the 3d objects
        if (game.gamestate === GAMESTATE.RUNNING) {
                if (game.renderer){
                        if (game.renderIsHidden()){
                                document.getElementById('ThreedObjectsCanvas').style.display = 'flex'
                        }
                }
        }
      
}

