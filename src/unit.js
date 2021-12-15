import { circleAndMouseCollissionDetection, createPolygon, pointInsidePolygon, pointsColliding, drawPolygon, circleInsidePolygon } from "../src/helper.js";
import Point from "./point.js";
import * as THREE from '../node_modules/three/build/three.module.js';

export default class Unit {
  constructor(game, geometry,position, unitMeasurement, rotation, sumUnit = false) {
    this.game = game;
    this.geometry = geometry;
    this.pointsRadius = 5;
    this.position = position;
    this.clicked = false;

    this.radius = game.unitMeasurement.radius
    this.cubeSize = game.unitMeasurement.radius / 4
    this.sides = game.currentDimensions;
    // this.sides = game.currentDimensions;
    if (sumUnit){
      if (this.sides % 2 != 0){
        this.rotateAngle =  0;
  
      }else{
        this.rotateAngle =  rotation;
      }
    }else{
      this.rotateAngle =  rotation;

    }
    this.apothem = this.radius * Math.cos(Math.PI/this.sides)
    this.sideWidth = 2 * this.apothem * Math.tan(Math.PI/this.sides)
    this.outerAngle = 2 * Math.PI / this.sides

    let pathX = this.position.x
    if (game.centeredXMod > 0){
      pathX -= game.centeredXMod
    }

    // this is where the polygon's point are saved should we need to test the unit against some positional statement
    this.path = createPolygon(pathX, this.position.y, this.radius, this.sides , this.rotateAngle)
    this.polygonHeight = Math.abs(this.path[0][1] - this.path[this.sides - 1][1])

    // Assign the designated Points for the Unit
    this.pointPadding = 1


      
  this.cubes = new THREE.Group();


      for (let i = 0; i < this.geometry.length; i++) {
        for (let y = 0; y < this.geometry[i].length; y++) {
          if (this.geometry[i][y] === '1'){
            let mesh = new THREE.Mesh( 
              new THREE.BoxGeometry( this.cubeSize, this.cubeSize, this.cubeSize, 1, 1, 1 ), 
              new THREE.MeshLambertMaterial({color : 0xff0000}) 
            );

              
            // this.cubes.rotation.y = Math.PI / 3;
            // mesh.rotation.set(this.position.x - game.gameWidth / 2 + this.cubeSize * (y - 1), this.position.y - game.gameHeight / 2 + this.cubeSize * (i - 1), 0);
                       
      
            mesh.position.set(this.cubeSize * (y - 1), this.cubeSize * (i - 1), 0);



            this.cubes.add( mesh );
          }
        }
        
      }
      let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      this.cubes.translateX (this.position.x - game.gameWidth / 2);
      this.cubes.translateY (this.position.y - game.gameHeight / 2);
      // this.cubes.rotation.set(this.position.x - game.gameWidth / 2 , this.position.y - game.gameHeight / 2, 0);
      this.cubes.rotation.y = plusOrMinus * Math.random() * 1;
      this.cubes.rotation.z = plusOrMinus *  Math.random() * 1;  
      this.cubes.rotation.x = plusOrMinus *  Math.random() * 1;  
      this.game.scene.add( this.cubes );
      console.log(this.cubes)

      // this.mesh.matrixAutoUpdate  = false;
  // console.log(this.mesh)

  }


  // draw the unit circle with different border widths
  changeXCenter(dx){
    this.position.x = this.position.x + dx;
  }

  draw(ctx) {
    ctx.save();                  // Save the default state
    ctx.translate(this.position.x,this.position.y);
    ctx.rotate(this.rotateAngle);

    const row = this.row;
    let currentValue =this.game.currentBoard['choices'] 

    let pathRadius = this.pathRadius   
    // draw the unit perimeter
    drawPolygon(ctx, this.position.x, this.position.y, this.radius, this.sides , this.rotateAngle)
    if (this.clicked){
      if (!this.game.wrongAnswer){
        ctx.fillStyle = "rgba(35,224,27,1)";
      }else{
        ctx.fillStyle = "rgba(224,26,20,1)";

      }

    }else{
      ctx.fillStyle = "rgba(0,114,227,1)";

    }
    ctx.fill()
    ctx.closePath();
    
    ctx.restore();               // Restore original state

  }
}
