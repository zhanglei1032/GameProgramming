var GuaGame = function(fps){
    var g = {
        actions: {},
        keydowns: {},
    }
    g.canvas = document.querySelector('#id-canvas')
    g.context = g.canvas.getContext('2d')

    g.drawImage = function (guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }

    //events
    window.addEventListener('keydown', function (event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function (event) {
        g.keydowns[event.key] = false
    })

    g.registerAction = function(key, callback){
        g.actions[key] = callback
    }

    //timer
    setInterval(function () {
        //Object.keys 返回一个对象所有属性组成的数组
        var keys = Object.keys(g.actions)
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        //update
        g.update()
        //clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        //draw
        g.draw()
    }, 1000/fps)

    return g
}
