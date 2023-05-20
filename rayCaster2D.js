rayX = null
rayY = null
distBox = null
tempRayX = null
tempRayY = null

function checkHorizontalLines(x, y, angle) {
    Hcollided = false
    if (Hcollided==false) {
    if (270<angle || angle<=90) { //looking up
        lookDirV = "up"
        XoffsetH = (tan(angle)*(y%blockSide2D))
        HrayX = x + XoffsetH
        HrayY = int(y/blockSide2D)*blockSide2D
        XoffsetPerBlockH = XoffsetH*(blockSide2D/(y%blockSide2D))
    }
    if ( 90<angle && angle<=270) { //looking down
        lookDirV = "down"
        XoffsetH = (tan(180-angle)*(blockSide2D-(y%blockSide2D)))
        HrayX = x + XoffsetH
        HrayY = int(y/blockSide2D)*blockSide2D + blockSide2D
        XoffsetPerBlockH = XoffsetH*(blockSide2D/(y%blockSide2D))
    }
    YoffsetH = HrayY - y
    YoffsetPerBlockH = YoffsetH*(blockSide2D/(x%blockSide2D))
    // console.log(Xoffset, XoffsetPerBlock)
    Hrayi = HrayX/blockSide2D
    Hrayj = HrayY/blockSide2D
    distH = sqrt((x-HrayX)**2+(y-HrayY)**2)
    // line(x, y, rayX, rayY)
    // console.log(rayX, rayY)
    }
}

function checkVerticalLines(x, y, angle) {
    Vcollided = false
    if (Vcollided==false) {
    if (180<angle && angle<=360 || angle ==0) { //looking left
        lookDirH = "left"
        YoffsetV = -1*(tan(angle-90))*(x%blockSide2D)
        VrayX = int(x/blockSide2D)*blockSide2D
        VrayY = y + YoffsetV
        YoffsetPerBlockV = YoffsetV*(blockSide2D/(y%blockSide2D))
    }
    if (  0<angle && angle<=180) { //looking right
        lookDirH = "right"
        YoffsetV = (tan(angle-90))*(blockSide2D-(x%blockSide2D))
        VrayX = int(x/blockSide2D)*blockSide2D + blockSide2D
        VrayY = y + YoffsetV
        YoffsetPerBlockV = YoffsetV*(blockSide2D/(x%blockSide2D))
    }
    XoffsetV = VrayX - x
    XoffsetPerBlockV = XoffsetV*(blockSide2D/(y%blockSide2D))
    // console.log(Yoffset, YoffsetPerBlock)
    Vrayi = VrayX/blockSide2D
    Vrayj = VrayY/blockSide2D
    distV = sqrt((x-VrayX)**2+(y-VrayY)**2)
    // line(x, y, rayX, rayY)
    // console.log(rayX, rayY)
    }
}

function rayCast2D(numRays, FOV) {
    // FOV = numRays
    angleDiff = (FOV)/(numRays-1)
    // console.log(iCheck, jCheck)
    for (let i = -1; i<numRays; i++) {
        flag = false
        iCheck=int(playerX/blockSide2D)
        jCheck=int(playerY/blockSide2D)
        x=playerX
        y=playerY

        angle = lookAngle - FOV/2 + i*angleDiff
        if (angle<0) {
            angle+=360
            // console.log(lookAngle)
        }
        if (angle>360) {
            angle = angle-360
        }
        collided=false
        x=playerX
        y=playerY
        for (let j = 0; j<18; j=j) {
            if (collided==false) {
                checkHorizontalLines(x, y, angle)
                checkVerticalLines(x, y, angle)
            // console.log(distH, distV)
            if (distH<distV) {
                dist=distH
                shorterDist="H"
                if (rayY<playerY) {intersectedDir="up"} else {intersectedDir="down"}
                // console.log(HrayX, HrayY)
                rayX = HrayX
                rayY = HrayY
                // XoffsetPerBlock = XoffsetPerBlockH
                // YoffsetPerBlock = YoffsetPerBlockH
            } else {
                dist=distV
                shorterDist="V"
                if (rayX<playerX) {intersectedDir="left"} else {intersectedDir="right"}
                // console.log(VrayX, VrayY)
                rayX = VrayX
                rayY = VrayY
                // XoffsetPerBlock = XoffsetPerBlockV
                // YoffsetPerBlock = YoffsetPerBlockV
            }
            tempRayX = rayX
            tempRayY = rayY
            if (shorterDist=="H") {
                if (intersectedDir=="up") {
                    jCheck--
                    tempRayY = rayY
                    rayY = rayY - cos(angle)
                }
                if (intersectedDir=="down") {
                    jCheck++
                    tempRayY = rayY
                }
            }
            if (shorterDist=="V") {
                if (intersectedDir=="left") {
                    iCheck--
                    tempRayX = rayX
                    rayX = rayX + sin(angle)
                }
                if (intersectedDir=="right") {
                    iCheck++
                    tempRayX = rayX
                }
                // console.log(iCheck, jCheck)
            }
            
            
            if (mapLayout[iCheck+(jCheck*blocksHorizontal)] == 1) {
                collided=true
                rayX = tempRayX
                rayY = tempRayY
                // console.log(iCheck, jCheck)
            }
            
            if (rayX<=0 || rayX>=canvas2DX || rayY<=0 || rayY>=canvas2DY) {
                collided=true
                rayX = tempRayX
                rayY = tempRayY
                flag=true
            }

            intersectedDir=""
            x = rayX
            y = rayY
            } else {break}
        }
        if (renderView=="3D") {
            if(flag) {
                continue
            }
            distBox = sqrt((rayX-playerX)**2 + (rayY-playerY)**2)
            render3D(i, numRays)
        }
        if (renderView=="2D" && i>=0) {
            line(playerX, playerY, rayX, rayY)
        }
    }
}