import Unit from "./unit.js";
import CenteredSum from "./centeredSum.js";


export function drawBoard(game){
    let size = game.currentDimensions


    let currentSequence = game.currentSequence
    let currentBoard = game.currentBoard
    let units = {};
    // Position The Grid in the Middle of the Game
    let centeredX = (game.gameWidth)/2;
    if (game.centeredXMod > 0){
        centeredX += game.centeredXMod
    }

    let centeredY = (game.gameHeight)/2;
    let i = 0
    let position = {
        x: centeredX,
        y: centeredY 
    };
    units['centeredSum'] = new Unit(game, currentBoard['sum'], position, game.unitMeasurement, game.rotationStep, true);
    units['units'] = [];

    let startingX;
    let startingY;

    let trianglesRadius = 2 * units['centeredSum'].apothem + 5;
        startingX = 0
        startingY = trianglesRadius;
    let rotation = units['centeredSum'].outerAngle;
    currentBoard['choices'].forEach((item, rowIndex) => {
            let position = {
                x: centeredX + startingX ,
                y: centeredY + startingY
            };
            units['units'].push(new Unit(game, item ,position, game.unitMeasurement, game.rotationStep, false))
            startingX = trianglesRadius*Math.sin(rotation*(rowIndex+ 1))
            startingY = trianglesRadius*Math.cos(rotation*(rowIndex+ 1))


           
    })
      return units
}