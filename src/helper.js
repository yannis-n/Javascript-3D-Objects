export function rectCollisionDetection(rects, x, y) {
    var isCollision = false;
    for (var i = 0, len = rects.length; i < len; i++) {
        var left = rects[i].x, right = rects[i].x+rects[i].w;
        var top = rects[i].y, bottom = rects[i].y+rects[i].h;
        if (right >= x
            && left <= x
            && bottom >= y
            && top <= y) {
            isCollision = rects[i];
        }
    }
    return isCollision;
}

export function circleAndMouseCollissionDetection(x, y, radius, mouse) {
    return x-radius <= mouse.x && mouse.x <= x+radius && y-radius <= mouse.y  && mouse.y <= y+radius;
}

var PIXEL_RATIO = (function () {
    var ctx = document.getElementById("gameScreen").getContext("2d"),
    dpr = window.screen.availWidth / document.documentElement.clientWidth || 1,
    bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
  })();
  
  
export function createHiDPICanvas (w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.getElementById("gameScreen");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
  }

  export function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return {x:x, y:y}
}

export function createPolygon( x, y, radius, sides, rotateAngle) {
  if (sides < 3) return;
  var a = (Math.PI * 2)/sides;

  let pathX = 0
  let pathY = - radius
  // When registering the path the rotation must be taken into account
  let path = [[Math.abs(x + pathX * Math.cos(rotateAngle) - pathY * Math.sin(rotateAngle)) , Math.abs(y + pathX * Math.sin(rotateAngle) + pathY * Math.cos(rotateAngle))]]
  for (var i = 1; i < sides; i++) {
    pathX = - radius*Math.sin(a*i)
    pathY = - radius*Math.cos(a*i)
    
    path.push([Math.abs(x + pathX * Math.cos(rotateAngle) - pathY * Math.sin(rotateAngle) ), Math.abs(y + pathX * Math.sin(rotateAngle) + pathY * Math.cos(rotateAngle))])
  }
  // return polygon path coordinates
  return path;
}

export function drawPolygon(ctx, x, y, radius, sides, rotateAngle) {
  if (sides < 3) return;
  var a = (Math.PI * 2)/sides;
  ctx.beginPath();
  ctx.moveTo(0, -radius);
  // When registering the path the rotation must be taken into account
  for (var i = 1; i < sides; i++) {
    ctx.lineTo(-radius*Math.sin(a*i), -radius*Math.cos(a*i));
  }
  ctx.closePath();
  // return polygon path coordinates
}

export function pointInsidePolygon(point, vs, radius) {
  // ray-casting algorithm based on
  
  var x = point[0], y = point[1];
  
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    let d = 0;
      if (radius){
        d = radius*5
      }
      var xi = vs[i][0] -d, yi = vs[i][1]-d;
      var xj = vs[j][0] +d, yj = vs[j][1]+d;

      var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  
  return inside;
};

export function circleInsidePolygon(point, vs, radius) {
  // ray-casting algorithm based on
  radius = radius
  var x = point[0], y = point[1];
  
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];
      
      var intersect = ((yi > y + radius) != (yj > y + radius))
      && ((yi > y - radius) != (yj > y - radius))
      && (x - radius < (xj - xi) * (y - radius - yi) / (yj - yi) + xi)
      && (x - radius < (xj - xi) * (y + radius - yi) / (yj - yi) + xi)
      && (x + radius < (xj - xi) * (y + radius - yi) / (yj - yi) + xi)
      && (x + radius < (xj - xi) * (y - radius - yi) / (yj - yi) + xi)
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  
  return inside;
};

export function pointsColliding(newPoints,points){
  let a;
  let x;
  let y;
  let colliding = false;
  if (points.length > 0){
    for (const point of points) {
      if ((newPoints[0] == point.position.x) && (newPoints[1] == point.position.y)){
        colliding = true;
      }
    }
  }

  return colliding
}