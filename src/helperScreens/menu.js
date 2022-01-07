const MENULINKS = {
  PLAY : 0,
  TUTORIAL : 1,
};

export default class Menu {
    constructor(game) {
      this.game = game
      let markup = this.createHTML();
      let canvas = document.getElementById("gameScreen");
      this.canvas = canvas
      this.gameMenu = document.createElement("div");
      this.gameMenu.id = 'game-menu'
  
      this.gameMenu.innerHTML = markup;

      this.tutorial = document.createElement("div");
      this.tutorial.id = 'tutorial'
      this.BackButton = document.createElement("div");
      this.BackButton.id = 'tutorial-back'
      this.BackButton.innerHTML = '<span> Back </span>'
      this.tutorial.append(this.BackButton)
      this.tutorial.append(game.tutorial)

      this.gameMask = document.createElement("div");
      this.gameMask.id = 'game-mask'

      canvas.parentNode.insertBefore(this.gameMenu, canvas);
      canvas.parentNode.insertBefore(this.tutorial, canvas);
      canvas.parentNode.insertBefore(this.gameMask, canvas);

      this.soundToggle = document.getElementById('soundToggle');
      this.fadedout = true;
      this.hidden = function(){
        return this.gameMenu.style.display != "flex";
      }

      this.eventHandler()

    }

    // MENULINKS is used to abstract away the different buttons used by assigning a number in data-menu-item

    createHTML() {
      return `
        <span class="menu-title">Main Menu</span>
        <a href="#" data-menu-item="${MENULINKS.PLAY}" class="play active">Play</a>
        <a href="#" data-menu-item="${MENULINKS.TUTORIAL}">How To Play</a>
        <a href="#" data-menu-item="setting">Settings</a>
        <div>
          <label for="soundToggle">Sound</label>
          <label class="switch">
            <input id="soundToggle" name="soundToggle" type="checkbox" checked>
            <span class="slider round"></span>
          </label>
        </div>
      `;
    }

    eventHandler(){
        this.gameMenu.addEventListener('transitionend', function(event) {
            this.fadedout = !this.fadedout;
          }.bind(this));


          let anchors = this.gameMenu.getElementsByTagName('a');
          for(let z = 0; z < anchors.length; z++) {
              let elem = anchors[z];   
              elem.onclick = function() {
                  let action = elem.getAttribute('data-menu-item');
                  if (MENULINKS.PLAY == action){

                    // This handles the deference between unpausing and active game and starting a new one
                    if (this.game.GAMESTATE.PAUSED == this.game.gamestate){
                      // in case the game has been paused, unpause it, then await 100 ms and start the game
                      // this is to avoid clicking on a game tile while the game is loaded back on
                      this.unpause()
                      this.game.updateGameState(this.game.GAMESTATE.REST)
                      setTimeout(() => {
                        this.game.updateGameState(this.game.GAMESTATE.RUNNING)
                        this.game.helperScreens.menuBar.show()
  
                      }, 100);
                    }else{
                      // in case the game is starting now start the countdown, then once it is finished, start the game
                      this.hide()
                      this.game.updateGameState(this.game.GAMESTATE.STARTING)
                      this.game.helperScreens.startingGameCountDown.start()
                    }
                    
                    // load the tutorial
                  }else if (MENULINKS.TUTORIAL == action){
                    this.gameMenu.style.opacity = 0;
                    this.show(this.tutorial)
                  }

              }.bind(this);
          }
          this.BackButton.onclick = function() {
            this.tutorial.style.opacity = 0;
            this.gameMenu.style.opacity = 1;
            this.tutorial.style.display = "none";
          }.bind(this);

          this.soundToggle.onchange = function(){
            this.game.soundOn = this.soundToggle.checked
          }.bind(this);
    }

    show(element = this.gameMenu){
      element.style.display = "flex";
      setTimeout(() => {
        element.style.opacity = 1;
      }, 400);
    }

    hide(element = this.gameMenu){ 
      element.style.opacity = 0;
      element.style.display = "none";
    }

    pause(element = this.gameMenu){
      if (element.id == 'game-menu'){
        element.querySelector('.play').innerHTML = 'Resume'
        this.gameMask.style.opacity = 1
      }
      element.style.display = "flex";
      setTimeout(() => {
        element.style.opacity = 1;
      }, 100);
    }

    unpause(element = this.gameMenu){
      this.gameMask.style.opacity = 0
      element.style.display = "none";
      element.style.opacity = 0;
    } 
  }
  