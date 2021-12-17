import Game from "../src/game.js";
import { createHiDPICanvas, rectCollisionDetection } from "../src/helper.js";
import * as THREE from '../node_modules/three/build/three.module.js';

"use strict";

window.onload = function (){
  let canvas = document.getElementById("gameScreen");
  var rect = canvas.getBoundingClientRect();
  canvas = createHiDPICanvas(rect.width, rect.height);
  let ctx = canvas.getContext('2d');
  
  // let ctx = setupCanvas(canvas);
  
  const GAME_WIDTH = rect.width;
  const GAME_HEIGHT = rect.height;
  const difficulty = 1;


  var scene = new THREE.Scene();  

  var camera = new THREE.OrthographicCamera(
    500 / -2, // left
    500 / 2, // right
    500 / 2, // top
    500 / -2, // bottom
    1, // near plane
    1000 // far plane
  );
  
  camera.position.set(0, 0, 850);
  camera.lookAt(0, 0, 0);

    // Set up lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
  
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(10, 20, 850);
    scene.add(dirLight);

  const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
  renderer.setSize( GAME_WIDTH, GAME_HEIGHT );
  document.getElementsByClassName('screen-container')[0].appendChild( renderer.domElement );
  renderer.domElement.id = 'ThreedObjectsCanvas';

 

  let game = new Game(GAME_WIDTH, GAME_HEIGHT, difficulty, canvas, scene, camera, renderer);
  
  let lastTime = 0;

  function gameLoop(timestamp) {
      let deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      game.update(deltaTime)
      game.draw(ctx)
      renderer.render(scene, camera);
      // mesh.position.set(200, 200, 0);
      // mesh.updateMatrix()
      requestAnimationFrame(gameLoop);
    }
    
    requestAnimationFrame(gameLoop);

      // ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      // game.draw(ctx)
    
    
}

