import { circleAndMouseCollissionDetection, createPolygon, pointInsidePolygon } from "../src/helper.js";

export default class CenteredSum {
  constructor(game, position, unitMeasurement, rotation) {

    this.game = game;

    this.position = position;

    this.radius = game.unitMeasurement.radius
    this.sides = game.currentDimensions;
    // this.sides = game.currentDimensions;
    if (this.sides % 2 != 0){
      this.rotateAngle =  0;

    }else{
      this.rotateAngle =  rotation;
    }

    // this.rotateAngle =  Math.PI;
    this.apothem = this.radius * Math.cos(Math.PI/this.sides)
    this.sideWidth = 2 * this.apothem * Math.tan(Math.PI/this.sides)
    this.outerAngle = 2 * Math.PI / this.sides
  }

  // draw the unit circle with different border widths
  changeXCenter(dx){
    this.position.x = this.position.x + dx;
  }

  draw(ctx) {
    ctx.save();                  // Save the default state
    ctx.translate(this.position.x,this.position.y);

    const row = this.row;
    let currentValue =this.game.currentBoard['choices'] 

    let pathRadius = this.pathRadius   
    // draw the unit perimeter
        
        this.path = createPolygon(ctx, this.position.x, this.position.y, this.radius, this.sides , this.rotateAngle)

        if (pointInsidePolygon([this.game.clicked.x, this.game.clicked.y],this.path)){
          ctx.fillStyle = "rgba(255,114,2,1)";

        }else{
          ctx.fillStyle = "rgba(0,114,227,1)";

        }
        ctx.fill()

    // add a number if it exists

    


    

    ctx.restore();               // Restore original state

    // ctx.beginPath();

  
  }
}
