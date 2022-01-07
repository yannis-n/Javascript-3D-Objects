const MENULINKS = {
    PLAY : 0,
    TUTORIAL : 1,
  };
  
  export default class AssessementSymbols {
      constructor(game) {
        this.game = game
        let canvas = document.getElementById("gameScreen");
        this.canvas = canvas
        this.checkSymbol = document.createElement("span");
        this.checkSymbol.classList.add('checkmark');
        this.checkSymbol.id = 'screen-checkmark'
        this.checkSymbol.innerHTML = this.createCheckmarkHTML();
  
        this.crossSymbol = document.createElement("span");
        this.crossSymbol.classList.add('crossmark');
        this.crossSymbol.id = 'screen-crossmark';
        this.crossSymbol.innerHTML = this.createCrossmarkHTML();
  
        canvas.parentNode.insertBefore(this.crossSymbol, canvas);
        canvas.parentNode.insertBefore(this.checkSymbol, canvas);
  

  
      }
  
      // MENULINKS is used to abstract away the different buttons used by assigning a number in data-menu-item
  
      createCheckmarkHTML() {
        return `
            <div class="checkmark_stem"></div>
            <div class="checkmark_kick"></div>
        `;
      }

      createCrossmarkHTML() {
        return `
            <div class="crossmark1"></div>
            <div class="crossmark2"></div>
        `; 
      }
    }
    