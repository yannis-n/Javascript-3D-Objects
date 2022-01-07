const MENULINKS = {
    PLAY : 0,
    TUTORIAL : 1,
  };

export default class MenuBar {
  constructor(game) {
    this.game = game
    let markup = this.createHTML();
    let canvas = document.getElementById("gameScreen");
    this.canvas = canvas
    this.gameMenuBar = document.createElement("div");
    this.gameMenuBar.id = 'game-menu-bar'

    this.gameMenuBar.innerHTML = markup;
    this.gameMenuBar.leftSide = this.gameMenuBar.querySelector('.left-side');
    this.gameMenuBar.rightSide = this.gameMenuBar.querySelector('.right-side');

    this.buttons = {}
    // Create the various buttons neccessary for the menu bar
    // It is done this way in case it is neccessary to load different buttons for different games
    this.undoButtonFuncionality = game.undoButtonFuncionality
    console.log(this.undoButtonFuncionality)
    if(this.undoButtonFuncionality){
      this.buttons.undoButton = document.createElement("button");
      this.buttons.undoButton.id = 'undo-button'
      this.buttons.undoButton.innerHTML = '<div class="reloadSingle"></div>'
    }

    this.buttons.pauseButton = document.createElement("button");
    this.buttons.pauseButton.id = 'pause'
    this.buttons.pauseButton.innerHTML = '<div class="play-pause play-pause__pause"></div>'

    // appennd in leftSide
    for (const key in this.buttons) {
        if (Object.hasOwnProperty.call(this.buttons, key)) {
            const element = this.buttons[key];
            this.gameMenuBar.leftSide.append(element)
        }
    }

    this.timer = document.createElement("div");
    this.timer.id = 'timer'
    
    this.gameMenuBar.rightSide.append(this.timer)


    canvas.parentNode.insertBefore(this.gameMenuBar, canvas);

    this.soundToggle = document.getElementById('soundToggle');

    this.duration = 60 * 4;
    this.timerDown = this.duration

    this.hidden = function(){
      return this.gameMenuBar.style.opacity == 0;
    }

    this.timerMarkUp(this.duration)
    this.startTimer()

    this.eventHandler()

  }

  createHTML() {
    return `    
      <div class="left-side"></div>
      <div class="right-side"></div>
    `;
  }

  timerMarkUp(countDown){
    let minutes, seconds;
    minutes = parseInt(countDown / 60, 10)
    seconds = parseInt(countDown % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    this.timer.textContent = minutes + ":" + seconds;
  }

  startTimer() {
    this.timerDown = this.duration
    --this.timerDown;
    let countDown = setInterval(function () {
        if (this.game.gamestate == this.game.GAMESTATE.RUNNING){
            this.timerMarkUp(this.timerDown)
            if (--this.timerDown < 0) {
                clearInterval(countDown);
                this.timerDown = this.duration;
            }
        }
    }.bind(this), 1000);
  }

  eventHandler(){
    this.buttons.pauseButton.onclick = function() {
        if (this.game.gamestate == this.game.GAMESTATE.RUNNING){
            this.game.togglePause()
        }
    }.bind(this);
    
    if (this.undoButtonFuncionality){
      this.buttons.undoButton.onclick = function() {
        if (this.game.gamestate == this.game.GAMESTATE.RUNNING){
            this.game.undoAnswers()
        }
    }.bind(this);
    }
  }

  show(element = this.gameMenuBar){
    element.style.display = "flex";
    element.style.opacity = 1;
  }

  hide(element = this.gameMenuBar){ 
    element.style.opacity = 0;
    element.style.display = "none"; 
  }
}
    