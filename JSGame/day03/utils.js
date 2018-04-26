var e = sel => document.querySelector(sel)


var log2Page =  function (s) {
    e('#id-text-log').value += '\n' + s
}


var log = console.log.bind(console)


var imageFromPath = function(path){
    var img = new Image()
    img.src = path
    return img
}


var rectIntersects = function(a, b){
    if (a.y < b.y && a.y + a.image.height > b.y) {
        if (a.x < b.x && a.x + a.image.width > b.x ) {
            return true
        }
    }
    return false
}
