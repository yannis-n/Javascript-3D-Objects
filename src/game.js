import InputHandler from "../src/input.js";
import { drawBoard } from "./boardBuilder.js";
import { updateGameStateForHelperScreens, createAssessementSymbols, createMenu, createLoadingBar, createMenuBar, createStartingGameCountDown } from "../src/helperScreens/helperScreens.js";
import { createHiDPICanvas, circleAndMouseCollissionDetection, shuffle, pointInsidePolygon, array_compare  } from "../src/helper.js";
import * as THREE from '../node_modules/three/build/three.module.js';
import { ThreeDObjectLevels  } from "../src/levels.js";


const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  LEVELDONE: 5,
  LOADING: 6,
  ASSESSINGLEVEL: 7,
  REST: 8,
  STARTINGAME: 9
};

const unitMeasurement = {
  unitWidth : 50,
  unitHeight : 50
};


const sequences = [
  ['1', '4', '23', '45', '78', '92'],
  ['1', '4', '23', '45', '78', '92', '111', '122', '123', '124', '125', '167' ],
  ['2', '7', '8', '23', '54', '67', '87', '88', '95', '122', '155', '197' ],
  ['1', '4', '23', '45', '78', '92', '111', '122', '123', '124', '132', '167' ],
  ['1', '4', '23', '45', '78', '92', '111', '122', '123', '124', '167', '167' ],
  ['1', '4', '23', '45', '78', '92', '111', '122', '123', '124', '167', '167' ],
  ['1', '4', '23', '45', '78', '92', '111', '122', '123', '124', '125', '167' ],
  ['1', '4', '23', '45', '78', '92', '111', '122', '123', '124', '125', '167' ],
  ['1', '4', '23', '45', '78', '92', '111', '122', '123', '124', '125', '167' ],
  ['1', '4', '23', '45', '78', '92', '111', '122', '123', '124', '125', '167' ],
]



export default class ThreeDObjects {
  constructor(gameWidth, gameHeight, difficulty, canvas, scene, camera, renderer) {
    this.scene = scene
    this.camera = camera
    this.renderer = renderer

    this.counter = 0;
    this.canvas = canvas
    this.rect = canvas.getBoundingClientRect()
    this.wrongAnswer = false

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    //padding between the units
    this.gap = 10
    // here making sure that the sequences are in the right order
    this.ThreeDObjectLevels = ThreeDObjectLevels
    // set the current sequence to the first one
    this.updateCurrentSequence(0)
    // This is where the candidate sequence answer will be stored

    this.updateUnitMeasurement()
    this.dx = 0
    this.mouse = {
      x:0,
      y:0,
    }

    this.clicked = {
      x:0,
      y:0,
    }
    
    this.difficulty = difficulty

    this.centeredXMod = 0;

    this.menu = createMenu(this, gameWidth, gameHeight)
    

    this.elements = drawBoard(this)
    this.InputHandler = new InputHandler(this, GAMESTATE);
    this.GAMESTATE = GAMESTATE
    this.updateGameState(GAMESTATE.LOADING)
    this.InputHandler.init()

    this.unitErrors = {}
    this.step = 11
    this.clickedUnits = []

    // this is where all the helper screens will be loaled #helperScreensCode
    this.tutorial = 'test'
    this.undoButtonFuncionality = false;
    this.soundOn = true;
    this.correctAndWrongAssessement = true;

    
    this.helperScreens = {
      menu : createMenu(this, gameWidth, gameHeight),
      assessementSymbols: createAssessementSymbols(this),    
      loadingBar : createLoadingBar(this),
      menuBar : createMenuBar(this),
      startingGameCountDown: createStartingGameCountDown(this),
    }
  }

  updateGameSize(GAME_WIDTH, GAME_HEIGHT){
    this.gameWidth = GAME_WIDTH;
    this.gameHeight = GAME_HEIGHT;
    this.updateUnitMeasurement();
    // this.clearThree(this.scene)

    this.elements = drawBoard(this, this.elements)
    this.rect = this.canvas.getBoundingClientRect()

  }

  render(){
    this.renderer.render(this.scene, this.camera);

  }

  refreshAnswers(){
    this.clickedUnits = []
  }
  
  undoAnswers(){
    this.clickedUnits = []
  }

  levelCompleted(){
    return this.clickedUnits.length > 0
  }

  // here we update the current sequence and also shuffled it
  updateCurrentSequence(i){
    this.currentSequence = i
    this.currentBoard = this.ThreeDObjectLevels[i]
    this.currentBoard['choices'] = shuffle(this.currentBoard['choices'])
    this.currentDimensions = this.currentBoard['choices'].length

    // determine the necessary rotation for the polygons surrounding the main one
    let step = this.currentDimensions % 2;
    this.rotationStep =  Math.PI / this.currentDimensions
  }

  updateUnitMeasurement(){
    // When fixing the unit dimensions always take into account the padding and the unit gap
    // this.unitMeasurement = {
    //   unitWidth : (this.gameWidth - this.gap * (size-1)) / (size),
    //   unitHeight : (this.gameWidth - this.gap * (size-1)) / (size)
    // };

    

      if (this.gameWidth < 400){
        this.unitMeasurement = {
          radius : 60,

        };
      } else if (this.gameWidth > 700){
        this.unitMeasurement = {
          radius : 80,

        };
      }else{
        this.unitMeasurement = {
          radius : this.gameWidth / 8,
        };

      }
  }

  start() {
  }

  // That is used to move a level out of frame. You have to move explicitly all the seperable units
  // Onve every move I check whether both the units around have been moved and the centered object.
  moveLevelOutsideFrame(){
    let unitsAreOutsideTheCanvas = true;
    [...this.elements['units']].forEach((object) => {
        object.changeXCenter(this.dx)
        if (object.position.x + this.unitMeasurement.radius > this.rect.left){
          unitsAreOutsideTheCanvas = false;
        }
      });
      this.elements['centeredSum'].changeXCenter(this.dx)
      if (this.elements['centeredSum'].position.x + this.unitMeasurement.radius > this.rect.left){
        unitsAreOutsideTheCanvas = false;
      }
      return unitsAreOutsideTheCanvas  
  }

  // That is used to move a level inside the frame. You have to move explicitly all the seperable units
  moveLevelInsideFrame(){
    [...this.elements['units']].forEach((object) => {
      object.changeXCenter(-this.dx);
      
    });
    this.elements['centeredSum'].changeXCenter(-this.dx);

  }

  // For now this is where the level assessement happens.
  // It will probably become more complicared in the future
  correctAssessement(){
    return array_compare(this.currentBoard['sum'],this.clickedUnits)
  }

  update(deltaTime) {
        

    if (this.gamestate === GAMESTATE.LEVELDONE){

      this.dx = - 2 * this.rect.right / this.step;
      if (this.moveLevelOutsideFrame()){
        this.centeredXMod = 2 * this.rect.right;
        this.dx = this.centeredXMod / this.step;
        this.updateGameState(GAMESTATE.NEWLEVEL)
        this.updateCurrentSequence(this.currentSequence + 1)
        
        this.clearThree(this.scene)
        
        // this takes care of the coloring of the selected answer
        this.wrongAnswer = false

        this.elements = drawBoard(this)
      }
    }

    if (this.gamestate === GAMESTATE.NEWLEVEL){
      if (Math.floor(this.centeredXMod) <= 0 ){
        this.dx = 0
        this.centeredXMod = 0
        this.updateGameState(GAMESTATE.RUNNING)

      }else{
        this.moveLevelInsideFrame()
      }
      this.centeredXMod = this.centeredXMod - this.dx;     
    }

    updateGameStateForHelperScreens(this, GAMESTATE)

  }
  
  clearThree(obj){

    while(obj.children.length > 0){ 
      this.clearThree(obj.children[0])
      obj.remove(obj.children[0]);
    }
    if(obj.geometry) obj.geometry.dispose()
  
    if(obj.material){ 
      //in case of map, bumpMap, normalMap, envMap ...
      Object.keys(obj.material).forEach(prop => {
        if(!obj.material[prop])
          return         
        if(obj.material[prop] !== null && typeof obj.material[prop].dispose === 'function')                                  
          obj.material[prop].dispose()                                                        
      })
      obj.material.dispose()
    }

    this.scene = new THREE.Scene();  


    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
  
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(10, 20, 850);
    this.scene.add(dirLight);
  }   

  draw(ctx) {
    if (this.gamestate === GAMESTATE.RUNNING || this.gamestate === GAMESTATE.REST || this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.LEVELDONE || this.gamestate === GAMESTATE.NEWLEVEL || this.gamestate === GAMESTATE.ASSESSINGLEVEL) {
      this.elements['centeredSum'].draw(ctx);
    [...this.elements['units']].forEach((object) => {
        object.draw(ctx)
      });
    }
  }

  renderIsHidden(){
    return this.renderer.domElement.style.display == 'none';
  }

  updateGameState(state){
    this.gamestate = state;
  }

  checkPlayButtonClick(clientX, clientY){
    if (circleAndMouseCollissionDetection(this.gameWidth/2, this.gameHeight/2, this.menu.buttonRadius, this.mouse)){
      this.updateGameState(GAMESTATE.RUNNING)
    }
  }

  handleUnitClick(clientX, clientY){
    this.clicked = {
      x:clientX,
      y:clientY
    };
    
    // this way it will never check the middle unit
    [...this.elements['units']].forEach((object) => {
      // find the Grid Unit that was actually clicked
      if (pointInsidePolygon([this.clicked.x, this.clicked.y],object.path)){
        object.clicked = true;
        this.clickedUnits = object.geometry
      }
    });
  }


  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
