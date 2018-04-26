
var loadLevel = function (n) {
    var n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p)
        blocks.push(b)
    }
    return blocks
}

var blocks = []
var enableDebugMode = function(enable){
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            //暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            //载入关卡功能
            blocks = loadLevel(Number(k))
        }
    })
    //控制速度
    var slide = document.querySelector('#id-input-speed')
    slide.addEventListener('input', function(event){
        var input = event.target
        window.fps = Number(input.value)
    })
}


var __main = function () {
    enableDebugMode(true)

    var score = 0

    var game = GuaGame(30)

    var paddle = Paddle()
    var ball = Ball()

    var paused = false
    game.registerAction('a', function () {
        paddle.moveLeft()
    })
    game.registerAction('d', function () {
        paddle.moveRight()
    })
    game.registerAction('f', function () {
        ball.fire()
    })

    // game:{
    //     canvas:canvas#id-canvas
    //     context:CanvasRenderingContext2D
    //     draw:ƒ ()
    //     keydowns:{}
    //     registerAction:ƒ (key, callback)
    //     actions:a:ƒ (),d:ƒ ()
    // }
    //
    game.update = function(){
        if (window.paused) {
            return
        }
        ball.move()
        if (paddle.collide(ball)) {
            log('paddle collide ball')
            ball.反弹()
        }
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            if (b.collide(ball)) {
                b.kill()
                ball.反弹()
                score += 10
            }
        }
    }

    game.draw = function(){
        game.drawImage(paddle)
        game.drawImage(ball)
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].alive) {
                game.drawImage(blocks[i])
            }
        }
        game.context.fillText('分数: ' + score, 10, 290)
    }

}

__main()
