import { circleAndMouseCollissionDetection } from "../src/helper.js";

export default class Menu {
    constructor(game, gameWidth, gameHeight) {
  
      this.game = game;
  
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.path = [
        this.gameWidth/2.5, this.gameHeight/2.5,
        this.gameWidth/2.5, this.gameHeight-this.gameHeight/2.5,
        this.gameWidth-this.gameWidth/2.5, this.gameHeight/2
      ]
      this.buttonRadius = this.gameWidth/6
    }
  
  
    // draw the unit rect with different border widths
    draw(ctx) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
  
        // add hover effect
        if (circleAndMouseCollissionDetection(this.gameWidth/2, this.gameHeight/2, this.buttonRadius, this.game.mouse)){
            ctx.strokeStyle = 'rgba(256,256,256,0.5)';
            ctx.fillStyle = "rgba(256,256,256,0.5)";
        }else{
            ctx.strokeStyle = 'rgba(256,256,256,1)';
            ctx.fillStyle = "rgba(256,256,256,1)";
        }
        ctx.beginPath();
        ctx.moveTo(this.gameWidth/2.2, this.gameHeight/2.3);
        
        ctx.lineTo(this.gameWidth/2.2, this.gameHeight-this.gameHeight/2.3);
  
        ctx.lineTo(this.gameWidth-this.gameWidth/2.3, this.gameHeight/2);
        
        ctx.lineTo(this.gameWidth/2.2, this.gameHeight/2.3);
  
        ctx.stroke();
  
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth =2;
        ctx.arc(this.gameWidth/2, this.gameHeight/2, this.buttonRadius, 0, 2 * Math.PI);
        ctx.stroke();
    }
  }
  