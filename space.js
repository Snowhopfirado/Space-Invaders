let gameDisplay = (function() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width=1200;
    canvas.height=window.innerHeight;

    let Rectangle = function(color,x,y,width,height,id) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = id;
    };
    let playerRect = {
        color:"purple",
        x:580,
        y:670,
        width:40,
        height:40,
        x_left: 0,
        x_right: 0
    };
    enemies = [];
    return {
        pRect:playerRect,
        draw: function(rect) {
            ctx.fillStyle = rect.color;
            ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
        },
       
        undraw: function(rect) {
            ctx.clearRect(rect.x,rect.y,rect.width,rect.height);
        },

        constructor: function(lines,pdraw,player) {
            for (let i=0;i < lines;i++) {
                for (let j=1; j < 15; j++) {
                    let newRect = new Rectangle("blue",(j*72)+50,(i*50)+30,20,20,enemies.length)
                    this.draw(newRect);
                    enemies.push(newRect);
            }
        let ground = new Rectangle("green",0,710,1200,window.innerHeight);
        this.draw(ground);
        pdraw(player);
        };
        },
        
        eID: enemies,
        num: 4,
    };

})();

let gameLogic = (function() {
    return {
        
        checkMove: {
            left: true,
            right: false,
            down: false,
            temp: true
        },
        
        moveLeft: function(array,undrawfn,drawfn,move) {
            array.forEach(function(obj) {
                if (obj.x <= 35) {
                    move.down = true;
                    move.left = false;
                }
            })
            array.forEach(function(obj) {
                if (move.left === true) {
                    undrawfn(obj);
                    obj.x-=30;
                    drawfn(obj);
                } else if (move.left === false) {
                    move.right = true;
                };
            });
        },
        

        moveRight: function(array, undrawfn, drawfn,move) {
            array.forEach(function(obj) {
                if (obj.x >= 1140) {
                    move.down = true;
                    move.right = false;
                } 
            });
            array.forEach(function(obj) {
                if (move.right === true) {
                    undrawfn(obj);
                    obj.x += 30;
                    drawfn(obj);
                } else if (move.right === false) {
                    move.left = true;
                };
            });
        },
        moveDown: function(array,undrawfn,drawfn,move) {
            array.forEach(function(obj) {
                if (obj.y >= 690) {
                    move.down = false;
                }
            });
            array.forEach(function(obj) {
                if (move.down === true) {
                    undrawfn(obj);
                    obj.y+=30;
                    drawfn(obj);
            }
            });
            move.down = false;
            
            
        },
        eMovement: function(fnLeft,fnRight,array,undrawfn,drawfn,move) {
            if (move.left === true && move.temp === true) {
                fnLeft(array,undrawfn,drawfn,move);
            } else if (move.right === true && move.temp === true) {
                fnRight(array,undrawfn,drawfn,move);
            };
                
        },
        eMovementDown: function(fnDown,array,undrawfn,drawfn,move) {
            if (move.temp === true) {fnDown(array,undrawfn,drawfn,move);}
        },
        tempStop: function(move) {
            switch(move.temp) {
                case true:
                move.temp = false;
                break;

                case false:
                move.temp = true;
                
            };
        },
        playerMove: function(undrawfn,drawfn,player) {
            if (player.x_left === 1 && player.x > 0) {
            undrawfn(player);
            player.x-=(player.x_left * 10);
            drawfn(player);
        } else if (player.x_right === 1 && player.x < 1200 && player.x < 1160) {
            undrawfn(player)
            player.x+=(player.x_right * 10);
            drawfn(player);
        }
    }
    }     
})();


let masterController = (function(gDisplay,gLogic) {
    let start = function() {
        gDisplay.constructor(gDisplay.num,gDisplay.draw,gDisplay.pRect);
        console.log(gDisplay.eID);
    };
    start();
    setInterval(function() {gLogic.eMovement(gLogic.moveLeft,gLogic.moveRight,gDisplay.eID,gDisplay.undraw,gDisplay.draw,gLogic.checkMove)},500);
    setInterval(function() {gLogic.eMovementDown(gLogic.moveDown,gDisplay.eID,gDisplay.undraw,gDisplay.draw,gLogic.checkMove)},500);
    window.addEventListener('click',function() {gLogic.tempStop(gLogic.checkMove)});
    setInterval(function() {gLogic.playerMove(gDisplay.undraw,gDisplay.draw,gDisplay.pRect)},16.67);
    window.onkeydown = function(event) {
        if (event.keyCode === 37) {
            gDisplay.pRect.x_left = 1;
        } else if (event.keyCode === 39) {
            gDisplay.pRect.x_right = 1;
        };
    };
    window.onkeyup = function(event) {
        switch(event.keyCode) {
            case 37:
            gDisplay.pRect.x_left = 0;
            break;

            case 39:
            gDisplay.pRect.x_right = 0;
            break;
        }
    };
})(gameDisplay,gameLogic);