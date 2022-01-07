import { createPolygon, drawPolygon } from "../src/helper.js";
import * as THREE from '../node_modules/three/build/three.module.js';

export default class Unit {
  constructor(game, geometry,position, unitMeasurement, rotation, sumUnit = false) {
    this.game = game;
    this.geometry = geometry;
    this.position = position;
    this.clicked = false;

    this.radius = game.unitMeasurement.radius
    this.cubeSize = game.unitMeasurement.radius / 4
    // this is to keep in the initial box size in case of resizing the canvas
    this.initialCubeSize = game.unitMeasurement.radius / 4
    this.lastCubeScale = 1
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


      for (let z = 0; z < this.geometry.length; z++) {
        for (let i = 0; i < this.geometry[z].length; i++) {
          for (let y = 0; y < this.geometry[z][i].length; y++) {
            if (this.geometry[z][i][y] === '1'){
              let mesh = new THREE.Mesh( 
                new THREE.BoxGeometry( this.cubeSize, this.cubeSize, this.cubeSize, 1, 1, 1 ), 
                new THREE.MeshLambertMaterial({color : 0xff0000}) 
              );
  
              var geo = new THREE.EdgesGeometry( mesh.geometry );
              var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 1 } );
              var wireframe = new THREE.LineSegments( geo, mat );
              wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
              mesh.add( wireframe );
              
              // this.cubes.rotation.y = Math.PI / 3;
              // mesh.rotation.set(this.position.x - game.gameWidth / 2 + this.cubeSize * (y - 1), this.position.y - game.gameHeight / 2 + this.cubeSize * (i - 1), 0);
            
              mesh.position.set(this.cubeSize * (y - 1), this.cubeSize * (i - 1), this.cubeSize * (z - 1));
              
              this.cubes.add( mesh );
            }
          }
          
        }        
      }
      let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      // Should a new level be loaded make sure that the new shapes are correctly placed.
      // For some reason I have to invert the X position of the group to be positioned correctly.
        this.cubes.translateX (-this.position.x  + game.gameWidth / 2);

        
      this.cubes.translateY (this.position.y - game.gameHeight / 2);
      this.cubes.translateZ (this.geometry.length / 2);
      
      this.cubes.rotation.y = plusOrMinus * (0.1 + Math.random() * 1);
      this.cubes.rotation.z = plusOrMinus * (0.1 + Math.random() * 1);  
      this.cubes.rotation.x = plusOrMinus * (0.1 + Math.random() * 1);  
      // this.cubes.translateX (this.position.x - game.gameWidth / 2);
      // this.cubes.translateY (this.position.y - game.gameHeight / 2);
      
      const box3 = new THREE.Box3().setFromObject(this.cubes);
      const vector = new THREE.Vector3();
      box3.getCenter(vector);
      this.cubes.position.set(-vector.x, -vector.y, -vector.z);
      
      


      // this.cubes.position.set(this.position.x - game.gameWidth / 2, this.position.y - game.gameHeight / 2, 0);

      this.game.scene.add( this.cubes );

      // this.mesh.matrixAutoUpdate  = false;
  // console.log(this.mesh)

  }

  updateSize(position, unitMeasurement) {

    // Assign the designated Points for the Unit

    this.position = position;

    this.radius = unitMeasurement.radius



    let cubeScale = 1 / ((this.initialCubeSize / (unitMeasurement.radius / 4)) )
    this.cubeSize = unitMeasurement.radius / 4
    console.log('position')
    console.log('------')
    console.log('-------')

      this.cubes.position.x = -this.position.x + this.game.gameWidth / 2
      this.cubes.position.y = this.position.y - this.game.gameHeight / 2
      const box3 = new THREE.Box3().setFromObject(this.cubes);
      const vector = new THREE.Vector3();
      box3.getCenter(vector);
      this.cubes.position.set(-vector.x, -vector.y, -vector.z);
    


    this.cubes.scale.x = cubeScale; // SCALE
    this.cubes.scale.y = cubeScale; // SCALE
    this.cubes.scale.z = cubeScale; // SCALE
    
    this.lastCubeScale = (this.initialCubeSize / (unitMeasurement.radius / 4))
    this.apothem = this.radius * Math.cos(Math.PI/this.sides)
    this.sideWidth = 2 * this.apothem * Math.tan(Math.PI/this.sides)
    let pathX = this.position.x
    if (this.game.centeredXMod > 0){
      pathX -= this.game.centeredXMod
    }
        // this is where the polygon's point are saved should we need to test the unit against some positional statement
        this.path = createPolygon(pathX, this.position.y, this.radius, this.sides , this.rotateAngle)
        this.polygonHeight = Math.abs(this.path[0][1] - this.path[this.sides - 1][1])
        
        // Assign the designated Points for the Unit
        this.pointPadding = 1
      
  }

  // draw the unit circle with different border widths
  changeXCenter(dx){
    this.position.x = this.position.x + dx;
    this.cubes.position.x += dx;

    
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
