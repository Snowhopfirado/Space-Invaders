let gameDisplay = (function() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width=1200;
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

        undraw: function(rect) {
            ctx.clearRect(rect.x,rect.y,rect.width,rect.height);
        },

        constructor: function(lines) {
            for (let i=0;i < lines;i++) {
                for (let j=1; j < 15; j++) {
                    let newRect = new Rectangle((j*72)+50,(i*50)+30,20,20,enemies.length)
                    this.draw(newRect);
                    enemies.push(newRect);
            }
        };
        },
        
        eID: enemies,
        num: 4
    };


})();
let yes = false;

let gameLogic = (function() {
    
    return {
        mLeft: true,
        mRight: false,
        mDown: false,
        
        moveLeft: function(array,undrawfn,drawfn,left,right,down) {
            array.forEach(function(obj) {
                if (obj.x <= 35) {
                    left = false;
                    right = true;
                }
            })
            array.forEach(function(obj) {
                if (left === true) {
                    undrawfn(obj);
                    obj.x-=30;
                    drawfn(obj);
                } else if (left === false) {
                    down = true;
                };
            });
        },
        

        moveRight: function(array, undrawfn, drawfn, left,right,down) {
            array.forEach(function(obj) {
                if (obj.x >= 1140) {
                    right = false;
                } 
            });
            array.forEach(function(obj) {
                if (right === true) {
                    undrawfn(obj);
                    obj.x += 30;
                    drawfn(obj);
                } else if (right === false) {
                    down = true;
                    left = true;
                };
            });
        },
        moveDown: function(array,undrawfn,drawfn,down) {
            array.forEach(function(obj) {
                if (obj.y >= 600) {
                    down = false;
                }
            });
            array.forEach(function(obj) {
                if (down === true) {
                    undrawfn(obj);
                    obj.y+=45;
                    drawfn(obj);
            }
            });
            down = false;
        },
        
    }     
})();


let masterController = (function(gDisplay,gLogic) {
    let start = function() {
        gDisplay.constructor(gDisplay.num);
        console.log(gDisplay.eID);
    };
    start();
    setInterval(function() {gLogic.moveLeft(gDisplay.eID,gDisplay.undraw,gDisplay.draw,gLogic.mLeft,gLogic.mRight,gLogic.mDown)},500);
    setInterval(function() {gLogic.moveRight(gDisplay.eID,gDisplay.undraw,gDisplay.draw,gLogic.mLeft,gLogic.mRight,gLogic.mDown)},500);
    setInterval(function() {gLogic.moveDown(gDisplay.eID,gDisplay.undraw,gDisplay.draw,gLogic.mDown)},500);
})(gameDisplay,gameLogic); 