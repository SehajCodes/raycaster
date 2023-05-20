distX = null
distY = null
checkDirection = "up"
solidBlockUP = false
solidBlockRIGHT = false
solidBlockDOWN = false
solidBlockLEFT = false
moveUpPrivelege = true
moveLeftPrivelege = true
moveDownPrivelege = true
moveRightPrivelege = true
move = true
dist = null

function playerCollisionCheck() {
    iCheck = i
    jCheck = j
    for (let i = 0; i < 4; i++) {
        if (checkDirection == "up") {
            jCheck--
            if (mapLayout[iCheck+(jCheck*blocksHorizontal)] == 1) {
                // console.log("solidBlockUP", iCheck, jCheck)
                solidBlockUP = true
            } else if (mapLayout[iCheck+(jCheck*blocksHorizontal)] == 0) {
                // console.log("emptyBlockUP")
                solidBlockUP = false
            }
            checkDirection = "right"
            return
        }
        if (checkDirection == "right") {
            iCheck++
            if (mapLayout[iCheck+(jCheck*blocksHorizontal)] == 1) {
                // console.log("solidBlockRIGHT", iCheck, jCheck)
                solidBlockRIGHT = true
            } else if (mapLayout[iCheck+(jCheck*blocksHorizontal)] == 0) {
                // console.log("emptyBlockRIGHT")
                solidBlockRIGHT = false
            }
            checkDirection = "down"
            return
        }
        if (checkDirection == "down") {
            jCheck++
            if (mapLayout[iCheck+(jCheck*blocksHorizontal)] == 1) {
                // console.log("solidBlockDOWN", iCheck, jCheck)
                solidBlockDOWN = true
            } else if (mapLayout[iCheck+(jCheck*blocksHorizontal)] == 0) {
                // console.log("emptyBlockDOWN")
                solidBlockDOWN = false
            }
            checkDirection = "left"
            return
        }
        if (checkDirection == "left") {
            iCheck--
            if (mapLayout[iCheck+(jCheck*blocksHorizontal)] == 1) {
                // console.log("solidBlockLEFT", iCheck, jCheck)
                solidBlockLEFT = true
            } else if (mapLayout[iCheck+(jCheck*blocksHorizontal)] == 0) {
                // console.log("emptyBlockLEFT")
                solidBlockLEFT = false
            }
            checkDirection = "up"
            return
        }
    }
}

function distToAdjacentBlocks(x, y) {
    i = int(x/blockSide2D)
    j = int(y/blockSide2D)
    iCheck = i
    jCheck = j
    //up
    distUp = playerY - jCheck*blockSide2D
    //left
    distLeft = playerX - iCheck*blockSide2D
    //right
    iCheck++
    distRight = iCheck*blockSide2D - playerX
    //down
    jCheck++
    distDown = jCheck*blockSide2D - playerY
}

function checkMovePrivelege() {
    playerCollisionCheck()
    move=true
    distToAdjacentBlocks(playerX, playerY)
    moveUpPrivelege=true
    moveRightPrivelege=true
    moveDownPrivelege=true
    moveLeftPrivelege=true
    // console.log(minDist)
    if (solidBlockUP==true) {
        if (270<lookAngle || lookAngle<90) {if (distUp<minDist) {
            // console.log("man")
            moveUpPrivelege=false
        }} else {moveUpPrivelege=true}
    }
    if (solidBlockRIGHT==true) {
        if (0<lookAngle && lookAngle<180 && distRight<minDist) {
            moveRightPrivelege=false
        } else {moveRightPrivelege=true}
    }
    if (solidBlockDOWN==true) {
        if (90<lookAngle && lookAngle<270 && distDown<minDist) {
            moveDownPrivelege=false
        } else {moveDownPrivelege=true}
    }
    if (solidBlockLEFT==true) {
        if (180<lookAngle && lookAngle<360 && distLeft<minDist) {
            moveLeftPrivelege=false
        } else {moveLeftPrivelege=true}
    }
    if (moveUpPrivelege==false || moveRightPrivelege==false || moveDownPrivelege==false || moveLeftPrivelege==false) {move = false} else {move = true}
    // console.log(moveUpPrivelege, moveRightPrivelege, moveDownPrivelege, moveLeftPrivelege)
    // console.log(move)
}