//Sehajdeep Singh
function setup() {
  console.clear()

  angleMode(DEGREES)

  blockSide2D = 128 // side of block in pixels
  blocksHorizontal = 9 // number of blocks in the X axis
  blocksVertical = 9 // number of blocks in the Y axis
  spawni = 4.20 // spawn block i
  spawnj = 4.20 // spawn block j

  // map goes here
  mapLayout = []
  mapManipulation = true
  if (mapManipulation==true) {
    for (let i = 0; i<blocksHorizontal*blocksVertical; i++) {
      mapLayout[i] = 0
    }
  }

  playerX = spawni * blockSide2D
  playerY = spawnj * blockSide2D

  playerSize = 10
  playerSpeed = 1

  playerX1 = playerX - playerSize/2
  playerY1 = playerY - playerSize/2
  playerX2 = playerX + playerSize/2
  playerY2 = playerY + playerSize/2
  lookAngle = 69.420
  lookLineLength = 40
  lookSpeed = 5 // degrees per frame
  lookX = playerX + sin(lookAngle)*lookLineLength
  lookY = playerY - cos(lookAngle)*lookLineLength
  jumpBool=false
  jumpOffset = 0

  canvas2DX = blocksHorizontal * blockSide2D
  canvas2DY = blocksVertical * blockSide2D
  createCanvas(canvas2DX, canvas2DY)
  frameRate(60)

  fill(0)
  background(0)

  lineCornersX = []
  lineCornersY = []

  solidBlocksi = []
  solidBlocksj = []
  numSolidBlocks = 0
  x1 = []
  y1 = []
  x2 = []
  y2 = []

  includes = false

  numRays = 110 //atleast 2
  FOV = 110
  renderView="2D"

  minDist = 5
}

function keyPressed() {
  if (keyCode=="86") {
    if (renderView=="2D") {renderView="3D"} else {renderView="2D"}
  }
  if (keyCode==SHIFT) {
    playerSpeed=playerSpeed*2
  }
  if (keyCode=="32") {
    jumpBool=true
  }
}
function keyReleased() {
  if (keyCode==SHIFT) {
    playerSpeed=playerSpeed/2
  }
}

function draw() {
  if (playerX<minDist) {playerX=minDist}
  if (playerX>blocksHorizontal*blockSide2D-minDist) {playerX=blocksHorizontal*blockSide2D-minDist}
  if (playerY<minDist) {playerY=minDist}
  if (playerY>blocksVertical*blockSide2D-minDist) {playerY=blocksVertical*blockSide2D-minDist}
  // console.log(playerX, playerY)
  i = int(playerX/blockSide2D)
  j = int(playerY/blockSide2D)
  // console.log(i, j)

  if (keyIsDown(UP_ARROW)) {
    playerCollisionCheck()
    checkMovePrivelege()
    tempPlayerX = playerX
    tempPlayerY = playerY
    playerX = playerX + ((lookX - playerX))/20*playerSpeed
    playerY = playerY + ((lookY - playerY))/20*playerSpeed
    if (mapLayout[int(playerX/blockSide2D+(int(playerY/blockSide2D)*blocksHorizontal))]==1 || move==false) {
      playerY = tempPlayerY
      playerX = tempPlayerX
      }
    if (playerX<minDist) {playerX=minDist}
    if (playerX>blocksHorizontal*blockSide2D-minDist) {playerX=blocksHorizontal*blockSide2D-minDist}
    if (playerY<minDist) {playerY=minDist}
    if (playerY>blocksVertical*blockSide2D-minDist) {playerY=blocksVertical*blockSide2D-minDist}
    playerX1 = playerX - playerSize/2
    playerY1 = playerY - playerSize/2
    playerX2 = playerX + playerSize/2
    playerY2 = playerY + playerSize/2
    lookX = playerX + sin(lookAngle)*lookLineLength
    lookY = playerY - cos(lookAngle)*lookLineLength
  }
  if (keyIsDown(LEFT_ARROW)) {
    lookAngle=lookAngle-lookSpeed
    if (lookAngle<0) {
      lookAngle=360+lookAngle
    }
    lookX = playerX + sin(lookAngle)*lookLineLength
    lookY = playerY - cos(lookAngle)*lookLineLength
    // console.log(lookAngle)
  }
  if (keyIsDown(RIGHT_ARROW)) {
    lookAngle=lookAngle+lookSpeed
    if (lookAngle>360) {
      lookAngle=lookAngle-360
    }
    lookX = playerX + sin(lookAngle)*lookLineLength
    lookY = playerY - cos(lookAngle)*lookLineLength
    // console.log(lookAngle)
  }


  if (renderView=="2D") {
    createCanvas(canvas2DX, canvas2DY)
    frameRate(60)
    background(255)
    stroke(0)
    for (let i = 0; i<blocksHorizontal+2; i++) {
      line(i*blockSide2D, 0, i*blockSide2D, canvas2DY)
    }
    for (let i = 0; i<blocksVertical+2; i++) {
      line(0, i*blockSide2D, canvas2DX, i*blockSide2D)
    }
  
    fill(0)
    if (x1.length > 0 ) {
      for (let i = 0; i<x1.length; i++) {
        quad(x1[i], y1[i], x2[i], y1[i], x2[i], y2[i], x1[i], y2[i])
        // line(x1[i], y1[i], x2[i], y2[i])
      }
    }
    fill(230)
    circle(playerX, playerY, playerSize+5)
    fill(180)
    circle(playerX, playerY, playerSize)
    strokeWeight(1)
    stroke(255, 0, 0)
  }

  jump()
  
  if (renderView=="3D") {
    createCanvas(windowWidth, windowHeight)
    frameRate(60)
    fill(150, 75, 0)
    quad(0, windowHeight/2-jumpOffset, windowWidth, windowHeight/2-jumpOffset, windowWidth, windowHeight, 0, windowHeight)
    fill(135, 206, 235)
    quad(0, windowHeight/2-jumpOffset, windowWidth, windowHeight/2-jumpOffset, windowWidth, 0, 0, 0)
  }

  rayCast2D(numRays, FOV)
  
  if (renderView=="2D") {
    stroke(0)
    strokeWeight(4)
    line(playerX, playerY, lookX, lookY)
  }
  // console.clear()
  strokeWeight(4)
  stroke(0)
  fill(255)
  textSize(30)
  text("Press V to change view(2D/3D), click on blocks in 2D view to toggle boxes", 5, 30)
  if (renderView=="2D") {text("Use arrow keys for movement, hold shift key to sprint", 5, canvas2DY-10)}
  if (renderView=="3D") {text("Use arrow keys for movement, hold shift key to sprint, press spacebar to jump", 5, canvas2DY-10)}
  // console.clear()
  // console.log(frameRate())
}

function mousePressed() {
  if (renderView=="2D" && mouseX>=0 && mouseX<=canvas2DX && mouseY>=0 && mouseY<=canvas2DY) {
  i = int(playerX/blockSide2D)
  j = int(playerY/blockSide2D)
  mousei = int(mouseX/blockSide2D)
  mousej = int(mouseY/blockSide2D)
  X1 = mousei*blockSide2D
  Y1 = mousej*blockSide2D
  X2 = X1 + blockSide2D
  Y2 = Y1 + blockSide2D
  includes = false
  if (x1.includes(X1) && y1.includes(Y1) && x2.includes(X2) && y2.includes(Y2)) {
    includes = false
    for (let i = 0; i<numSolidBlocks; i++) {
      if (X1 == x1[i] && Y1 == y1[i] && X2 == x2[i] && Y2 == y2[i]) {
        includes = true
        spliceBlockXY(i)
      }
    }
    // console.log(includes)
    if (includes == false) {
      if (mousei!=i || mousej!=j) {
    pushBlockXY(X1, Y1, X2, Y2)
    }
  }
  } else {
    if (mousei!=i || mousej!=j) {
      pushBlockXY(X1, Y1, X2, Y2)
    }
  }
} 
}

function pushBlockXY(X1, Y1, X2, Y2) {
  if (mapManipulation==true) {
    x1.push(X1)
    y1.push(Y1)
    x2.push(X2)
    y2.push(Y2)
    mapLayout[mousei+(mousej*blocksHorizontal)] = 1
    //console.log(mapLayout)
    numSolidBlocks++
    //console.log(x1, y1, x2, y2)
  }
}

function spliceBlockXY(inclusionIndex) {
  if (mapManipulation==true) {
    x1.splice(inclusionIndex, 1)
    y1.splice(inclusionIndex, 1)
    x2.splice(inclusionIndex, 1)
    y2.splice(inclusionIndex, 1)
    mapLayout[mousei+(mousej*blocksHorizontal)] = 0
    //console.log(mapLayout)
    numSolidBlocks--
    //console.log(x1, y1, x2, y2)
  }
}

function printMap() {
  string="["
  for (let i = 0; i<mapLayout.length; i++) {
    tempNum = mapLayout[i]
    tempString = tempNum.toString()
    if (i<mapLayout.length-1) {tempString+=", "}
    string+=tempString
  }
  string+="]"
  console.log(string)
}