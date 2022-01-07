
export default class LoadingBar {
  constructor(game) {
      let canvas = document.getElementById("gameScreen");

      this.myProgress = document.createElement("div");
      this.myProgress.id = 'myProgress'
      this.myBar = document.createElement("div");
      this.myBar.id = 'myBar'
      this.myBar.innerHTML = '0%';

      this.myProgress.append(this.myBar)
  
      canvas.parentNode.insertBefore(this.myProgress, canvas);

      myProgress.setAttribute("role", "progressbar");
      myProgress.setAttribute("aria-valuemin", 0);
      myProgress.setAttribute("aria-valuemax", 100);
      
      this.fadedout = false

      this.startLoading();

      this.loaded = function(){
          return this.myBar.style.width == '100%'
      }

      this.hidden = function(){
          return this.fadedout 
      }

      this.eventHandler()

  }

  eventHandler(){
      myProgress.addEventListener('transitionend', function(event) {
          this.fadedout = !this.fadedout;

        }.bind(this));

        myProgress.addEventListener('click', function(event) {
            this.fadedout = !this.fadedout;

        }.bind(this));

  }

  startLoading(){
      var i = 0;
        if (i == 0) {
            i = 1;
            var width = 0;
            var id = setInterval(frame, 10);

            function frame() {
              if (width >= 100) {
                clearInterval(id);
                i = 0;
              } else {
                width++;
                this.myBar.style.width = width + "%";
                this.myBar.innerHTML = width  + "%";
                myProgress.setAttribute("aria-valuenow", width);

              }
            }
          }
  }

  hide(){ 

      if (myProgress.style.opacity !== 0){
          myProgress.style.opacity = 0
      }
  }



}
  