let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width=1200;
canvas.height=window.innerHeight;

let enemyRect = function(color,x,y,width,height,movementType,id) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.movementType = movementType;
    this.id = id;
};
let Projectile = function(color,x,y,width,height,hitDetect) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hitDetect = hitDetect;
};
let player = {
    color: "green",
    x: 580,
    y: (window.innerHeight - 40),
    width: 40,
    height:40
};
let booleans = {
    fire: false,
    gameEnd: false,
    playerLeft: false,
    playerRight: false,
    p:0,
    pTimer:0
};

let enemies = [];
const enemyCopy = enemies.slice();
let projectiles = [];
let drawRect = function(fn) {
ctx.fillStyle = fn.color;
ctx.fillRect(fn.x,fn.y,fn.width,fn.height);
};
let undrawRect = function(fn) {
ctx.clearRect(fn.x,fn.y,fn.width,fn.height);
};

let start = function(lines) {
    for (let i=0;i < lines;i++) {
        for (let j=1; j < 15; j++) {
            let newRect = new enemyRect("blue",(j*72)+50,(i*50)+30,20,20,0,enemies.length);
            drawRect(newRect);
            enemies.push(newRect);
    }
drawRect(player);
};
};
let playerMovement = function(p) {
    if (booleans.playerLeft === true) {
    undrawRect(player);
    player.x-=10;
    drawRect(player);
    } else if (booleans.playerRight === true) {
    undrawRect(player);
    player.x+=10;
    drawRect(player);
    };
};

let enemyMovement = {
    moveLeft: function() {
        enemies.forEach(function(obj) {
            if (obj.x <= 35 && obj.movementType === 0) {
                enemies.forEach(function(obj) {
                    obj.movementType = 2;
                });
            };
        });
        enemies.forEach(function(obj) {
            if (obj.movementType === 0) {
                undrawRect(obj);
                obj.x-=35;
                drawRect(obj);
            }
        });   
    },
    moveRight: function() {
        enemies.forEach(function(obj) {
            if (obj.x >= 1140 && obj.movementType === 1) {
                enemies.forEach(function(obj) {
                    obj.movementType = 3;
                });
            };
        });
        enemies.forEach(function(obj) {
            if (obj.movementType === 1) {
                undrawRect(obj);
                obj.x+=35;
                drawRect(obj);
            };
        });
    },
    moveDown: function(rect) {
        undrawRect(rect);
        rect.y+=30;
        drawRect(rect);
    },
    eMovement: function() {
        if (booleans.p%24 === 0) {    
            enemyMovement.moveLeft();
            enemyMovement.moveRight();
        };
    },
    eMovementDown: function() {
        if (booleans.p%24 === 0) {
            enemies.forEach(function(obj) {
                if (obj.movementType === 2) {
                    enemyMovement.moveDown(obj);
                    obj.movementType = 1;
                };
                if (obj.movementType === 3) {
                    enemyMovement.moveDown(obj);
                    obj.movementType = 0;
                };
            });
        };
    }
};
let fireProjectile = function() {
    let newProjectile = new Projectile("yellow",(player.x + 12), (window.innerHeight - 60),11,15,false);
    if (booleans.fire === true && booleans.pTimer%12 === 0 || booleans.pTimer === 1) {
        drawRect(newProjectile);
        projectiles.push(newProjectile);
    };
        projectiles.forEach(function(obj) {
           if (obj.hitDetect === false){
            undrawRect(obj);
            obj.y-=20;
            drawRect(obj);
           }
        });
    booleans.quickFire = false;
};
let hitDetection = function() {
    enemies.forEach(function(e) {
        projectiles.forEach(function(p) {
            if (e.x < p.x + p.width &&
                e.x + e.width > p.x &&
                e.y < p.y + p.height &&
                e.y + e.height > p.y) {
                    p.hitDetect = true;
                    undrawRect(e);
                    undrawRect(p);
                    indexE = enemies.indexOf(e);
                    indexP = projectiles.indexOf(p);
                    if (indexE > -1) {
                        enemies.splice(indexE,1);
                    };
                    if (indexP > -1) {
                        projectiles.splice(indexP,1);
                    };
                };
        })
    })
};

window.onkeydown = function(event) {
    if (event.keyCode === 32) {
        booleans.fire = true;
        console.log(enemyCopy);
    };
    if (event.keyCode === 37 || event.keyCode === 65) {
        booleans.playerLeft = true;
    };
    if (event.keyCode === 39 || event.keyCode === 68) {
        booleans.playerRight = true;
    };
};
window.onkeyup = function(event) {
    if (event.keyCode === 32) {
        booleans.fire = false;
        booleans.pTimer = 0;
    };
    if (event.keyCode === 37 || event.keyCode === 65) {
        booleans.playerLeft = false;
    } else if (event.keyCode === 39 || event.keyCode === 68) {
        booleans.playerRight = false;
    }
};

let loop = function(p) {
    booleans.p++;
    if (booleans.fire === true) {
        booleans.pTimer++
    };
    playerMovement();
    hitDetection();
    enemyMovement.eMovement();
    enemyMovement.eMovementDown();
    fireProjectile();
    requestAnimationFrame(loop);
};
start(4);
requestAnimationFrame(loop);