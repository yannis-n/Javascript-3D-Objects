import { circleAndMouseCollissionDetection, createPolygon, pointInsidePolygon } from "../src/helper.js";

export default class Point {
  constructor(game, unit, position) {

    this.game = game;

    this.position = position;    
    this.unit = unit
  }

  

  // draw the unit circle with different border widths
  changeXCenter(dx){
    this.position.x = this.position.x + dx;
  }

  draw(ctx) {
    ctx.beginPath() // begin drawing
    ctx.arc(this.position.x, this.position.y, this.unit.pointsRadius - this.unit.pointPadding, 0, 2 * Math.PI, false) // specify that it's an arc
    ctx.fillStyle = '#fff';

    ctx.fill() // fill it in
  
  }
}
