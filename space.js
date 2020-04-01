let gameDisplay = (function() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    let Rectangle = function(x,y,width,height,id) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = id;
    };
    enemies = [];
    return {
        draw: function(rect) {
            ctx.fillStyle = "blue";
            ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
        },

        constructor: function(lines) {
            for (let i=0;i < lines;i++) {
            for (let j=0; j < (window.innerWidth / 100); j++) {
                let newRect = new Rectangle((j*100)+60,(i*50)+30,30,30,enemies.length)
                this.draw(newRect);
                enemies.push(newRect);
            }
        };
        },
        
        eID: enemies
    };


})();

let gameLogic = (function() {

    return {
        movement: function(array,fn) {
            array.forEach(function(obj) {
                obj.y+=50;
                fn(obj);
            });
        }, 
        
    };
})();


let masterController = (function(gDisplay,gLogic) {
    let start = function() {
        gDisplay.constructor(4);
        console.log(gDisplay.eID);
    };
    start();
    setInterval(function() {gLogic.movement(gDisplay.eID,gDisplay.draw)},1000);
    

})(gameDisplay,gameLogic);