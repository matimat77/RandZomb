function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function getDistance(pX1, pY1, pX2, PY2) {
  // Option 1 :
  //   let dx = pX1 - pX2;
  //   let dy = pY1 - pY2;
  //   return Math.sqrt(dx * dx + dy * dy);

  // Option 2 :
  //   return Math.sqrt(Math.pow(pX1 - pX2, 2) + Math.pow(pY1 - pY2, 2));

  // Option 3 : Math.hypot to calculate hypotenuse
  return Math.hypot(pX2 - pX1, PY2 - pY1);
}

function getAngle(pX1, pY1, pX2, PY2) {
  return Math.atan2(PY2 - pY1, pX2 - pX1);
}

function isRectCollideRect(
  pR1x,
  pR1y,
  pR1width,
  pR1height,
  pR2x,
  pR2y,
  pR2width,
  pR2height
) {
  return (
    pR1x + pR1width > pR2x &&
    pR1x < pR2x + pR2width &&
    pR1y + pR1height > pR2y &&
    pR1y < pR2y + pR2height
  );
}

function isCircleCollideRect(pCx, pCy, pCradius, pRx, pRy, pRwidth, pRheight) {
  var distX = Math.abs(pCx - pRx - pRwidth / 2);
  var distY = Math.abs(pCy - pRy - pRheight / 2);

  if (distX > pRwidth / 2 + pCradius) {
    return false;
  }
  if (distY > pRheight / 2 + pCradius) {
    return false;
  }

  if (distX <= pRwidth / 2) {
    return true;
  }
  if (distY <= pRheight / 2) {
    return true;
  }

  var dx = distX - pRwidth / 2;
  var dy = distY - pRheight / 2;
  return dx * dx + dy * dy <= pCradius * pCradius;
}
