function render3D(i, numRays) {
    stroke(255, 0, 0)
    strokeWeight(windowWidth/numRays)
    length=blockSide2D*100/distBox
    diffr=windowWidth/numRays
    // console.log(length)
    stroke(min(length,200))
    if (length==Infinity) {return}
    i+=0.5
    // line(diffr*i, windowHeight/2-length/2, diffr*i, windowHeight/2+length/2)
    // quad(diffr*i, windowHeight/2-length/2-jumpOffset, diffr*i, windowHeight/2+length/2-jumpOffset)
    quad(diffr*i, windowHeight/2-length/2-jumpOffset, diffr*i, windowHeight/2-length/2-jumpOffset, diffr*i, windowHeight/2+length/2-jumpOffset, diffr*i, windowHeight/2+length/2-jumpOffset)

    // console.log(diffr*i, canvas2DY/2-length/2, diffr*i, canvas2DY/2+length/2)
}

f = 0
frames = 72
function jump() {
    if (jumpBool==true) {
        if (f<frames/2) {jumpOffset = f} else {jumpOffset = Math.abs(frames-f)}
        jumpOffset=-1*jumpOffset
        // console.log(jumpOffset)
        f+=6
        if (f==frames) {
            jumpOffset=0
            f=0
            jumpBool=false
        }
    }
}