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
  
  let GAME_WIDTH = rect.width;
  let GAME_HEIGHT = rect.height;
  let difficulty = 1;


  var scene = new THREE.Scene();  

  var camera = new THREE.OrthographicCamera(
    GAME_WIDTH / -2, // left
    GAME_WIDTH / 2, // right
    GAME_HEIGHT / 2, // top
    GAME_HEIGHT / -2, // bottom
    1, // near plane
    2000 // far plane
  );
  
  camera.position.set(0, 0, GAME_WIDTH* 2);
  camera.lookAt(0, 0, 0);

    // Set up lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
  
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(10, 20, 850);
    scene.add(dirLight);

  const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
  renderer.setSize( GAME_WIDTH, GAME_HEIGHT );
  renderer.domElement.style.display = 'none';
  document.getElementById('screen-container').appendChild( renderer.domElement );
  renderer.domElement.id = 'ThreedObjectsCanvas';

 

  let game = new Game(GAME_WIDTH, GAME_HEIGHT, difficulty, canvas, scene, camera, renderer);
  
  let lastTime = 0;

  function gameLoop(timestamp) {
      let deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      game.update(deltaTime)
      game.draw(ctx)
      game.render()
      // mesh.position.set(200, 200, 0);
      // mesh.updateMatrix()
      requestAnimationFrame(gameLoop);
    }
    
    requestAnimationFrame(gameLoop);

      // ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      // game.draw(ctx)
    
    
      window.addEventListener('resize', function(){
      let screenContainer = document.getElementById("screen-container");
      canvas = createHiDPICanvas(screenContainer.offsetWidth, screenContainer.offsetHeight);
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx = canvas.getContext('2d');

      GAME_WIDTH = screenContainer.offsetWidth;
      GAME_HEIGHT = screenContainer.offsetHeight;

      game.updateGameSize(GAME_WIDTH, GAME_HEIGHT)

      // camera.position.set(0, 0, GAME_WIDTH* 2);

      camera.left = GAME_WIDTH / -2
      camera.right = GAME_WIDTH / 2
      camera.top = GAME_HEIGHT / 2
      camera.bottom = GAME_HEIGHT / -2
      camera.updateProjectionMatrix();
      renderer.setSize( GAME_WIDTH, GAME_HEIGHT );

    });
    
}

