var Block = function (position) {
    //position是[0，0]格式的
    var p = position
    var image = imageFromPath('block.png')
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        w: 40,
        h: 20,
        alive: true,
        lifes: p[2] || 1, //lifes为p[2]元素，如果没有此元素，则值为1
    }
    o.kill = function(){
        o.lifes--
        if (o.lives < 1) {
            o.alive = false
        } 
    }
    o.collide = function(b){
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }

    return o
}
